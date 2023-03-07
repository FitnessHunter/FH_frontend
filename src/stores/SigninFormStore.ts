import { getParent, Instance, SnapshotIn, types } from "mobx-state-tree";
import { IAuthStore } from "./AuthStore";
import { InputStore } from "./InputStore";

export const SigninFormStore = types
  .model("SigninFormStore", {
    email: InputStore,
    password: InputStore,
  })
  .views((self) => ({
    get isValid(): boolean {
      return self.email.isValid && self.password.isValid;
    },
  }))
  .actions((self) => {
    const signin = () => {
      if (!self.isValid) {
        return;
      }

      getParent<IAuthStore>(self).signin({
        email: self.email.value,
        password: self.password.value,
      });
    };

    return {
      signin,
    };
  });

export const SigninFormStoreInitialState: ISigninFormStoreInitialState = {
  email: {
    initialInputType: "email",
    placeholder: "Email",
    validatorType: "email",
    allowEmpty: true,
  },
  password: {
    initialInputType: "password",
    placeholder: "Password",
    validatorType: "password",
    allowEmpty: true,
  },
};

export interface ISigninFormStore extends Instance<typeof SigninFormStore> {}
export interface ISigninFormStoreInitialState
  extends SnapshotIn<typeof SigninFormStore> {}
