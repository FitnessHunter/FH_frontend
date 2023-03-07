import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../stores/RootStore";
import {
  ROUTES_WITH_AUTH,
  ROUTES_WITH_NO_AUTH,
  ROUTE_NAMES,
} from "../../../utils/constants";

import "./NavigationList.scss";

const NavigationList = observer(() => {
  const { authStore, navigationStore } = useStore();

  return (
    <>
      {(authStore.isLoggedIn ? ROUTES_WITH_AUTH : ROUTES_WITH_NO_AUTH).map(
        (route) => {
          return navigationStore.pathname === route ? (
            <div
              key={route}
              className="navigation__navigation-item navigation-item navigation-item_current text text_active"
            >
              {ROUTE_NAMES[route as keyof typeof ROUTE_NAMES]}
            </div>
          ) : (
            <Link key={route} to={route}>
              <div className="navigation__navigation-item navigation-item text_main">
                {ROUTE_NAMES[route as keyof typeof ROUTE_NAMES]}
              </div>
            </Link>
          );
        }
      )}

      {authStore.isLoggedIn && (
        <div
          className="navigation__navigation-item navigation-item text text_main pointer"
          onClick={authStore.signout}
        >
          Sign Out
        </div>
      )}
    </>
  );
});

export default NavigationList;
