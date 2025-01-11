import { useState } from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";

function App() {



  const qrCodeValue = `${window.location.origin}/orders`;


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (


<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* <Route
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Orders onLogout={handleLogout} />
            </ProtectedRoute>
          }
        /> */}
        
      </Routes>
    </Router>

    

  );
}

export default App;
