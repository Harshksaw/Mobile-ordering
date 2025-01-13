import { createRoot } from "react-dom/client";
// import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")!).render(
  <>
    {/* <BrowserRouter> */}
    <App />
    <ToastContainer position="top-right" theme="dark" />
    {/* </BrowserRouter> */}
  </>
);
