import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import AddCategory from "./components/AddCategory";
import CreateCategory from "./components/CreateCategory";
import Navbar from "./components/Navbar";

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
       <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={

          <Home  isAuthenticated={isAuthenticated}/>

          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/addItem"
          element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <AddItem />
        </ProtectedRoute>
          }
        />
        <Route
          path="/addCategory"
          element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <AddCategory />
        </ProtectedRoute>
          }
        />
        <Route
          path="/createCategory"
          element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <CreateCategory />
        </ProtectedRoute>
          }
        />
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
