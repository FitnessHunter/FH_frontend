import React, { useState } from "react";

import { IValidatedInputField } from "../../types/OtherTypes";

import ShowIcon from "/src/assets/show-icon.svg";
import HideIcon from "/src/assets/hide-icon.svg";

interface Props {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  field: IValidatedInputField<string>;
  allowEmpty?: boolean;
  className?: string;
  disabled?: boolean;
  onEnterPress?: () => void;
}

const Input = ({
  type,
  placeholder,
  field,
  allowEmpty,
  className,
  disabled,
  onEnterPress,
}: Props) => {
  const [inputType, setInputType] = useState<React.HTMLInputTypeAttribute>(
    type || "text"
  );

  return (
    <div className="input-container">
      <input
        type={inputType}
        placeholder={placeholder}
        value={field.value}
        onChange={(e) => field.change(e.target.value)}
        onKeyDown={(e) =>
          !disabled && onEnterPress && e.key === "Enter" ? onEnterPress() : {}
        }
        className={`input${
          field.isValid || (allowEmpty && !field.value) ? "" : " input-error"
        }${type === "password" ? " input-password" : ""}${
          className ? ` ${className}` : ""
        }`}
        disabled={disabled}
      />

      <span
        className={`input-label${
          field.isValid || (allowEmpty && !field.value)
            ? ""
            : " input-label-error"
        }`}
      >
        {placeholder}
      </span>

      {type === "password" && (
        <div
          className="input-container__show-hide icon-m scale-animation"
          onClick={() =>
            setInputType(inputType === "text" ? "password" : "text")
          }
        >
          {inputType === "text" ? (
            <img
              src={HideIcon}
              alt="Hide"
              className="image"
              draggable="false"
            />
          ) : (
            <img
              src={ShowIcon}
              alt="Show"
              className="image"
              draggable="false"
            />
          )}
        </div>
      )}

      <div className="input-container__input-error-message input-error-message">
        {allowEmpty && !field.value ? "" : field.message}
      </div>
    </div>
  );
};

export default Input;
