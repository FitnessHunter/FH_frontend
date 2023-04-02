import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useStore } from "../../../stores/RootStore";
import ImagePreview from "../../Elements/ImagePreview/ImagePreview";
import { icons } from "../../../utils/icons";

import "./AuthVariantSwitch.scss";

const AuthVariantSwitch = observer(() => {
  const { authStore } = useStore();

  return (
    <>
      {authStore.authVariant === "signin" ? (
        <div
          className={classNames({
            ["auth-switch"]: true,
            ["scale-animation-1"]: true,
            disabled: authStore.loading,
          })}
          onClick={() => authStore.setAuthVariant("signup")}
        >
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
          <input
            ref={authStore.authVariantSwitch!.inputRef}
            type="file"
            accept="image/*"
            onChange={authStore.authVariantSwitch!.uploadImage}
            hidden
          />

          <div
            className={classNames({
              "auth-switch": true,
              "auth-switch_no-preview":
                !authStore.authVariantSwitch!.imagePreview,
              "auth-switch_with-preview":
                authStore.authVariantSwitch!.imagePreview,
              "scale-animation-1": !authStore.authVariantSwitch!.imagePreview,
              disabled: authStore.loading,
            })}
            onClick={authStore.authVariantSwitch!.chooseFile}
          >
            {authStore.authVariantSwitch!.imagePreview ? (
              <ImagePreview
                src={authStore.authVariantSwitch!.imagePreview}
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

          {authStore.authVariantSwitch!.imagePreview && (
            <div
              className={classNames({
                ["auth-switch-clear-preview icon_s"]: true,
                ["scale-animation-1"]: true,
                disabled: authStore.loading,
              })}
              onClick={authStore.authVariantSwitch!.removeImage}
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
      )}
    </>
  );
});

export default AuthVariantSwitch;
