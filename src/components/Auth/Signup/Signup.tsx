import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useSignupForm } from "../../../hooks/AuthHooks";
import { useStore } from "../../../stores/RootStore";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";
import AuthSwitch from "../AuthSwitch/AuthSwitch";

interface Props {
  toggleVariant: () => void;
}

const Signup = observer(({ toggleVariant }: Props) => {
  const { authStore } = useStore();

  const {
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
    image,
    isFormValid,
    signup,
    setImage,
  } = useSignupForm(authStore);

  return (
    <>
      <AuthSwitch
        variant="signup"
        toggleVariant={toggleVariant}
        image={image}
        setImage={setImage}
      />

      <div className="auth-form">
        <Input
          type="email"
          placeholder="Email"
          value={email.value}
          setValue={email.change}
          isValid={email.isValid}
          errorMessage={email.message}
          onEnterPress={signup}
          allowEmpty
          disabled={authStore.loading}
        />

        <Input
          type="text"
          placeholder="First name"
          value={firstName.value}
          setValue={firstName.change}
          isValid={firstName.isValid}
          errorMessage={firstName.message}
          onEnterPress={signup}
          allowEmpty
          disabled={authStore.loading}
        />

        <Input
          type="text"
          placeholder="Last name"
          value={lastName.value}
          setValue={lastName.change}
          isValid={lastName.isValid}
          errorMessage={lastName.message}
          onEnterPress={signup}
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
          onEnterPress={signup}
          allowEmpty
          disabled={authStore.loading}
        />

        <Input
          type="password"
          placeholder="Confirm password"
          value={passwordConfirmation.value}
          setValue={passwordConfirmation.change}
          isValid={passwordConfirmation.isValid}
          errorMessage={passwordConfirmation.message}
          onEnterPress={signup}
          allowEmpty
          disabled={authStore.loading}
        />

        <Button
          className="auth-form__button"
          size="l"
          text="Sign Up"
          onClick={signup}
          disabled={authStore.loading || !isFormValid}
        />
      </div>

      <div
        className={classNames({
          "auth-card__hint-link hint-link text text_s text_dark": true,
          "hint-link_disabled": authStore.loading,
        })}
        onClick={toggleVariant}
      >
        Sign in
      </div>
    </>
  );
});

export default Signup;
