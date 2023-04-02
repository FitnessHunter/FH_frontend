import { Direction } from "../stores/NotificationStore";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item === null) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};

export const calculateDirection = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  threshold: number = 100,
  permittedDirections: Direction[] = ["left", "right"]
): Direction | undefined => {
  let direction: Direction | undefined;

  for (let permittedDirection of permittedDirections) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    switch (permittedDirection) {
      case "left":
        if (Math.abs(deltaX) >= threshold && deltaX < 0) {
          direction = "left";
        }
        break;
      case "right":
        if (Math.abs(deltaX) >= threshold && deltaX > 0) {
          direction = "right";
        }
        break;
      case "up":
        if (Math.abs(deltaY) >= threshold && deltaY < 0) {
          direction = "up";
        }
        break;
      case "down":
        if (Math.abs(deltaY) >= threshold && deltaY > 0) {
          direction = "down";
        }
        break;
      default:
        direction = undefined;
        break;
    }
  }

  return direction;
};
