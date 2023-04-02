import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/RootStore";
import AuthCard from "../components/Auth/AuthCard";

const AuthScreen = observer(() => {
  const { authStore } = useStore();

  useEffect(() => {
    authStore.onCreate();

    return () => {
      authStore.onDestroy();
    };
  }, []);

  return <AuthCard />;
});

export default AuthScreen;
