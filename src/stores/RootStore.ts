import { createContext, useContext } from "react";
import { Instance, onSnapshot, types } from "mobx-state-tree";
import { AuthStore } from "./AuthStore";
import { SettingsStore } from "./SettingsStore";
import { getFromLocalStorage } from "../utils/methods";
import { IToken } from "../types/AuthTypes";

const RootStore = types.model({
  authStore: AuthStore,
  settingsStore: SettingsStore,
});

export const rootStore = RootStore.create({
  authStore: { token: getFromLocalStorage<IToken>("fh_token")?.token },
  settingsStore: { systemSettings: { windowSize: {} } },
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
