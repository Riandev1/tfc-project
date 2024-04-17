import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UsersModel from '../models/UserModel';
import { IUserRole, IUserToken, UserNew } from '../Interfaces/newuser/UserNew';
import { UserInt } from '../Interfaces/newuser/UserInt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class ServiceEntry {
  constructor(
    private teams: UserInt<UserNew> = new UsersModel(),
  ) { }

  public validation(email: string, password: string): Promise<ServiceResponse<IUserToken>> {
    return this.teams.validation(email)
      .then((user) => {
        if (!user) {
          return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
        }

        const acessnegado = bcrypt.compareSync(password, user.password);
        if (!acessnegado) {
          return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
        }

        const boxload = { id: user.id, email: user.email, role: user.role };
        const secret = process.env.JWT_SECRET ?? 'secret';
        const token = jwt.sign(boxload, secret, { expiresIn: '7d' });
        return { status: 'success', data: { token } };
      });
  }

  public role = async (authorization: string): Promise<ServiceResponse<IUserRole>> => {
    try {
      const [, token] = authorization.split(' ');
      const accessed = process.env.JWT_SECRET ?? 'secret';
      const payload = jwt.verify(token, accessed);
      const { role } = payload as UserNew;
      return { status: 'success', data: { role } };
    } catch (error) {
      return { status: 'unauthorized', data: { message: 'Token must be a valid token' } };
    }
  };
}
