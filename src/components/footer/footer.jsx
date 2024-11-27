import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#1a1a1a] text-white py-12">
      <div className="w-full xl:w-[1140px] mx-auto text-center lg:text-left px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <img src="sunway-logo.png" alt="Sunway Luxury Hotel Logo" className="w-40 mb-4" /> {/* Replace with your logo */}
            <p className="text-lg font-semibold text-pink-600 uppercase mb-4">Sunway Luxury Hotel</p>
            <p className="text-sm text-[#D1D1D1]">A premium beachfront getaway offering world-class amenities and exceptional service.</p>
            <p className="mt-4 text-sm text-[#D1D1D1]">Located on the pristine shores of the beach, Sunway Luxury Hotel promises an unforgettable stay with luxurious rooms, fine dining, and breathtaking views.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xl font-semibold mb-4">Quick Links</p>
            <ul className="text-sm text-[#D1D1D1] space-y-3">
              <li><a href="#home" className="hover:text-pink-600">Home</a></li>
              <li><a href="#rooms" className="hover:text-pink-600">Rooms</a></li>
              <li><a href="#amenities" className="hover:text-pink-600">Amenities</a></li>
              <li><a href="#contact" className="hover:text-pink-600">Contact Us</a></li>
              <li><a href="#about" className="hover:text-pink-600">About Us</a></li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xl font-semibold mb-4">Contact Us</p>
            <p className="text-sm text-[#D1D1D1] mb-4">123 Beach Avenue, Sunway Beach</p>
            <p className="text-sm text-[#D1D1D1] mb-4">+123 456 7890</p>
            <p className="text-sm text-[#D1D1D1] mb-4">info@sunwayluxury.com</p>

            <div className="flex space-x-6 mt-4">
              <a href="https://facebook.com" className="text-[#D1D1D1] hover:text-pink-600">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a href="https://instagram.com" className="text-[#D1D1D1] hover:text-pink-600">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="https://twitter.com" className="text-[#D1D1D1] hover:text-pink-600">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="https://linkedin.com" className="text-[#D1D1D1] hover:text-pink-600">
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#111111] py-4">
        <p className="text-center text-sm text-[#D1D1D1]">&copy; 2024 Sunway Luxury Hotel. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
