import React from "react";

import { ISignupForm } from "../../types/AuthTypes";
import Button from "../elements/Button";
import Input from "../elements/Input";

interface Props {
  form: ISignupForm;
  loading: boolean;
}

const Signup = ({ form, loading }: Props) => {
  return (
    <div className="auth-form">
      <Input
        type="email"
        placeholder="Email"
        field={form.email}
        onEnterPress={form.signup}
        allowEmpty
        disabled={loading}
      />

      <Input
        type="text"
        placeholder="First name"
        field={form.firstName}
        onEnterPress={form.signup}
        allowEmpty
        disabled={loading}
      />

      <Input
        type="text"
        placeholder="Last name"
        field={form.lastName}
        onEnterPress={form.signup}
        allowEmpty
        disabled={loading}
      />

      <Input
        type="password"
        placeholder="Password"
        field={form.password}
        onEnterPress={form.signup}
        allowEmpty
        disabled={loading}
      />

      <Input
        type="password"
        placeholder="Confirm password"
        field={form.passwordConfirmation}
        onEnterPress={form.signup}
        allowEmpty
        disabled={loading}
      />

      <Button
        className="auth-form__button"
        size="l"
        variant="contained"
        text="Sign Up"
        onClick={form.signup}
        disabled={loading || !form.isFormValid}
      />
    </div>
  );
};

export default Signup;
