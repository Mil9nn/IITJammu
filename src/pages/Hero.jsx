import React from 'react';
import Carousel from '../components/Carousel';

const EnhancedHeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#003f87] mb-4">
            Health and Wellbeing at IIT Jammu
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Supporting our campus community with comprehensive healthcare services and wellness programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Carousel - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="relative h-64 md:h-80 lg:h-96 bg-gray-200">
              <Carousel />
            </div>
            
            {/* Quick access buttons below carousel */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white">
              <button className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="text-[#003f87]">📅</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Book Appointment</span>
              </button>
              
              <button className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="text-[#003f87]">🏥</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Medical Services</span>
              </button>
              
              <button className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="text-[#003f87]">🧘</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Wellness Programs</span>
              </button>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="bg-[#003f87] text-white p-4">
              <h2 className="font-semibold text-xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Notifications
              </h2>
            </div>
            <div className="notifications flex flex-col items-start overflow-y-auto h-80 p-5">
              {/* Notification Items */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="notification group w-full flex flex-col gap-1 mb-4 p-3 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                  <p className="text-[#004088] font-medium">
                    {item === 1 ? "New mental health workshop scheduled next week" : 
                     item === 2 ? "COVID-19 booster shots now available at health center" :
                     item === 3 ? "Yoga classes every Wednesday at Student Activity Center" :
                     "Nutritionist consultation slots open for booking"}
                  </p>
                  <p className="flex items-center gap-1 text-gray-400 text-sm ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Published: {item === 1 ? "21-02-2025" : 
                                       item === 2 ? "18-02-2025" : 
                                       item === 3 ? "15-02-2025" : 
                                       "10-02-2025"}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 text-center">
              <button className="text-[#003f87] font-medium hover:underline">
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="bg-gradient-to-r from-[#003f87] to-[#0063b1] mt-8">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-4 md:mb-0 text-center md:text-left">
              <h3 className="font-bold text-xl mb-2">Need Health Support?</h3>
              <p className="text-blue-100 max-w-lg">
                Our healthcare professionals are here to support you 24/7. Don't hesitate to reach out for any concerns.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-5 py-3 rounded-full bg-white text-[#003f87] font-bold hover:bg-blue-50 cursor-pointer transition-all shadow-md">
                Emergency: 1800-123-4567
              </button>
              <button className="px-5 py-3 rounded-full bg-[#00a8ff] text-white font-bold hover:bg-[#0098e5] cursor-pointer transition-all shadow-md">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroSection;