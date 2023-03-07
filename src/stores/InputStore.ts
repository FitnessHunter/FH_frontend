import { Instance, types } from "mobx-state-tree";
import { validators, getValidator } from "../utils/validators";

const ValidatorType = types.enumeration(Object.keys(validators));

export const InputStore = types
  .model("InputStore", {
    initialInputType: types.string,
    placeholder: types.string,
    value: types.optional(types.string, ""),
    validatorType: types.maybe(ValidatorType),
    errorMessage: types.maybe(types.string),
    allowEmpty: false,
  })
  .volatile((self) => ({
    currentInputType: self.initialInputType,
    validator: getValidator(self.validatorType),
  }))
  .views((self) => ({
    get isValid(): boolean {
      return self.validator.validate(self.value);
    },
  }))
  .views((self) => ({
    get showError(): boolean {
      return (
        !(self.isValid || (self.allowEmpty && !self.value.trim())) ||
        (self.isValid && !!self.errorMessage)
      );
    },
  }))
  .actions((self) => {
    const setErrorMessage = (errorMessage: string | undefined) => {
      self.errorMessage = errorMessage;
    };

    const setCurrentInputType = (inputType: string) => {
      self.currentInputType = inputType;
    };

    const setValue = (value: string) => {
      self.value = value;

      if (self.isValid) {
        setErrorMessage(undefined);
      } else {
        setErrorMessage(self.validator.errorMessage);
      }
    };

    return {
      setErrorMessage,
      setCurrentInputType,
      setValue,
    };
  });

export type ValidatorType = Instance<typeof ValidatorType>;
export interface IInputStore extends Instance<typeof InputStore> {}
