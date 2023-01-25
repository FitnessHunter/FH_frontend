import React from "react";

import { ISigninForm } from "../../types/AuthTypes";
import Button from "../elements/Button";
import Input from "../elements/Input";

interface Props {
  form: ISigninForm;
  loading: boolean;
}

const Signin = ({ form, loading }: Props) => {
  return (
    <div className="auth-form">
      <Input
        type="email"
        placeholder="Email"
        field={form.email}
        onEnterPress={form.signin}
        allowEmpty
        disabled={loading}
      />

      <Input
        type="password"
        placeholder="Password"
        field={form.password}
        onEnterPress={form.signin}
        allowEmpty
        disabled={loading}
      />

      <Button
        className="auth-form__button"
        size="l"
        variant="contained"
        text="Sign In"
        onClick={form.signin}
        disabled={loading || !form.isFormValid}
      />
    </div>
  );
};

export default Signin;
