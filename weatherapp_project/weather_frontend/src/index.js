import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Client, Server } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";


  const engine = new Client();
ReactDOM.createRoot(document.getElementById("root")).render(
  <StyletronProvider value={engine}>
  <BaseProvider theme={LightTheme}>
    <App />
  </BaseProvider>
</StyletronProvider>
);

reportWebVitals();
