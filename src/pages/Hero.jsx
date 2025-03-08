import { useState } from "react";
import Carousel from '../components/Carousel';
import NotificationsPanel from '../components/NotificationsPanel';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Heart,
  Shield,
  Lock,
  Users,
} from 'lucide-react';

const EnhancedHeroSection = () => {
  const [activeTab, setActiveTab] = useState('mission');
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#003f87] to-[#39a4cf] text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-between w-[500px] mx-auto">
            <img className="w-25 h-25" src="/images/wellness-logo.jpg" alt="wellness-centre-logo" />
              <span>Wellness Center <br /> IIT Jammu</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Our team is committed to providing comprehensive wellness services to support the mental and emotional well-being of our community. Explore our range of services designed to help you thrive.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/about-us"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full transition-all transform hover:translate-x-2"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#003f87]/80 to-[#39a4cf]/80 opacity-75"></div>
      </div>
      {/* Mission and Values Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex space-x-4 mb-6">
              {['mission', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeTab === tab
                    ? 'bg-[#003f87] text-white'
                    : 'bg-blue-100 text-[#003f87] hover:bg-blue-200'
                    }`}
                >
                  {tab === 'mission' ? 'Our Mission' : 'Core Values'}
                </button>
              ))}
            </div>

            {activeTab === 'mission' ? (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-[#003f87] mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Wellness Center at IIT Jammu is committed to fostering a healthy campus by providing comprehensive, accessible, and high-quality wellness services to students, faculty, and staff.
                </p>
                <div className="flex items-center space-x-3 text-[#39a4cf]">
                  <Heart className="h-6 w-6" />
                  <span className="font-medium">Holistic Well-being Approach</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-[#003f87] mb-4">Core Values</h2>
                <div className="space-y-3">
                  {[
                    { icon: <Shield className="h-6 w-6" />, text: "Compassion" },
                    { icon: <Lock className="h-6 w-6" />, text: "Confidentiality" },
                    { icon: <Users className="h-6 w-6" />, text: "Accessibility" }
                  ].map((value, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-700">
                      <div className="text-[#39a4cf]">{value.icon}</div>
                      <span className="font-medium">{value.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <img
              src="/images/mission.webp"
              alt="Wellness Center Mission"
              className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <p className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-600 mb-4 w-[900px] mx-auto">Supporting our campus community with comprehensive wellness programs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Carousel - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-64 md:h-80 lg:h-96 bg-gray-200">
              <Carousel />
            </div>

            {/* Quick access buttons below carousel */}
            <div className="grid grid-cols-3 gap-4 p-1 bg-white">
              <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-blue-50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="text-[#003f87]">🧘</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Wellness Programs</span>
              </button>
            </div>
          </div>
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroSection;