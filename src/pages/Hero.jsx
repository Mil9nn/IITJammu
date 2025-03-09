import { useState } from "react";
import Carousel from '../components/Carousel';
import NotificationsPanel from '../components/NotificationsPanel';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Heart,
  Shield,
  Lock,
  Users,
  Calendar,
  BookOpen,
  PhoneCall
} from 'lucide-react';

const EnhancedHeroSection = () => {
  const [activeTab, setActiveTab] = useState('mission');
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#003f87] to-[#39a4cf] text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full sm:w-4/5 md:w-3/4 lg:w-[500px] mx-auto gap-4">
              <img className="w-20 h-20 sm:w-25 sm:h-25" src="/images/wellness-logo.jpg" alt="wellness-centre-logo" />
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