// filepath: /Users/harshsaw/Documents/GitHub/Mobile-ordering/frontend/src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className="w-full flex  p-4">
      {!isAuthenticated ? (
        <Link
          to="/login"
          className="bg-red-500 text-white p-4 rounded-md"
        >
          Login
        </Link>
      ) : (
        <ul className="flex gap-4 bg-green-300 p-8 rounded-md text-2xl w-full">
          <li>
            <Link to="/addCategory">Add Category</Link>
          </li>
          <li>
            <Link to="/addItem">Add Item</Link>
          </li>
          <li>
            <Link to="/CreateMenu">Add Item</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;