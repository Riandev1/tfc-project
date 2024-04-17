import { Identifiable } from '..';

export interface UserNew extends Identifiable {
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IUserToken {
  token: string,
}

export interface IUserRole {
  role: string,
}
