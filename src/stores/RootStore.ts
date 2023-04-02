import { Instance, onSnapshot, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { SettingsStore, SettingsStoreInitialState } from "./SettingsStore";
import {
  NotificationStore,
  NotificationStoreInitialState,
} from "./NotificationStore";
import {
  NavigationStore,
  NavigationStoreInitialState,
} from "./NavigationStore";
import { AuthStore, AuthStoreInitialState } from "./AuthStore";

const RootStore = types.model("RootStore", {
  settingsStore: SettingsStore,
  notificationStore: NotificationStore,
  navigationStore: NavigationStore,
  authStore: AuthStore,
});

export const rootStore = RootStore.create({
  settingsStore: SettingsStoreInitialState,
  notificationStore: NotificationStoreInitialState,
  navigationStore: NavigationStoreInitialState,
  authStore: AuthStoreInitialState,
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
