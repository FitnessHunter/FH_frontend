import React from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";
import { useOnClickOutside } from "usehooks-ts";
import { useStore } from "../../../stores/RootStore";
import NavigationList from "../NavigationList/NavigationList";
import { icons } from "../../../utils/icons";

import "./NavigationSidebar.scss";

const NavigationSidebar = observer(() => {
  const { navigationStore } = useStore();

  useOnClickOutside(navigationStore.sidebarRef, () =>
    navigationStore.setSidebarOpen(false)
  );

  return (
    <CSSTransition
      in={navigationStore.isSidebarOpen}
      nodeRef={navigationStore.sidebarRef}
      classNames="navigation-sidebar-animation"
      timeout={300}
      unmountOnExit
    >
      <div
        ref={navigationStore.sidebarRef}
        className="navigation__navigation-sidebar navigation-sidebar glass"
      >
        <div
          className="navigation-sidebar__close-icon icon_l scale-animation-1"
          onClick={() => navigationStore.setSidebarOpen(false)}
        >
          <img
            src={icons.CloseIcon}
            alt="Close"
            className="image"
            draggable="false"
          />
        </div>

        <NavigationList />
      </div>
    </CSSTransition>
  );
});

export default NavigationSidebar;
