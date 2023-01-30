import { useCallback, useEffect, useState } from "react";
import { ISize, ISystemSettings } from "../stores/SettingsStore";
import { IValidatedInputField, IValidator } from "../types/OtherTypes";

export const useWindowResize = (systemSettings: ISystemSettings) => {
  const handleResize = () => {
    const size: ISize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    systemSettings.setWindowSize(size);

    if (systemSettings.windowType === "mobile") {
      if (size.width! >= 800) systemSettings.setWindowType("desktop");
    } else if (systemSettings.windowType === "desktop") {
      if (size.width! < 800) systemSettings.setWindowType("mobile");
    } else if (!systemSettings.windowType && size.width) {
      systemSettings.setWindowType(size.width >= 800 ? "desktop" : "mobile");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export const useClickAwayListener = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (
      ref.current &&
      event.target instanceof Node &&
      !ref.current.contains(event.target)
    ) {
      event.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref]);
};

export const useValidatedInputField = <T>(
  initial: T,
  validator: IValidator
): IValidatedInputField<T> => {
  const [value, setValue] = useState(initial);
  const [isValid, setValid] = useState(validator.validate(initial));
  const [message, setMessage] = useState<string | null>(
    validator.validate(initial) ? null : validator.message
  );

  const change = useCallback((newValue: T) => {
    const isNewValueValid = validator.validate(newValue);

    setValue(newValue);
    setValid(isNewValueValid);
    setMessage(isNewValueValid ? null : validator.message);
  }, []);

  return {
    value,
    isValid,
    message,
    change,
    setMessage,
  };
};
