import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

import { useStore } from "../../stores/RootStore";
import NavigationSidebar from "./NavigationSidebar";
import NavigationList from "./NavigationList";

import MenuIcon from "/src/assets/menu-icon.svg";

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
    <>
      {settingsStore.systemSettings.windowType === "desktop" && (
        <div className="header__navbar navbar">
          <NavigationList />
        </div>
      )}

      {settingsStore.systemSettings.windowType === "mobile" && (
        <>
          {!isMenuOpen && (
            <div
              className="header__menu-icon icon-l scale-animation"
              onClick={() => setMenuOpen(true)}
            >
              <img
                src={MenuIcon}
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
    </>
  );
});

export default Navigation;
