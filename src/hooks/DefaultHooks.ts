import { useCallback, useEffect, useRef, useState } from "react";
import { ISize, ISystemSettings } from "../stores/SettingsStore";
import {
  Direction,
  IValidatedInputField,
  IValidator,
  Position,
} from "../types/OtherTypes";

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

export const usePauseResumeTimeout = (
  callback: () => void,
  timeout: number
) => {
  const timeoutID = useRef<NodeJS.Timeout>();
  const start = useRef(Date.now());
  const remaining = useRef(timeout);

  useEffect(() => {
    timeoutID.current = setTimeout(callback, timeout);

    return () => clearTimeout(timeoutID.current);
  }, []);

  const pause = () => {
    clearTimeout(timeoutID.current);

    timeoutID.current = undefined;
    remaining.current -= Date.now() - start.current;
  };

  const resume = () => {
    if (timeoutID.current) return;

    start.current = Date.now();
    timeoutID.current = setTimeout(callback, remaining.current);
  };

  return { pause, resume };
};

export const usePosition = () => {
  const isMobileDevice = useRef(window.hasOwnProperty("ontouchstart"));

  const [catched, setCatched] = useState(false);
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);

  const release = () => {
    setCatched(false);

    if (isMobileDevice.current) {
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", release);
    } else {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", release);
    }
  };

  const mouseMove = (e: MouseEvent) => {
    setX2(e.clientX);
    setY2(e.clientY);
  };

  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCatched(true);

    setX1(e.clientX);
    setY1(e.clientY);
    setX2(e.clientX);
    setY2(e.clientY);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", release);
  };

  const touchMove = (e: TouchEvent) => {
    setX2(e.changedTouches[0].clientX);
    setY2(e.changedTouches[0].clientY);
  };

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setCatched(true);

    setX1(e.targetTouches[0].clientX);
    setY1(e.targetTouches[0].clientY);
    setX2(e.targetTouches[0].clientX);
    setY2(e.targetTouches[0].clientY);

    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", release);
  };

  return {
    x1,
    y1,
    x2,
    y2,
    catched,
    mouseDown,
    touchStart,
    release,
  };
};

export const useSwipe = (
  callback: () => void,
  threshold: number = 100,
  permittedDirections: Direction[] = [Direction.Left, Direction.Right]
) => {
  const { x1, y1, x2, y2, catched, mouseDown, touchStart } = usePosition();
  const [direction, setDirection] = useState<Direction>();

  useEffect(() => {
    if (catched) {
      if (direction) setDirection(undefined);
      return;
    }

    for (let permittedDirection of permittedDirections) {
      const deltaX = x2 - x1;
      const deltaY = y2 - y1;

      switch (permittedDirection) {
        case Direction.Left:
          if (Math.abs(deltaX) >= threshold && deltaX < 0)
            setDirection(Direction.Left);
          break;
        case Direction.Right:
          if (Math.abs(deltaX) >= threshold && deltaX > 0)
            setDirection(Direction.Right);
          break;
        case Direction.Up:
          if (Math.abs(deltaY) >= threshold && deltaY < 0)
            setDirection(Direction.Up);
          break;
        case Direction.Down:
          if (Math.abs(deltaY) >= threshold && deltaY > 0)
            setDirection(Direction.Down);
          break;
        default:
          setDirection(undefined);
          break;
      }
    }
  }, [catched]);

  useEffect(() => {
    if (direction && callback) callback();
  }, [direction]);

  return {
    x1,
    y1,
    x2,
    y2,
    direction,
    catched,
    mouseDown,
    touchStart,
  };
};
