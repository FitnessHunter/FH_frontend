import { SnapshotIn, types } from "mobx-state-tree";
import {
  SystemSettingsStore,
  SystemSettingsStoreInitialState,
} from "./SystemSettingsStore";

export const SettingsStore = types.model("SettingsStore", {
  systemSettings: SystemSettingsStore,
});

export const SettingsStoreInitialState: ISettingsStoreInitialState = {
  systemSettings: SystemSettingsStoreInitialState,
};

export interface ISettingsStoreInitialState
  extends SnapshotIn<typeof SettingsStore> {}
