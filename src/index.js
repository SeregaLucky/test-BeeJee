/* import - node_modules */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
/* import - CSS */
import "./index.css";
/* import - store */
import store from "./redux/store";
/* import - COMPONENT */
import App from "./components/App/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
