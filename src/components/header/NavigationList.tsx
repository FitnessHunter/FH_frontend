import React from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";

import { useStore } from "../../stores/RootStore";
import {
  ROUTES_WITH_AUTH,
  ROUTES_WITH_NO_AUTH,
  ROUTE_NAMES,
} from "../../utils/constants";

const NavigationList = observer(() => {
  const { authStore } = useStore();
  const location = useLocation();

  return (
    <>
      {(authStore.isLoggedIn ? ROUTES_WITH_AUTH : ROUTES_WITH_NO_AUTH).map(
        (route) => {
          return location.pathname === route ? (
            <div
              key={route}
              className="navbar__navbar-item navbar-item navbar-item-current text text-active"
            >
              {ROUTE_NAMES[route as keyof typeof ROUTE_NAMES]}
            </div>
          ) : (
            <Link key={route} to={route}>
              <div className="navbar__navbar-item navbar-item text-main">
                {ROUTE_NAMES[route as keyof typeof ROUTE_NAMES]}
              </div>
            </Link>
          );
        }
      )}
    </>
  );
});

export default NavigationList;
