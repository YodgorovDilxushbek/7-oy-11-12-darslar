import React from 'react';
import { Link } from 'react-router-dom';
function MainLayout({ children }) {
  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-300 transition duration-300">Home</Link>
          <div className="space-x-6">
            <Link
              to="/login"
              className="text-lg font-semibold hover:text-blue-300 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg font-semibold hover:text-blue-300 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
      <main className="py-10 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default MainLayout;
