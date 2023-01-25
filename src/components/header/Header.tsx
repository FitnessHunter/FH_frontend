import React from "react";
import { observer } from "mobx-react-lite";

import Navigation from "./Navigation";

import "./Header.styles.scss";

const Header = observer(() => {
  return (
    <div className="header glass">
      <div className="header__text text text-l text-bold text-main"></div>

      <Navigation />
    </div>
  );
});

export default Header;
