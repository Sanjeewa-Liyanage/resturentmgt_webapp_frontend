import React from 'react';
import UserTag from '../userdata/userdata.jsx';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        <a href="#" className="text-2xl font-bold">Sunway Hotels</a>
        <div className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#rooms" className="hover:text-gray-300">Rooms</a>
          <a href="#gallery" className="hover:text-gray-300">Gallery</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
        </div>
        <div className="">
          <UserTag />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
