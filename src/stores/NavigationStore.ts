import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { createRef } from "react";
import { Location } from "react-router-dom";
import { ROUTES_WITH_BACKGROUND_PATTERN } from "../utils/constants";

export const NavigationStore = types
  .model("NavigationStore", {
    pathname: types.string,
    search: types.string,
    hash: types.string,
    key: types.string,
    isSidebarOpen: false,
  })
  .volatile((self) => ({
    sidebarRef: createRef<HTMLDivElement>(),
  }))
  .views((self) => ({
    get isPageWithPattern(): boolean {
      return ROUTES_WITH_BACKGROUND_PATTERN.includes(self.pathname);
    },
  }))
  .actions((self) => {
    const setSidebarOpen = (isSidebarOpen: boolean) => {
      self.isSidebarOpen = isSidebarOpen;
    };

    const setLocation = (location: Location) => {
      self.pathname = location.pathname;
      self.search = location.search;
      self.hash = location.hash;
      self.key = location.key;

      setSidebarOpen(false);
    };

    return { setSidebarOpen, setLocation };
  });

export const NavigationStoreInitialState: INavigationStoreInitialState = {
  pathname: "/",
  search: "",
  hash: "",
  key: "",
};

export interface INavigationStore extends Instance<typeof NavigationStore> {}
export interface INavigationStoreInitialState
  extends SnapshotIn<typeof NavigationStore> {}
