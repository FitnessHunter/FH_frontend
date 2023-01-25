import { Instance, types } from "mobx-state-tree";

import { WindowType } from "../types/OtherTypes";

export const Size = types.model("Size", {
  width: types.maybe(types.number),
  height: types.maybe(types.number),
});

export const SystemSettings = types
  .model("SystemSettings", {
    windowSize: Size,
    windowType: types.maybe(
      types.union(types.literal("desktop"), types.literal("mobile"))
    ),
  })
  .actions((self) => ({
    setWindowSize(size: ISize) {
      self.windowSize = size;
    },
    setWindowType(type: WindowType) {
      self.windowType = type;
    },
  }));

export const SettingsStore = types.model("SettingsStore", {
  systemSettings: SystemSettings,
});

export interface ISize extends Instance<typeof Size> {}
export interface ISystemSettings extends Instance<typeof SystemSettings> {}
