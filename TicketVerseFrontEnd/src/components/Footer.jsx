// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-black text-center text-gray-200 mt-8 shadow-lg rounded-t-3xl">
      <div className="flex flex-col items-center space-y-2">
        <p className="text-2xl font-extrabold text-white uppercase tracking-wide">
          TicketVerse
        </p>
        <p className="text-xs opacity-80 text-white">
          &copy; 2025 MovieZone. All rights reserved.
        </p>
        <div className="flex space-x-5 mt-2 text-xl text-white">
          <a 
            href="https://www.linkedin.com" 
            className="hover:text-red-600 transition-all duration-300 ease-in-out"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href="https://www.instagram.com" 
            className="hover:text-red-600 transition-all duration-300 ease-in-out"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href="https://www.twitter.com" 
            className="hover:text-red-600 transition-all duration-300 ease-in-out"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
