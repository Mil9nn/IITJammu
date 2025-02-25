import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // This component assumes you're using react-router-dom for Link
  // If you're using another routing library, replace the Link component accordingly
  const Link = ({ to, className, children }) => (
    <a href={to} className={className}>
      {children}
    </a>
  );

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="logo flex items-center">
        <img
          src="/images/iitjammu-logo.png"
          alt="IIT Jammu Logo"
          className="h-12 w-auto"
        />
        <div className="hidden md:block ml-3 border-l-2 border-gray-300 pl-3">
          <h1 className="text-[#004088] font-bold text-xl">Counseling Services</h1>
          <p className="text-gray-600 text-sm">Student Wellness Center</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-6 text-[#004088] font-medium">
          <li>
            <Link to="/" className="hover:text-[#0062cc] hover:border-b-2 border-[#0062cc] pb-1 transition-all duration-200">Home</Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-[#0062cc] hover:border-b-2 border-[#0062cc] pb-1 transition-all duration-200">About Us</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-[#0062cc] hover:border-b-2 border-[#0062cc] pb-1 transition-all duration-200">Services</Link>
          </li>
          <li>
            <Link to="/resources" className="hover:text-[#0062cc] hover:border-b-2 border-[#0062cc] pb-1 transition-all duration-200">Resources</Link>
          </li>
          <li>
            <Link to="/appointments" className="hover:text-[#0062cc] hover:border-b-2 border-[#0062cc] pb-1 transition-all duration-200">Appointments</Link>
          </li>
          <li>
            <Link to="/faqs" className="hover:text-[#0062cc] hover:border-b-2 border-[#0062cc] pb-1 transition-all duration-200">FAQs</Link>
          </li>
          <li>
            <Link to="/contact-us" className="bg-[#004088] text-white px-4 py-2 rounded hover:bg-[#0062cc] transition-all duration-200">Contact Us</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu button */}
      <button 
        className="lg:hidden text-[#004088] focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50">
          <nav className="px-8 py-4">
            <ul className="flex flex-col space-y-4 text-[#004088] font-medium">
              <li>
                <Link to="/" className="block hover:text-[#0062cc] transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about-us" className="block hover:text-[#0062cc] transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="block hover:text-[#0062cc] transition-colors duration-200">Services</Link>
              </li>
              <li>
                <Link to="/resources" className="block hover:text-[#0062cc] transition-colors duration-200">Resources</Link>
              </li>
              <li>
                <Link to="/appointments" className="block hover:text-[#0062cc] transition-colors duration-200">Appointments</Link>
              </li>
              <li>
                <Link to="/faqs" className="block hover:text-[#0062cc] transition-colors duration-200">FAQs</Link>
              </li>
              <li>
                <Link to="/contact-us" className="block bg-[#004088] text-white px-4 py-2 rounded hover:bg-[#0062cc] transition-all duration-200 w-full text-center mt-2">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;