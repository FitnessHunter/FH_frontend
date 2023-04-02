import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useStore } from "../stores/RootStore";
import Header from "./Header/Header";
import HomeScreen from "../screens/HomeScreen";
import AuthScreen from "../screens/AuthScreen";
import AccountScreen from "../screens/AccountScreen";
import AboutScreen from "../screens/AboutScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { AuthRequired, NoAuthRequired } from "../screens/RouterPermissions";
import { useAxios } from "../services/AxiosInstance";
import NotificationContainer from "./Notifications/NotificationContainer";

import "/src/styles/index.scss";

const App = observer(() => {
  const { authStore, navigationStore } = useStore();
  const location = useLocation();

  useAxios(authStore.token, {
    401: authStore.signout,
  });

  useEffect(() => {
    navigationStore.setLocation(location);
  }, [location]);

  return (
    <div
      className={classNames({
        "root-background": true,
        "root-background_pattern": navigationStore.isPageWithPattern,
      })}
    >
      <Header />

      <div className="workspace">
        <Routes>
          <Route path="/about" element={<AboutScreen />} />

          <Route element={<NoAuthRequired to="/" />}>
            <Route path="/auth" element={<AuthScreen />} />
          </Route>

          <Route element={<AuthRequired to="/auth" />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/account" element={<AccountScreen />} />
          </Route>

          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </div>

      <NotificationContainer />
    </div>
  );
});

export default App;
