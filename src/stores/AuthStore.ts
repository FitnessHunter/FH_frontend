import { flow, Instance, types } from "mobx-state-tree";
import { IToken, IUserCredentials } from "../types/AuthTypes";
import { AuthService } from "../services/api/AuthService";
import { pushNotification } from "./NotificationStore";

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
      return self.token !== undefined;
    },
  }))
  .actions((self) => {
    const signin = flow(function* (userCredentials: IUserCredentials) {
      self.loading = true;

      try {
        const token: IToken = yield AuthService.signin(userCredentials);

        self.token = token.token;

        localStorage.setItem("fh_token", JSON.stringify(token));
      } catch (error) {
        pushNotification(self, "error", "Failed to sign in");
      }

      self.loading = false;
    });

    const signup = flow(function* (userCreationFormData: FormData) {
      self.loading = true;

      try {
        const token: IToken = yield AuthService.signup(userCreationFormData);

        self.token = token.token;

        localStorage.setItem("fh_token", JSON.stringify(token));
      } catch (error) {
        pushNotification(self, "error", "Failed to sign up");
      }

      self.loading = false;
    });

    const signout = () => {
      self.token = undefined;
      self.user = undefined;

      localStorage.removeItem("fh_token");
    };

    const getUser = flow(function* () {
      self.loading = true;

      try {
        const user: IUser = yield AuthService.getUser();

        self.user = user;
      } catch (error) {
        pushNotification(self, "error", "Failed to get user data");
      }

      self.loading = false;
    });

    return {
      signin,
      signup,
      signout,
      getUser,
    };
  });

export interface IUser extends Instance<typeof User> {}
export interface IAuthStore extends Instance<typeof AuthStore> {}
