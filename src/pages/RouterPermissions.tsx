import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/RootStore";

interface RouterPermissionsProps {
  to: string;
}

export const AuthRequired = observer(({ to }: RouterPermissionsProps) => {
  const { authStore } = useStore();

  return authStore.isLoggedIn ? <Outlet /> : <Navigate replace to={to} />;
});

export const NoAuthRequired = observer(({ to }: RouterPermissionsProps) => {
  const { authStore } = useStore();

  return authStore.isLoggedIn ? <Navigate replace to={to} /> : <Outlet />;
});
