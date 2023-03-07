import { destroy, flow, Instance, SnapshotIn, types } from "mobx-state-tree";
import { IToken, IUserCredentials } from "../types/AuthTypes";
import { AuthService } from "../services/api/AuthService";
import { showNotification } from "./NotificationStore";
import {
  SignupFormStore,
  SignupFormStoreInitialState,
} from "./SignupFormStore";
import {
  SigninFormStore,
  SigninFormStoreInitialState,
} from "./SigninFormStore";
import { getFromLocalStorage } from "../utils/methods";
import {
  AuthVariantSwitchStore,
  AuthVariantSwitchStoreInitialState,
} from "./AuthVariantSwitchStore";
import { AxiosError } from "axios";

const AuthVariantType = types.union(
  types.literal("signin"),
  types.literal("signup")
);

const User = types
  .model("User", {
    email: types.string,
    phone: types.maybe(types.string),
    firstName: types.string,
    lastName: types.string,
  })
  .volatile((self) => ({
    image: "",
  }));

export const AuthStore = types
  .model("AuthStore", {
    user: types.maybe(User),
    token: types.maybe(types.string),
    authVariant: AuthVariantType,
    signinForm: types.maybe(SigninFormStore),
    signupForm: types.maybe(SignupFormStore),
    authVariantSwitch: types.maybe(AuthVariantSwitchStore),
    loading: false,
  })
  .views((self) => ({
    get isLoggedIn(): boolean {
      return self.token !== undefined;
    },
  }))
  .actions((self) => {
    const onCreate = () => {
      self.authVariantSwitch = AuthVariantSwitchStore.create(
        AuthVariantSwitchStoreInitialState
      );
      self.signinForm = SigninFormStore.create(SigninFormStoreInitialState);
      self.signupForm = SignupFormStore.create(SignupFormStoreInitialState);
    };

    const onDestroy = () => {
      destroy(self.authVariantSwitch);
      destroy(self.signinForm);
      destroy(self.signupForm);
    };

    const setAuthVariant = (authVariant: AuthVariantType) => {
      self.authVariant = authVariant;
    };

    const signin = flow(function* (userCredentials: IUserCredentials) {
      if (self.loading) {
        return;
      }

      self.loading = true;

      try {
        const token: IToken = yield AuthService.signin(userCredentials);

        self.token = token.token;
        localStorage.setItem("fh_token", JSON.stringify(token));
      } catch (error) {
        switch ((error as AxiosError).response?.status) {
          case 401:
            showNotification("The email or password is incorrect", "error");
            break;
          default:
            showNotification("Failed to sign in", "error");
            break;
        }
      }

      self.loading = false;
    });

    const signup = flow(function* (userCreationFormData: FormData) {
      if (self.loading) {
        return;
      }

      self.loading = true;

      try {
        const token: IToken = yield AuthService.signup(userCreationFormData);

        self.token = token.token;
        localStorage.setItem("fh_token", JSON.stringify(token));
      } catch (error) {
        showNotification("Failed to sign up", "error");
      }

      self.loading = false;
    });

    const signout = () => {
      self.token = undefined;
      self.user = undefined;
      self.authVariant = "signin";

      localStorage.removeItem("fh_token");
    };

    const getUser = flow(function* () {
      self.loading = true;

      try {
        const user: IUser = yield AuthService.getUser();

        self.user = user;
      } catch (error) {
        showNotification("Failed to get user data", "error");
      }

      self.loading = false;
    });

    return {
      onCreate,
      onDestroy,
      setAuthVariant,
      signin,
      signup,
      signout,
      getUser,
    };
  });

export const AuthStoreInitialState: IAuthStoreInitialState = {
  token: getFromLocalStorage<IToken>("fh_token")?.token,
  authVariant: "signin" as AuthVariantType,
};

export type AuthVariantType = Instance<typeof AuthVariantType>;
export interface IUser extends Instance<typeof User> {}
export interface IAuthStore extends Instance<typeof AuthStore> {}
export interface IAuthStoreInitialState extends SnapshotIn<typeof AuthStore> {}
