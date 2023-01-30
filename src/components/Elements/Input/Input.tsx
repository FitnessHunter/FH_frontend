import React, { memo, useMemo, useState } from "react";
import classNames from "classnames";
import { icons } from "../../../utils/icons";

import "./Input.scss";

interface Props {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  errorMessage?: string | null;
  allowEmpty?: boolean;
  className?: string;
  disabled?: boolean;
  isValid?: boolean;
  setValue: (value: string) => void;
  onEnterPress?: () => void;
}

const Input = memo(
  ({
    type,
    placeholder,
    value,
    errorMessage,
    allowEmpty,
    className,
    disabled,
    isValid,
    setValue,
    onEnterPress,
  }: Props) => {
    const [inputType, setInputType] = useState<React.HTMLInputTypeAttribute>(
      type || "text"
    );

    const showError = useMemo(
      () =>
        (isValid !== undefined &&
          !(isValid || (allowEmpty && !value.trim()))) ||
        (isValid && !!errorMessage),
      [isValid, allowEmpty, value, errorMessage]
    );

    return (
      <div className="input-container">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) =>
            !disabled && onEnterPress && isValid && e.key === "Enter"
              ? onEnterPress()
              : {}
          }
          className={classNames(
            {
              input: true,
              input_error: showError,
              input_password: type === "password",
            },
            className
          )}
          disabled={disabled}
        />

        <span
          className={classNames({
            "input-label": true,
            "input-label_error": showError,
          })}
        >
          {placeholder}
        </span>

        {type === "password" && (
          <div
            className={classNames({
              "input-container__show-hide icon_m scale-animation": true,
              icon_disabled: disabled,
            })}
            onClick={() =>
              disabled
                ? {}
                : setInputType(inputType === "text" ? "password" : "text")
            }
          >
            <img
              src={inputType === "text" ? icons.HideIcon : icons.ShowIcon}
              alt="Show/Hide"
              className="image"
              draggable="false"
            />
          </div>
        )}

        <div className="input-container__input-error-message input-error-message text">
          {errorMessage && showError ? errorMessage : ""}
        </div>
      </div>
    );
  }
);

export default Input;
