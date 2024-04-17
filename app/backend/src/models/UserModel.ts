import User from '../database/models/UserModel';
import { UserNew } from '../Interfaces/newuser/UserNew';
import { UserInt } from '../Interfaces/newuser/UserInt';

export default class UserModel implements UserInt<UserNew> {
  private model = User;

  validation(email: string): Promise<UserNew | null> {
    return this.model.findOne({ where: { email } })
      .then((dbData: UserNew | null) => dbData);
  }
}
