import React from "react";
import { QRCodeSVG } from "qrcode.react";
interface HomeProps {
  isAuthenticated: boolean;
}

const Home: React.FC<HomeProps> = ({ isAuthenticated }) => {
  const qrCodeValue = "https://example.com/orders";

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
