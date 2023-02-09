import React, { useRef } from "react";
import classNames from "classnames";
import ImagePreview from "../../Elements/ImagePreview/ImagePreview";
import { icons } from "../../../utils/icons";

import "./AuthSwitch.scss";

interface Props {
  variant: "signin" | "signup";
  image?: File | null;
  toggleVariant: () => void;
  setImage?: (image: File | null) => void;
}

const AuthSwitch = ({ variant, image, toggleVariant, setImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image && setImage) setImage(image);
  };

  const removeImage = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (setImage) setImage(null);
  };

  return variant === "signin" ? (
    <div className="auth-switch scale-animation-1" onClick={toggleVariant}>
      <div className="icon_xl">
        <img
          src={icons.AddAccountIcon}
          alt="Add account"
          className="image"
          draggable="false"
        />
      </div>
    </div>
  ) : (
    <>
      <div
        className={classNames({
          "auth-switch": true,
          "auth-switch_no-preview": !image,
          "auth-switch_with-preview": image,
          "scale-animation-1": !image,
        })}
        onClick={() => inputRef.current?.click()}
      >
        {image ? (
          <ImagePreview
            image={image}
            alt="Avatar preview"
            className="image avatar-preview"
            defaultClassName="image icon_xl"
          />
        ) : (
          <div className="icon_xl">
            <img
              src={icons.AddPhotoIcon}
              alt="Add photo"
              className="image"
              draggable="false"
            />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={uploadImage}
        hidden
      />

      {image && (
        <div
          className="auth-switch-clear-preview icon_s scale-animation-1"
          onClick={removeImage}
        >
          <img
            src={icons.CloseIcon}
            alt="Remove"
            className="image"
            draggable="false"
          />
        </div>
      )}
    </>
  );
};

export default AuthSwitch;
