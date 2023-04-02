import { Instance, SnapshotIn, types } from "mobx-state-tree";

const WindowType = types.union(
  types.literal("desktop"),
  types.literal("mobile")
);

const Size = types.model("Size", {
  width: types.maybe(types.number),
  height: types.maybe(types.number),
});

export const SystemSettingsStore = types
  .model("SystemSettingsStore", {
    windowSize: Size,
    windowType: types.maybe(WindowType),
  })
  .actions((self) => {
    const resize = () => {
      const size: ISize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      self.windowSize = size;

      if (self.windowType === "mobile" && size.width! >= 800) {
        self.windowType = "desktop";
      } else if (self.windowType === "desktop" && size.width! < 800) {
        self.windowType = "mobile";
      } else if (!self.windowType && size.width) {
        self.windowType = size.width >= 800 ? "desktop" : "mobile";
      }
    };

    return { resize };
  })
  .actions((self) => {
    const afterCreate = () => {
      window.addEventListener("resize", self.resize);
      self.resize();
    };

    const beforeDestroy = () => {
      window.removeEventListener("resize", self.resize);
    };

    return { afterCreate, beforeDestroy };
  });

export const SystemSettingsStoreInitialState: ISystemSettingsStoreInitialState =
  {
    windowSize: {},
  };

export type WindowType = Instance<typeof WindowType>;
export interface ISize extends Instance<typeof Size> {}
export interface ISystemSettingsStore
  extends Instance<typeof SystemSettingsStore> {}
export interface ISystemSettingsStoreInitialState
  extends SnapshotIn<typeof SystemSettingsStore> {}
