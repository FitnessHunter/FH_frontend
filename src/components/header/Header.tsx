import React from "react";
import { observer } from "mobx-react-lite";
import Navigation from "./Navigation/Navigation";

import "./Header.scss";

const Header = observer(() => {
  return (
    <div className="header glass">
      <div className="header__text text text_l text_bold text_main"></div>

      <Navigation />
    </div>
  );
});

export default Header;
