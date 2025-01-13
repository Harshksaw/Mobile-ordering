// filepath: /Users/harshsaw/Documents/GitHub/Mobile-ordering/frontend/src/main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);