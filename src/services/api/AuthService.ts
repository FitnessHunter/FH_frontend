import axios from "axios";

import { API } from "../../utils/constants";
import { IToken, IUserCredentials } from "../../types/AuthTypes";

export const AuthService = {
  signin: (userCredentials: IUserCredentials): Promise<IToken> =>
    axios.post(`${API}auth/login`, userCredentials),
  // signup:,
  // signout:,
  // getUser:,
  // updateUser:,
};
