import React from "react";
import classNames from "classnames";

import "./Loader.scss";

interface LoaderProps {
  fullWindow?: boolean;
  blur?: boolean;
  dark?: boolean;
}

const Loader = ({ fullWindow, blur, dark }: LoaderProps) => {
  return (
    <div
      className={classNames({
        background: true,
        ["background_full-window"]: fullWindow,
        background_blur: blur,
        background_dark: dark,
      })}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
