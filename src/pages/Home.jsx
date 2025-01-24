import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import LowerMenu from '../components/LowerMenu';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state
  };

  return (
    <div className="h-[100vh] bg-black relative">
      {/* Button for hamburger or cross */}
      <button
        className="absolute top-4 left-4 z-50 p-4 bg-gray-800 text-white rounded-md"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sliding menu */}
      <SideMenu
        className={`absolute top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 z-40 ${
          isMenuOpen ? 'transform-none' : '-translate-x-full'
        }`}
      />

      {/* Main content */}
      <div className={`transition-all duration-300 ${isMenuOpen ? 'ml-100' : ''}`}>
        {/* Your main content */}
        <h1 className="text-white text-center py-20">Welcome to the Home Page!</h1>
        <LowerMenu />
      </div>
    </div>
  );
}
