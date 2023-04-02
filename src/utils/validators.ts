import isEmail from "validator/lib/isEmail";

export interface IValidator {
  errorMessage: string;
  validate: (value: any) => boolean;
}

export interface IValidators {
  email: IValidator;
  password: IValidator;
  notEmpty: IValidator;
  default: IValidator;
}

export const validators: IValidators = {
  email: {
    errorMessage: "Enter correct email address",
    validate: (email: string) => isEmail(email),
  },
  password: {
    errorMessage: "Minimum 8 characters, at least 1 letter and 1 number",
    validate: (password: string) =>
      /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/i.test(password),
  },
  notEmpty: {
    errorMessage: "This field is required",
    validate: (value: string) => !!value.trim(),
  },
  default: {
    errorMessage: "Validator not found",
    validate: () => false,
  },
};

export const getValidator = (validatorType: string | undefined): IValidator => {
  const validator = validators[validatorType as keyof IValidators];

  if (!validator) {
    return validators.default;
  }

  return validator;
};
