import { getParent, Instance, SnapshotIn, types } from "mobx-state-tree";
import { IAuthStore } from "./AuthStore";
import { InputStore } from "./InputStore";

export const SignupFormStore = types
  .model("SignupFormStore", {
    email: InputStore,
    firstName: InputStore,
    lastName: InputStore,
    password: InputStore,
    passwordConfirmation: InputStore,
  })
  .views((self) => ({
    get isValid(): boolean {
      return (
        self.email.isValid &&
        self.firstName.isValid &&
        self.lastName.isValid &&
        self.password.isValid &&
        self.passwordConfirmation.isValid &&
        self.password.value === self.passwordConfirmation.value
      );
    },
  }))
  .actions((self) => {
    const comparePasswords = () => {
      if (self.password.isValid && self.passwordConfirmation.isValid) {
        if (self.password.value !== self.passwordConfirmation.value) {
          self.passwordConfirmation.setErrorMessage("Passwords do not match");
        } else {
          self.passwordConfirmation.setErrorMessage(undefined);
        }
      }
    };

    const setPassword = (password: string) => {
      self.password.setValue(password);
      comparePasswords();
    };

    const setPasswordConfirmation = (passwordConfirmation: string) => {
      self.passwordConfirmation.setValue(passwordConfirmation);
      comparePasswords();
    };

    const signup = () => {
      if (!self.isValid) {
        return;
      }

      const authStore = getParent<IAuthStore>(self);
      const image = authStore.authVariantSwitch?.image;

      const userCreationFormData = new FormData();

      userCreationFormData.append("email", self.email.value);
      userCreationFormData.append("firstName", self.firstName.value);
      userCreationFormData.append("lastName", self.lastName.value);
      userCreationFormData.append("password", self.password.value);
      if (image) {
        userCreationFormData.append("image", image);
      }

      authStore.signup(userCreationFormData);
    };

    return {
      setPassword,
      setPasswordConfirmation,
      signup,
    };
  });

export const SignupFormStoreInitialState: ISignupFormStoreInitialState = {
  email: {
    initialInputType: "email",
    placeholder: "Email",
    validatorType: "email",
    allowEmpty: true,
  },
  firstName: {
    initialInputType: "text",
    placeholder: "First name",
    validatorType: "notEmpty",
    allowEmpty: true,
  },
  lastName: {
    initialInputType: "text",
    placeholder: "Last name",
    validatorType: "notEmpty",
    allowEmpty: true,
  },
  password: {
    initialInputType: "password",
    placeholder: "Password",
    validatorType: "password",
    allowEmpty: true,
  },
  passwordConfirmation: {
    initialInputType: "password",
    placeholder: "Password confirmation",
    validatorType: "password",
    allowEmpty: true,
  },
};

export interface ISignupFormStore extends Instance<typeof SignupFormStore> {}
export interface ISignupFormStoreInitialState
  extends SnapshotIn<typeof SignupFormStore> {}
