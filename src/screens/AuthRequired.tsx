import React from "react";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/RootStore";

const AuthRequired = observer(() => {
  const { authStore } = useStore();

  if (!authStore.isLoggedIn) {
    return <Navigate replace to={"/auth"} />;
  }

  return <Outlet />;
});

export default AuthRequired;
