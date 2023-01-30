import React, { useEffect } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import { useStore } from "../stores/RootStore";
import { useWindowResize } from "../hooks/DefaultHooks";
import Header from "./Header/Header";
import Home from "../screens/Home";
import Auth from "../screens/Auth";
import Account from "../screens/Account";
import About from "../screens/About";
import NotFound from "../screens/NotFound";
import AuthRequired from "../screens/AuthRequired";
import { ROUTES_WITH_BACKGROUND_PATTERN } from "../utils/constants";
import client from "../services/AxiosInstance";

import "/src/styles/index.scss";

const App = observer(() => {
  const { authStore, settingsStore } = useStore();
  const location = useLocation();

  useWindowResize(settingsStore.systemSettings);

  useEffect(() => {
    if (authStore.token)
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authStore.token}`;
    else delete client.defaults.headers.common["Authorization"];
  }, [authStore.token]);

  return (
    <div
      className={classNames({
        "root-background": true,
        "root-background_pattern": ROUTES_WITH_BACKGROUND_PATTERN.includes(
          location.pathname
        ),
      })}
    >
      <Header />

      <div className="workspace">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />

          <Route element={<AuthRequired />}>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
});

export default App;
