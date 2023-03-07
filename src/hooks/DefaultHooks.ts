import { useEffect } from "react";

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

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
};
