import { IValidatedInputField } from "./OtherTypes";

export interface IToken {
  token: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserUpdatingDTO {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  image?: string;
}

export interface ISigninForm {
  email: IValidatedInputField<string>;
  password: IValidatedInputField<string>;
  isFormValid: boolean;
  signin: () => void;
}

export interface ISignupForm {
  email: IValidatedInputField<string>;
  firstName: IValidatedInputField<string>;
  lastName: IValidatedInputField<string>;
  password: IValidatedInputField<string>;
  passwordConfirmation: IValidatedInputField<string>;
  image: File | null;
  isFormValid: boolean;
  setImage: (image: File | null) => void;
  signup: () => void;
}
