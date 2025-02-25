import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Carousel from "./Carousel";
import Hero from '../pages/Hero';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import Resources from '../pages/Resources';
import Appointments from '../pages/Appointments';
import FAQs from '../pages/FAQs';
import ContactUs from '../pages/ContactUs';
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <Router>
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

          <button className="lg:hidden text-[#004088] focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                {/* Services Provided */}
                <div className="services py-12 px-4 bg-gradient-to-b from-[#f3f4f6] to-white">
                  <div className="container mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="font-bold text-3xl md:text-4xl text-[#003f87] mb-3">Services Offered</h2>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        Our comprehensive healthcare services are designed to support the physical and mental wellbeing of the entire IIT Jammu community.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Service 01 - Mental Health Support */}
                      <div className="service bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="img-wrapper h-48 overflow-hidden">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            src="/images/bg-depressed.jpg"
                            alt="Mental Health Support"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-xl text-gray-800">Mental Health Support</h3>
                          </div>

                          <p className="text-gray-600 mb-4">
                            Individuals often encounter challenges such as anxiety, anger,
                            loneliness, procrastination, homesickness, bullying, peer pressure,
                            relationship difficulties, and depression.
                          </p>

                          <div className="mb-5">
                            <p className="font-semibold text-gray-700 mb-2">Our services offer:</p>
                            <ul className="space-y-1">
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Comprehensive Assessments</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Psychotherapeutic Interventions (Individual and Group Sessions)</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Psychiatric Support</span>
                              </li>
                            </ul>
                          </div>

                          <div className="border-t border-gray-100 pt-4 mt-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39a4cf] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>
                              <span className="font-semibold">Availability: </span>
                              Monday to Thursday, <span className="text-[#39a4cf] font-medium">9:30 AM – 5:30 PM</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Service 02 - Academic Support */}
                      <div className="service bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="img-wrapper h-48 overflow-hidden">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            src="/images/bg-academic.jpg"
                            alt="Academic Support"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-xl text-gray-800">Academic Support</h3>
                          </div>

                          <p className="text-gray-600 mb-4">
                            We provide assistance for challenges such as exam and placement stress,
                            concentration difficulties, communication barriers, stage fear, and more.
                          </p>

                          <div className="mb-5">
                            <p className="font-semibold text-gray-700 mb-2">Our services offer:</p>
                            <ul className="space-y-1">
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Assessment & Evaluation</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Psychotherapeutic Interventions (Individual and Group Sessions)</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Study Skill Development</span>
                              </li>
                            </ul>
                          </div>

                          <div className="border-t border-gray-100 pt-4 mt-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39a4cf] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>
                              <span className="font-semibold">Availability: </span>
                              Monday to Thursday, <span className="text-[#39a4cf] font-medium">9:30 AM – 5:30 PM</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Service 03 - Other Services */}
                      <div className="service bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="img-wrapper h-48 overflow-hidden">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            src="/images/consultation.jpg"
                            alt="Other Healthcare Services"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-xl text-gray-800">General Health Services</h3>
                          </div>

                          <p className="text-gray-600 mb-4">
                            We provide comprehensive healthcare services including preventive care,
                            first aid, general consultations, and referrals to specialists when needed.
                          </p>

                          <div className="mb-5">
                            <p className="font-semibold text-gray-700 mb-2">Our services offer:</p>
                            <ul className="space-y-1">
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Regular Health Check-ups</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Emergency First Aid</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Medical Consultations & Referrals</span>
                              </li>
                            </ul>
                          </div>

                          <div className="border-t border-gray-100 pt-4 mt-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39a4cf] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>
                              <span className="font-semibold">Availability: </span>
                              Monday to Thursday, <span className="text-[#39a4cf] font-medium">9:30 AM – 5:30 PM</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* View All Services Button */}
                    <div className="text-center mt-10">
                      <button className="inline-flex items-center px-6 py-3 bg-[#003f87] text-white font-semibold rounded-full hover:bg-[#00326d] cursor-pointer transition-colors shadow-md">
                        View All Services
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Meet Your Counsellors Section */}
                <div className="py-12 bg-gradient-to-b from-white to-blue-50">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                      <h2 className="font-bold text-3xl md:text-4xl text-[#003f87] mb-3">Meet Your Counsellors</h2>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        Our team of qualified healthcare professionals is committed to supporting your physical and mental wellbeing throughout your academic journey.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Counsellor 1 - Dr. Karunika */}
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative">
                          <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                            <img
                              className="w-full object-cover object-center"
                              src="/images/karunika.jpg"
                              alt="Dr. Karunika"
                            />
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              Medical Doctor
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h4 className="font-bold text-xl text-gray-800 mb-2">Dr. Karunika</h4>
                          <p className="text-gray-500 text-sm mb-2">Medical Health Professional</p>

                          <div className="border-t border-gray-100 my-4"></div>

                          <p className="text-gray-600 mb-6">
                            MBBS, MD, PGDHHM, Diploma in Ultrasonography with over 10 years of experience in the medical field.
                          </p>

                          <h5 className="font-medium text-gray-700 mb-3">Contact Information:</h5>
                          <div className="space-y-2">
                            <a href="mailto:karunika.sharma@iitjammu.ac.in" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              karunika.sharma@iitjammu.ac.in
                            </a>

                            <a href="tel:+919596745001" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              +91 95967 45001
                            </a>
                          </div>

                          <div className="mt-6">
                            <button className="w-full py-2 px-4 bg-[#003f87] hover:bg-[#00326d] text-white font-medium rounded-lg transition-colors">
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Counsellor 2 - Dr. Vikram */}
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative">
                          <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                            <img
                              className="w-full object-cover object-center"
                              src="/images/vikram.jpg"
                              alt="Dr. Vikram"
                            />
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              General Physician
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h4 className="font-bold text-xl text-gray-800 mb-2">Dr. Vikram Singh</h4>
                          <p className="text-gray-500 text-sm mb-2">General Medical Officer</p>

                          <div className="border-t border-gray-100 my-4"></div>

                          <p className="text-gray-600 mb-6">
                            Working at IIT Jammu since 2022, a passionate and dedicated medical professional with GMC accreditation and 2.5 years experience in healthcare.
                          </p>

                          <h5 className="font-medium text-gray-700 mb-3">Contact Information:</h5>
                          <div className="space-y-2">
                            <a href="mailto:medical.gdmo3@iitjammu.ac.in" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              medical.gdmo3@iitjammu.ac.in
                            </a>

                            <a href="tel:+919906016244" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              +91 99060 16244
                            </a>
                          </div>

                          <div className="mt-6">
                            <button className="w-full py-2 px-4 bg-[#003f87] hover:bg-[#00326d] text-white font-medium rounded-lg transition-colors">
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Counsellor 3 - Dr. Priya */}
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative">
                          <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                            <img
                              className="w-full object-cover object-center"
                              src="/images/priya.jpg"
                              alt="Dr. Priya"
                            />
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              Medical Doctor
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h4 className="font-bold text-xl text-gray-800 mb-2">Dr. Priya</h4>
                          <p className="text-gray-500 text-sm mb-2">Medical Health Professional</p>

                          <div className="border-t border-gray-100 my-4"></div>

                          <p className="text-gray-600 mb-6">
                            MBBS, MD, PGDHHM, Diploma in Ultrasonography with over 10 years of experience in the medical field.
                          </p>

                          <h5 className="font-medium text-gray-700 mb-3">Contact Information:</h5>
                          <div className="space-y-2">
                            <a href="mailto:medical.gdmo@iitjammu.ac.in" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              medical.gdmo@iitjammu.ac.in
                            </a>

                            <a href="tel:+917006466731" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              +91 70064 66731
                            </a>
                          </div>

                          <div className="mt-6">
                            <button className="w-full py-2 px-4 bg-[#003f87] hover:bg-[#00326d] text-white font-medium rounded-lg transition-colors">
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional CTA */}
                    <div className="mt-12 text-center">
                      <p className="text-gray-600 mb-4">Need to speak with someone urgently?</p>
                      <a href="tel:+911234567890" className="inline-flex items-center px-6 py-3 bg-[#007fc6] text-white font-semibold rounded-full hover:bg-[#0069a9] transition-colors shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Helpline: 1-800-891-4416
                      </a>
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            }
          />

          {/* Other Routes */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
