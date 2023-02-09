import React from "react";
import { observer } from "mobx-react-lite";
import { useSigninForm } from "../../../hooks/AuthHooks";
import { useStore } from "../../../stores/RootStore";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";
import AuthSwitch from "../AuthSwitch/AuthSwitch";

interface Props {
  toggleVariant: () => void;
}

const Signin = observer(({ toggleVariant }: Props) => {
  const { authStore } = useStore();

  const { email, password, isFormValid, signin } = useSigninForm(authStore);

  return (
    <>
      <AuthSwitch variant="signin" toggleVariant={toggleVariant} />

      <div className="auth-form">
        <Input
          type="email"
          placeholder="Email"
          value={email.value}
          setValue={email.change}
          isValid={email.isValid}
          errorMessage={email.message}
          onEnterPress={signin}
          allowEmpty
          disabled={authStore.loading}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password.value}
          setValue={password.change}
          isValid={password.isValid}
          errorMessage={password.message}
          onEnterPress={signin}
          allowEmpty
          disabled={authStore.loading}
        />

        <Button
          className="auth-form__button"
          size="l"
          text="Sign In"
          onClick={signin}
          disabled={authStore.loading || !isFormValid}
        />
      </div>
    </>
  );
});

export default Signin;
