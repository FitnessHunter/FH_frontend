import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/RootStore";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";

const SignupForm = observer(() => {
  const { authStore } = useStore();

  return (
    <div className="auth-form">
      <Input
        field={authStore.signupForm!.email}
        disabled={authStore.loading}
        onEnterPress={authStore.signupForm!.signup}
      />

      <Input
        field={authStore.signupForm!.firstName}
        disabled={authStore.loading}
        onEnterPress={authStore.signupForm!.signup}
      />

      <Input
        field={authStore.signupForm!.lastName}
        disabled={authStore.loading}
        onEnterPress={authStore.signupForm!.signup}
      />

      <Input
        field={authStore.signupForm!.password}
        disabled={authStore.loading}
        onEnterPress={authStore.signupForm!.signup}
        setValue={authStore.signupForm!.setPassword}
      />

      <Input
        field={authStore.signupForm!.passwordConfirmation}
        disabled={authStore.loading}
        onEnterPress={authStore.signupForm!.signup}
        setValue={authStore.signupForm!.setPasswordConfirmation}
      />

      <Button
        className="auth-form__button"
        size="l"
        text="Sign Up"
        onClick={authStore.signupForm!.signup}
        disabled={authStore.loading || !authStore.signupForm!.isValid}
      />
    </div>
  );
});

export default SignupForm;
