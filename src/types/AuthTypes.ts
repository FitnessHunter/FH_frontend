export interface IToken {
  token: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserUpdatingDTO {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  image?: string;
}
