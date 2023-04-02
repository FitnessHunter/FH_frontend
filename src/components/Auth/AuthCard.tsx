import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useStore } from "../../stores/RootStore";
import Loader from "../Elements/Loader/Loader";
import AuthVariantSwitch from "./AuthVariantSwitch/AuthVariantSwitch";
import SigninForm from "./SigninForm/SigninForm";
import SignupForm from "./SignupForm/SignupForm";

import "./AuthCard.scss";

const AuthCard = observer(() => {
  const { authStore } = useStore();

  return (
    <div className="auth-card card">
      {authStore.loading && <Loader blur />}

      <div className="auth-card__title text text_main text_l text_bold">
        {authStore.authVariant === "signin" ? "Sign In" : "Sign Up"}
      </div>

      {authStore.authVariantSwitch && <AuthVariantSwitch />}

      {authStore.authVariant === "signin" && authStore.signinForm && (
        <SigninForm />
      )}

      {authStore.authVariant === "signup" && authStore.signupForm && (
        <>
          <SignupForm />

          <div
            className={classNames({
              "auth-card__hint-link hint-link text text_s text_dark": true,
              "hint-link_disabled": authStore.loading,
            })}
            onClick={() => authStore.setAuthVariant("signin")}
          >
            Sign in
          </div>
        </>
      )}

      <div className="card card_back card_glass card_shadow"></div>
    </div>
  );
});

export default AuthCard;
