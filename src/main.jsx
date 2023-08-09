import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Bringing in the GoogleOAuthProvider from the package
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="625444603857-4igpobrhuviu4c5abrsonvsdastn6qnq.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
