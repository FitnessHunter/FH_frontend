import React, { memo } from "react";
import classNames from "classnames";

import "./Button.scss";

interface ButtonProps {
  text: string;
  variant?: "outlined" | "contained";
  size?: "s" | "m" | "l";
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = memo(
  ({
    text,
    variant = "contained",
    size = "m",
    className,
    disabled,
    onClick,
  }: ButtonProps) => {
    return (
      <div
        tabIndex={0}
        className={classNames(
          {
            button: true,
            [`button_${size}`]: true,
            [`button_${variant}`]: true,
            [`button_${variant}_disabled`]: disabled,
          },
          className
        )}
        onClick={() => (disabled ? {} : onClick())}
        onKeyDown={(e) => (!disabled && e.key === "Enter" ? onClick() : {})}
      >
        {text}
      </div>
    );
  }
);

export default Button;
