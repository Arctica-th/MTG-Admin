import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/global.css";
import Modal from "react-modal";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { ToastProvider } from "react-toast-notifications";
import theme from "./theme";

const { store } = configureStore();
Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <ToastProvider placement="top-center">
            <App />
          </ToastProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
