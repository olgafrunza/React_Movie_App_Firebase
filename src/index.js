import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { MovieProvider } from "./context/Movies";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <MovieProvider>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </MovieProvider>
  </Router>
);
