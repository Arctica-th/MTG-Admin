import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Modal from "react-modal";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { ToastProvider, useToasts } from "react-toast-notifications";

const { store } = configureStore();
Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ToastProvider placement="top-center">
          <App />
        </ToastProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
