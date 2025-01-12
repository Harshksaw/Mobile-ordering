import React from "react";
import { QRCodeSVG } from "qrcode.react";
interface HomeProps {
  isAuthenticated: boolean;
}
import { io } from "socket.io-client";

const Home: React.FC<HomeProps> = ({ isAuthenticated }) => {
  const qrCodeValue = "https://example.com/orders";
  const BASE_URL = import.meta.env.VITE_SOCKET_URL;
  const socket = io(`${BASE_URL}`);

  socket.on("connect", () => {
    console.log("Connected to socket server");
    socket.emit("joinGroup", "12345");
  });

  socket.on("order-processsing", (data) => {
    console.log("Message received:", data);
  });

  return (
    <div className="h-full w-full flex-col gap-20 bg-green-100 text-red-500 flex items-center justify-center">
      {isAuthenticated && (
        <>
          <h1>Scan the QR Code to go to Orders</h1>
          <QRCodeSVG value={qrCodeValue} size={256} />
        </>
      )}
    </div>
  );
};

export default Home;
