import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoveRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/resources", label: "Resources" },
    { path: "/events", label: "Events" },
    { path: "/appointments", label: "Appointment" },
    { path: "/faqs", label: "FAQs" },
  ];

  const renderNavLink = (path, label, isMobile = false) => {
    const isActive = currentPath === path;
    const baseClasses = "transition-all duration-200 ease-in-out";
    
    if (isMobile) {
      return (
        <Link 
          to={path} 
          className={`block ${baseClasses} ${
            isActive 
              ? "text-[#0062cc] font-bold" 
              : "text-[#004088] hover:text-[#0062cc] hover:translate-x-1"
          }`}
        >
          {label}
        </Link>
      );
    }

    return (
      <Link 
        to={path} 
        className={`hover:text-[#0062cc] pb-1 ${baseClasses} ${
          isActive 
            ? "text-[#0062cc] border-b-2 border-[#0062cc]" 
            : "text-[#004088]"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <a href="https://www.iitjammu.ac.in/">
        <img 
          src="/images/iit-jammu-logo.png" 
          alt="IIT Jammu Logo" 
          className="h-10 md:h-12 w-auto transition-all duration-300 hover:scale-105" 
        />
        </a>
        <div className="hidden md:block border-l-2 border-gray-300 pl-3">
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-6 text-[#004088] font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              {renderNavLink(link.path, link.label)}
            </li>
          ))}
          <li className="">
            <a href="https://www.iitjammu.ac.in/medical-centre/" className={`px-4 py-2 rounded transition-all duration-200 group button-hover-effect flex items-center gap-1.5`}>
              Medical Center<MoveRight className="mt-[3px]" />
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile menu button */}
      <button 
        className="lg:hidden text-[#004088] focus:outline-none transform transition-transform duration-200 active:scale-90" 
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
        <div className="lg:hidden fixed inset-0 bg-white/95 z-50 overflow-y-auto">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/iit-jammu-logo.png" 
                  alt="IIT Jammu Logo" 
                  className="h-10 w-auto" 
                />
                <div>
                  <h1 className="text-[#004088] font-bold text-xl">Wellness Center</h1>
                  <p className="text-gray-600 text-sm">Your Wellness, Our Priority</p>
                </div>
              </div>
              <button onClick={toggleMenu} className="text-[#004088] focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-6 text-[#004088] font-medium">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    {renderNavLink(link.path, link.label, true)}
                  </li>
                ))}
                <li className="mt-4">
                  <Link 
                    to="/contact-us" 
                    className={`block px-4 py-3 rounded transition-all duration-200 text-center ${
                      currentPath === "/contact-us" 
                        ? "bg-[#0062cc] text-white" 
                        : "bg-[#004088] text-white hover:bg-[#0062cc]"
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;