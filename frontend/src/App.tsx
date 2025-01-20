import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import AddCategory from "./components/AddCategory";

import Navbar from "./components/Navbar";
// import AddItemsToCategory from "./components/AddCategory";
import ViewItems from "./components/ViewItems";
import CreateCategory from "./components/CreateMenu";
import Menu from "./components/Menu";
import Orders from "./pages/Order";

function App() {
  // const qrCodeValue = `${window.location.origin}/orders`;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
          path="/createMenu"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewItem"
          element={
            // <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ViewItems />
            // </ProtectedRoute>
          }
        />
        <Route path="/viewMenu" element={<Menu />} />
        <Route path="/viewOrders" element={<Orders />} />
        {/* <Route
          path="/orders"
          element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Orders onLogout={handleLogout} />
        </ProtectedRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
