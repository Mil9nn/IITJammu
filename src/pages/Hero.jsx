import { useState } from "react";
import Carousel from '../components/Carousel';
import NotificationsPanel from '../components/NotificationsPanel';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Shield,
  Lock,
  Users,
} from 'lucide-react';

const EnhancedHeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#003f87] to-[#39a4cf] text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              {/* Logo and Title with better alignment */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="bg-white p-2 rounded-full shadow-lg">
                  <img
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
                    src="/images/wellness-logo.jpg"
                    alt="Wellness Centre Logo"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="block md:text-left">Wellness Center</span>
                  <span className="block text-blue-200 md:text-left mt-1">IIT Jammu</span>
                </h1>
              </div>

              {/* Description with better spacing */}
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Our team is committed to providing comprehensive wellness services to support
                the mental and emotional well-being of our community. Explore our range of
                services designed to help you thrive.
              </p>

              {/* Buttons with better styling */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/about-us"
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full
                      transition-all duration-300 hover:bg-white/10 transform hover:-translate-y-1"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Improved gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003f87]/80 to-[#39a4cf]/80 opacity-75"></div>

        {/* Decorative elements for visual interest */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-white/5"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border-l-4 border-[#003f87] pl-6 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003f87] mb-3">Wellness Center</h2>
            </div>
            <div className="text-gray-700 space-y-6">
              <p className="leading-relaxed">
                The Wellness Center at IIT Jammu is dedicated to fostering a supportive and nurturing environment that prioritizes the mental, emotional, and physical well-being of students, faculty, and staff. Recognizing the challenges of academic life, the center provides a range of wellness programs, and self-care resources to help individuals navigate stress, build resilience, and maintain a healthy work-life balance.
              </p>
              <p className="leading-relaxed">
                Our team of trained professionals and wellness experts is committed to offering confidential support through counseling, group therapy, stress management workshops, and wellness initiatives that cater to the diverse needs of the IIT Jammu community. Whether you seek guidance for personal challenges, academic stress, or simply wish to enhance your overall well-being, the Wellness Center is here to provide a safe, inclusive, and judgment-free space for healing and growth.
              </p>
              <p className="leading-relaxed">
                Through this website, you can book appointments, access mental health resources, explore upcoming wellness events, and connect with our dedicated support team. We believe that well-being is an integral part of academic success, and our goal is to ensure that every individual in our community feels heard, supported, and empowered to thrive. Your wellness matters, and we are here to help you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission and Values Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
          <div className="hidden md:block">
            <img
              src="/images/mission.webp"
              alt="Wellness Center Mission"
              className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <p className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-600 mb-4 max-w-[900px] mx-auto">Supporting our campus community with comprehensive wellness programs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Carousel - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg">
            <Carousel />
          </div>
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroSection;