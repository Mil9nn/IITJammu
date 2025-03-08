import React from 'react';
import { Link } from 'react-router-dom';

const WellnessCTA = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="shadow-lg rounded-md">
        <div className="container mx-auto px-4 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="text-center md:text-left max-w-2xl">
              <h3 className="font-bold text-2xl mb-4">Need Wellness Support?</h3>
              <p className="mb-6 leading-relaxed">
                Our Wellness Center is here to help you thrive. Reach out to our wellness team for guidance, resources, or to learn more about our comprehensive support programs designed for your well-being.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <a
                href="tel:01912571111"
                className="flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#003f87] font-bold hover:bg-blue-50 transition-all duration-300 shadow-md space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Emergency Helpline</span>
              </a>

              <Link
                to="/contact-us"
                className="flex items-center justify-center px-6 py-3 rounded-full bg-[#00a8ff] text-white font-bold hover:bg-[#0098e5] transition-all duration-300 shadow-md space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WellnessCTA;