import React from "react";
import ReactDOM from "react-dom";
import { Client, Server } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";
import App from "./App";

// Setup Styletron for Base Web
const engine = typeof window === "undefined" ? new Server() : new Client();

ReactDOM.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>,
  document.getElementById("root")
);
