import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useStore } from "../stores/RootStore";
import Header from "./Header/Header";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Account from "../pages/Account";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import { AuthRequired, NoAuthRequired } from "../pages/RouterPermissions";
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
          <Route path="/about" element={<About />} />

          <Route element={<NoAuthRequired to="/" />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          <Route element={<AuthRequired to="/auth" />}>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <NotificationContainer />
    </div>
  );
});

export default App;
