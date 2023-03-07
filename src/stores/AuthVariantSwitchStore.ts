import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { createRef } from "react";

export const AuthVariantSwitchStore = types
  .model("AuthVariantSwitchStore", {
    image: types.maybe(types.frozen<File>()),
  })
  .volatile((self) => ({
    inputRef: createRef<HTMLInputElement>(),
    imagePreview: "",
  }))
  .actions((self) => {
    const setImagePreview = (imagePreview: string) => {
      self.imagePreview = imagePreview;
    };

    const chooseFile = () => {
      if (self.inputRef.current) {
        self.inputRef.current.click();
      }
    };

    const removeImage = () => {
      self.image = undefined;
      setImagePreview("");

      if (self.inputRef.current) {
        self.inputRef.current.value = "";
      }
    };

    return {
      setImagePreview,
      chooseFile,
      removeImage,
    };
  })
  .actions((self) => {
    const createImagePreview = () => {
      if (self.image) {
        const reader = new FileReader();

        reader.readAsDataURL(self.image);
        reader.onloadend = (e) => {
          const result = e.target?.result;

          if (result instanceof ArrayBuffer) {
            self.setImagePreview(new TextDecoder().decode(result));
          } else {
            self.setImagePreview(result ?? "");
          }
        };
      } else {
        self.setImagePreview("");
      }
    };

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files?.[0];

      if (image) {
        self.image = image;
        createImagePreview();
      }
    };

    return {
      uploadImage,
    };
  });

export const AuthVariantSwitchStoreInitialState: IAuthVariantSwitchStoreInitialState =
  {};

export interface IAuthVariantSwitchStore
  extends Instance<typeof AuthVariantSwitchStore> {}
export interface IAuthVariantSwitchStoreInitialState
  extends SnapshotIn<typeof AuthVariantSwitchStore> {}
