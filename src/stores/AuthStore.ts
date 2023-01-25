import { flow, Instance, types } from "mobx-state-tree";

import { IToken, IUserCredentials } from "../types/AuthTypes";
import { AuthService } from "../services/api/AuthService";

export const User = types.model("User", {
  email: types.string,
  phone: types.maybe(types.string),
  firstName: types.string,
  lastName: types.string,
  image: types.maybe(types.string),
});

export const AuthStore = types
  .model("AuthStore", {
    user: types.maybe(User),
    token: types.maybe(types.string),
    loading: false,
  })
  .views((self) => ({
    get isLoggedIn(): boolean {
      return self.user !== undefined && self.token !== undefined;
    },
  }))
  .actions((self) => ({
    signin: flow(function* (userCredentials: IUserCredentials) {
      self.loading = true;

      try {
        const token: IToken = yield AuthService.signin(userCredentials);

        self.token = token.token;
        // getUser
      } catch (error) {
        console.error("Failed to sign in", error);
        // popup
      }

      self.loading = false;
    }),
  }));

export interface IUser extends Instance<typeof User> {}
export interface IAuthStore extends Instance<typeof AuthStore> {}
