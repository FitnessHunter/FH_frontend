import React from "react";

import AddAccountIcon from "/src/assets/add-profile-icon.svg";
import AddPhotoIcon from "/src/assets/add-photo-icon.svg";

interface Props {
  variant: "signin" | "signup";
  setVariant: (variant: "signin" | "signup") => void;
}

const AuthSwitch = ({ variant, setVariant }: Props) => {
  console.log("render_AuthSwitch");

  return (
    <div
      className="auth-switch scale-animation"
      onClick={() => setVariant(variant === "signin" ? "signup" : "signin")}
    >
      <div className="icon-xl">
        {variant === "signin" ? (
          <img
            src={AddAccountIcon}
            alt="Add account"
            className="image"
            draggable="false"
          />
        ) : (
          <img
            src={AddPhotoIcon}
            alt="Add photo"
            className="image"
            draggable="false"
          />
        )}
      </div>
    </div>
  );
};

export default AuthSwitch;
