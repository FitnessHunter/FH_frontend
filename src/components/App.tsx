import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";

import { useStore } from "../stores/RootStore";
import { useWindowResize } from "../hooks/DefaultHooks";
import Header from "./header/Header";
import Home from "../screens/Home";
import Auth from "../screens/Auth";
import Account from "../screens/Account";
import About from "../screens/About";
import NotFound from "../screens/NotFound";
import AuthRequired from "../screens/AuthRequired";
import { ROUTES_WITH_BACKGROUND_PATTERN } from "../utils/constants";

import "../index.scss";

const App = observer(() => {
  const { authStore, settingsStore } = useStore();
  const location = useLocation();

  useWindowResize(settingsStore.systemSettings);

  return (
    <div
      className={`root-background ${
        ROUTES_WITH_BACKGROUND_PATTERN.includes(location.pathname)
          ? "root-background-pattern"
          : "root-background-white"
      }`}
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
