import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import App from "./App";
import { store } from "./store/store";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
