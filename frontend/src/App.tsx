import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const qrCodeValue = `${window.location.origin}/orders`;

  return (
    <>
      <Login />
      {/* <div cls="h-full w-full bg-green-800 text-red-500 flex items-center justify-center"> */}
      {/* he */}
      {/* <h1>Scan the QR Code to go to Orders</h1>
        <QRCodeSVG value={qrCodeValue} size={256} /> */}
      {/* </div> */}
    </>
  );
}

export default App;
