import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoveRight, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when location changes or on ESC key
  useEffect(() => {
    setIsMenuOpen(false);

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/team", label: "Team" },
    { path: "/resources", label: "Resources" },
    { path: "/events", label: "Events" },
    { path: "/appointments", label: "Appointment" },
    { path: "/faqs", label: "FAQs" }
  ];

  const renderNavLink = (path, label, isMobile = false) => {
    const isActive = currentPath === path;
    const baseClasses = "transition-all duration-200 ease-in-out";

    if (isMobile) {
      return (
        <Link
          to={path}
          className={`block ${baseClasses} ${isActive
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
        className={`hover:text-[#0062cc] pb-1 ${baseClasses} ${isActive
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
        <a href="https://www.iitjammu.ac.in/" className="flex-shrink-0">
          <img
            src="/images/iit-jammu-logo.png"
            alt="IIT Jammu Logo"
            className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-300 hover:scale-105"
          />
        </a>
        <div className="hidden md:block border-l-2 border-gray-300 pl-3">
          <h2 className="text-[#004088] font-semibold text-sm md:text-base">Wellness Center</h2>
          <p className="text-gray-600 text-xs md:text-sm hidden sm:block">Your Wellness, Our Priority</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-4 xl:gap-6 text-[#004088] font-medium text-sm xl:text-base">
          {navLinks.map((link) => (
            <li key={link.path}>
              {renderNavLink(link.path, link.label)}
            </li>
          ))}
          <li>
            <a
              href="https://www.iitjammu.ac.in/medical-centre/"
              className="flex items-center gap-1.5 text-black hover:scale-[1.1] hover:underline transition-all"
            >
              <span className="relative z-10">Medical Center</span>
              <MoveRight className="h-4 w-4 relative z-10 mt-1" />
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
        <div className="lg:hidden fixed inset-0 bg-white/95 z-50 overflow-y-auto pt-safe-top pb-safe-bottom">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/iit-jammu-logo.png"
                  alt="IIT Jammu Logo"
                  className="h-10 w-auto"
                />
                <div>
                  <h1 className="text-[#004088] font-bold text-lg sm:text-xl">Wellness Center</h1>
                  <p className="text-gray-600 text-xs sm:text-sm">Your Wellness, Our Priority</p>
                </div>
              </div>
              <button
                onClick={toggleMenu}
                className="text-[#004088] p-2 focus:outline-none"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-5 text-[#004088] font-medium text-lg">
                {navLinks.map((link) => (
                  <li key={link.path} className="border-b border-gray-100 pb-2">
                    {renderNavLink(link.path, link.label, true)}
                  </li>
                ))}
                <li className="pt-3">
                  <a
                    href="https://www.iitjammu.ac.in/medical-centre/"
                    className="block px-4 py-3 rounded transition-all duration-200 text-center bg-[#004088] text-white hover:bg-[#0062cc] flex items-center justify-center gap-2"
                  >
                    Medical Center <MoveRight className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} IIT Jammu Wellness Center</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;