import React from "react";
import emailjs from "@emailjs/browser";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./store/cartStore";
import "./index.css";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* CartProvider ครอบ App ทั้งหมด ทำให้ทุกหน้าเข้าถึง cart ได้ */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);