import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { IInputStore } from "../../../stores/InputStore";
import { icons } from "../../../utils/icons";

import "./Input.scss";

interface InputProps {
  field: IInputStore;
  className?: string;
  disabled?: boolean;
  onEnterPress?: () => void;
  setValue?: (value: string) => void;
}

const Input = observer(
  ({ field, className, disabled, onEnterPress, setValue }: InputProps) => {
    return (
      <div className="input-container">
        <input
          type={field.currentInputType}
          placeholder={field.placeholder}
          value={field.value}
          onChange={(e) =>
            setValue ? setValue(e.target.value) : field.setValue(e.target.value)
          }
          onKeyDown={(e) =>
            !disabled && onEnterPress && field.isValid && e.key === "Enter"
              ? onEnterPress()
              : {}
          }
          className={classNames(
            {
              input: true,
              input_error: field.showError,
              input_password: field.initialInputType === "password",
            },
            className
          )}
          disabled={disabled}
        />

        <span
          className={classNames({
            "input-label": true,
            "input-label_error": field.showError,
          })}
        >
          {field.placeholder}
        </span>

        {field.initialInputType === "password" && (
          <div
            className={classNames({
              "input-container__show-hide icon_m scale-animation-1": true,
              icon_disabled: disabled,
            })}
            onClick={() =>
              disabled
                ? {}
                : field.setCurrentInputType(
                    field.currentInputType === "text" ? "password" : "text"
                  )
            }
          >
            <img
              src={
                field.currentInputType === "text"
                  ? icons.HideIcon
                  : icons.ShowIcon
              }
              alt="Show/Hide"
              className="image"
              draggable="false"
            />
          </div>
        )}

        <div className="input-container__input-error-message input-error-message text">
          {field.showError ? field.errorMessage : ""}
        </div>
      </div>
    );
  }
);

export default Input;
