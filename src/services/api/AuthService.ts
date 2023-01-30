import client from "../AxiosInstance";
import { IToken, IUserCredentials } from "../../types/AuthTypes";
import { IUser } from "../../stores/AuthStore";

export const AuthService = {
  signin: (userCredentials: IUserCredentials): Promise<IToken> =>
    client
      .post("auth/login", userCredentials)
      .then((response) => response.data),
  signup: (userCreationFormData: FormData): Promise<IToken> =>
    client
      .post("auth/register", userCreationFormData)
      .then((response) => response.data),
  getUser: (): Promise<IUser> =>
    client.get("api/user").then((response) => response.data),
  // updateUser:,
};
