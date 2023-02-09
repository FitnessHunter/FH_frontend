import { createContext, useContext } from "react";
import { Instance, onSnapshot, types } from "mobx-state-tree";
import { AuthStore } from "./AuthStore";
import { SettingsStore } from "./SettingsStore";
import { getFromLocalStorage } from "../utils/methods";
import { IToken } from "../types/AuthTypes";
import { NotificationStore } from "./NotificationStore";

const RootStore = types.model({
  settingsStore: SettingsStore,
  authStore: AuthStore,
  notificationStore: NotificationStore,
});

export const rootStore = RootStore.create({
  settingsStore: { systemSettings: { windowSize: {} } },
  authStore: { token: getFromLocalStorage<IToken>("fh_token")?.token },
  notificationStore: {},
});

export type RootInstance = Instance<typeof RootStore>;
export const RootStoreContext = createContext<RootInstance | null>(null);

export const useStore = () => {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }

  return store;
};

// onSnapshot(rootStore, (snapshot) => {
//   console.log("Snapshot: ", snapshot);
// });
