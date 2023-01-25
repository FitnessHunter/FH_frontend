import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { rootStore, RootStoreContext } from "./stores/RootStore";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RootStoreContext.Provider value={rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootStoreContext.Provider>
  </React.StrictMode>
);
