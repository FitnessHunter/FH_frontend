import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { useStore } from "../../../stores/RootStore";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";
import NavigationList from "../NavigationList/NavigationList";
import { icons } from "../../../utils/icons";

import "./Navigation.scss";

const Navigation = observer(() => {
  const { settingsStore } = useStore();
  const location = useLocation();

  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen && settingsStore.systemSettings.windowType === "desktop") {
      setMenuOpen(false);
    }
  }, [settingsStore.systemSettings.windowType]);

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="header__navigation navigation">
      {settingsStore.systemSettings.windowType === "desktop" && (
        <NavigationList />
      )}

      {settingsStore.systemSettings.windowType === "mobile" && (
        <>
          {!isMenuOpen && (
            <div
              className="navigation__menu-icon icon_l scale-animation"
              onClick={() => setMenuOpen(true)}
            >
              <img
                src={icons.MenuIcon}
                alt="Menu"
                className="image"
                draggable="false"
              />
            </div>
          )}

          <NavigationSidebar
            isMenuOpen={isMenuOpen}
            setMenuOpen={setMenuOpen}
          />
        </>
      )}
    </div>
  );
});

export default Navigation;
