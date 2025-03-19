import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 px-8 py-4 flex justify-between items-center 
                    backdrop-blur-lg bg-black bg-opacity-40 shadow-lg border-b border-gray-600">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-red-500 to-pink-500 tracking-wide">
        TicketVerse
      </h1>

      {/* Navigation Links */}
      <ul className="flex gap-8 text-lg font-medium">
        <li><Link to="/home" className="hover:text-pink-400">Home</Link></li>
        <li><Link to="/movies" className="hover:text-pink-400">Movies</Link></li>
        <li><Link to="/profile" className="hover:text-pink-400">Profile</Link></li>
        <li><Link to="/contact" className="hover:text-pink-400">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
