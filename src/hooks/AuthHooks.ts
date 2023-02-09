import { useEffect, useMemo, useState } from "react";
import { IAuthStore } from "../stores/AuthStore";
import { ISigninForm, ISignupForm } from "../types/AuthTypes";
import {
  emailValidator,
  notEmptyValidator,
  passwordValidator,
} from "../utils/validators";
import { useValidatedInputField } from "./DefaultHooks";

export const useSigninForm = (authStore: IAuthStore): ISigninForm => {
  const email = useValidatedInputField("", emailValidator);
  const password = useValidatedInputField("", passwordValidator);

  const isFormValid = useMemo(
    () => email.isValid && password.isValid,
    [email.isValid, password.isValid]
  );

  const signin = () => {
    if (authStore.loading || !isFormValid) return;

    authStore.signin({
      email: email.value,
      password: password.value,
    });
  };

  return { email, password, isFormValid, signin };
};

export const useSignupForm = (authStore: IAuthStore): ISignupForm => {
  const email = useValidatedInputField("", emailValidator);
  const firstName = useValidatedInputField("", notEmptyValidator);
  const lastName = useValidatedInputField("", notEmptyValidator);
  const password = useValidatedInputField("", passwordValidator);
  const passwordConfirmation = useValidatedInputField("", passwordValidator);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (password.isValid && passwordConfirmation.isValid) {
      if (password.value !== passwordConfirmation.value) {
        passwordConfirmation.setMessage("Passwords do not match");
      } else {
        passwordConfirmation.setMessage(null);
      }
    }
  }, [password.value, passwordConfirmation.value]);

  const isFormValid = useMemo(
    () =>
      email.isValid &&
      firstName.isValid &&
      lastName.isValid &&
      password.isValid &&
      passwordConfirmation.isValid &&
      password.value === passwordConfirmation.value,
    [
      email.isValid,
      firstName.isValid,
      lastName.isValid,
      password.value,
      passwordConfirmation.value,
    ]
  );

  const signup = () => {
    if (authStore.loading || !isFormValid) return;

    const userCreationFormData = new FormData();

    userCreationFormData.append("email", email.value);
    userCreationFormData.append("firstName", firstName.value);
    userCreationFormData.append("lastName", lastName.value);
    userCreationFormData.append("password", password.value);
    image && userCreationFormData.append("image", image);

    authStore.signup(userCreationFormData);
  };

  return {
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
    image,
    isFormValid,
    setImage,
    signup,
  };
};
