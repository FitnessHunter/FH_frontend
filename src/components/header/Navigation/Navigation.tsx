import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/RootStore";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";
import NavigationList from "../NavigationList/NavigationList";
import { icons } from "../../../utils/icons";

import "./Navigation.scss";

const Navigation = observer(() => {
  const { settingsStore, navigationStore } = useStore();

  useEffect(() => {
    if (settingsStore.systemSettings.windowType === "desktop") {
      navigationStore.setSidebarOpen(false);
    }
  }, [settingsStore.systemSettings.windowType]);

  return (
    <div className="header__navigation navigation">
      {settingsStore.systemSettings.windowType === "desktop" && (
        <NavigationList />
      )}

      {settingsStore.systemSettings.windowType === "mobile" && (
        <>
          {!navigationStore.isSidebarOpen && (
            <div
              className="navigation__menu-icon icon_l scale-animation-1"
              onClick={() => navigationStore.setSidebarOpen(true)}
            >
              <img
                src={icons.MenuIcon}
                alt="Menu"
                className="image"
                draggable="false"
              />
            </div>
          )}

          <NavigationSidebar />
        </>
      )}
    </div>
  );
});

export default Navigation;
