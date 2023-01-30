import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";
import NavigationList from "../NavigationList/NavigationList";
import { useClickAwayListener } from "../../../hooks/DefaultHooks";
import { icons } from "../../../utils/icons";

import "./NavigationSidebar.scss";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: (isMenuOpen: boolean) => void;
}

const NavigationSidebar = observer(({ isMenuOpen, setMenuOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickAwayListener(ref, () => setMenuOpen(false));

  return (
    <CSSTransition
      in={isMenuOpen}
      nodeRef={ref}
      classNames="navigation-sidebar-animation"
      timeout={300}
      unmountOnExit
    >
      <div
        ref={ref}
        className="navigation__navigation-sidebar navigation-sidebar glass"
      >
        <div
          className="navigation-sidebar__close-icon icon_l scale-animation"
          onClick={() => setMenuOpen(false)}
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
