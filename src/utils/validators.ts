import isEmail from "validator/lib/isEmail";
import { IValidator } from "../types/OtherTypes";

export const emailValidator: IValidator = {
  validate: (email: string) => isEmail(email),
  message: "Enter correct email address",
};

export const passwordValidator: IValidator = {
  validate: (password: string) =>
    /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/i.test(password),
  message: "Minimum 8 characters, at least 1 letter and 1 number",
};

export const notEmptyValidator: IValidator = {
  validate: (value: string) => !!value.trim(),
  message: "This field is required",
};
