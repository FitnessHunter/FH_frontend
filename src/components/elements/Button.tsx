import React from "react";

interface Props {
  variant: "outlined" | "contained";
  text: string;
  size?: "s" | "m" | "l";
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

const Button = ({
  text,
  variant,
  size = "m",
  disabled,
  className,
  onClick,
}: Props) => {
  return (
    <div
      tabIndex={0}
      className={`button button-${size} button-${variant}${
        disabled ? ` button-${variant}-disabled` : ""
      }${className ? ` ${className}` : ""}`}
      onClick={() => (disabled ? {} : onClick())}
      onKeyDown={(e) => (!disabled && e.key === "Enter" ? onClick() : {})}
    >
      {text}
    </div>
  );
};

export default Button;
