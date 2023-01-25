import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

import NavigationList from "./NavigationList";
import { useClickAwayListener } from "../../hooks/DefaultHooks";

import CloseIcon from "/src/assets/close-icon.svg";

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
      classNames="nav-sidebar"
      timeout={300}
      unmountOnExit
    >
      <div ref={ref} className="header__nav-sidebar nav-sidebar glass">
        <div
          className="nav-sidebar__close-icon icon-l scale-animation"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={CloseIcon}
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
