export type WindowType = "desktop" | "mobile";

export interface IValidatedInputField<T> {
  value: T;
  isValid: boolean;
  message: string | null;
  change: (newValue: T) => void;
  setMessage: (newMessage: string | null) => void;
}

export interface IValidator {
  validate: (value: any) => boolean;
  message: string;
}

export interface Position {
  x?: number;
  y?: number;
}

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}
