import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ConfirmEmail from "./pages/ConfirmEmail.jsx";
import CariTiketLain from "./components/CariTiketLain.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import Search from "./pages/Search.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
