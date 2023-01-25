import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { useStore } from "../stores/RootStore";
import { useSigninForm, useSignupForm } from "../hooks/AuthHooks";
import AuthSwitch from "../components/auth/AuthSwitch";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";

import "../components/auth/Auth.styles.scss";

const Auth = observer(() => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  if (authStore.isLoggedIn) navigate(-1);

  const [variant, setVariant] = useState<"signin" | "signup">("signin");
  const signinForm = useSigninForm(authStore);
  const signupForm = useSignupForm(authStore);

  console.log("render_Auth");

  return (
    <div className="auth-card card">
      <div className="auth-card__title text text-main text-l text-bold">
        {variant === "signin" ? "Sign In" : "Sign Up"}
      </div>

      <AuthSwitch variant={variant} setVariant={setVariant} />

      {variant === "signin" ? (
        <Signin form={signinForm} loading={authStore.loading} />
      ) : (
        <Signup form={signupForm} loading={authStore.loading} />
      )}

      <div className="auth-card__back card-glass"></div>
    </div>
  );
});

export default Auth;
