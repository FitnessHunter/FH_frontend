import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/RootStore";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";

const SigninForm = observer(() => {
  const { authStore } = useStore();

  return (
    <div className="auth-form">
      <Input
        field={authStore.signinForm!.email}
        disabled={authStore.loading}
        onEnterPress={authStore.signinForm!.signin}
      />

      <Input
        field={authStore.signinForm!.password}
        disabled={authStore.loading}
        onEnterPress={authStore.signinForm!.signin}
      />

      <Button
        className="auth-form__button"
        size="l"
        text="Sign In"
        onClick={authStore.signinForm!.signin}
        disabled={authStore.loading || !authStore.signinForm!.isValid}
      />
    </div>
  );
});

export default SigninForm;
