import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/RootStore";
import Signin from "../components/Auth/Signin/Signin";
import Signup from "../components/Auth/Signup/Signup";

import "../components/Auth/Auth.scss";

const Auth = observer(() => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  const [variant, setVariant] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    if (authStore.isLoggedIn) navigate("/");
  }, [authStore.isLoggedIn]);

  return (
    <div className="auth-card card">
      <div className="auth-card__title text text_main text_l text_bold">
        {variant === "signin" ? "Sign In" : "Sign Up"}
      </div>

      {variant === "signin" ? (
        <Signin toggleVariant={() => setVariant("signup")} />
      ) : (
        <Signup toggleVariant={() => setVariant("signin")} />
      )}

      <div className="auth-card__back card_glass"></div>
    </div>
  );
});

export default Auth;
