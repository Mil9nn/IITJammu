

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Testimonials from '../components/Testimonials';
import CompactFooter from "../components/CompactFooter";

function AboutUs() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      {/* Hero Section with enhanced gradient */}
      <div className="relative bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 text-white py-20 overflow-hidden">
        {/* Texture overlay */}
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10"></div>

        {/* Animated floating shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-pink-500 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-green-300 to-teal-500 opacity-20 animate-float"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mx-auto">
              <span>About Wellness Center</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Dedicated to supporting the holistic wellbeing of the entire IIT Jammu community through compassionate, professional care.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/Appointments"
                className="group relative px-6 py-3 font-semibold rounded-full overflow-hidden bg-amber-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10">Book Appointment</span>

                {/* Hover Effect */}
                <span className="absolute inset-0 bg-rose-600 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 ease-out rounded-full"></span>
              </Link>

              <Link to="/resources"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white/20 hover:border-transparent"
              >
                Resources
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border-l-4 border-gradient-to-b from-indigo-600 to-purple-600 pl-6 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-3">Our Mission</h2>
            </div>
            <div className="text-gray-700 space-y-6">
              <p className="leading-relaxed">
                In our journey through life, we strive to transform our personal and professional aspirations into reality. Yet, the pressure to excel often brings emotional and psychological challenges that disrupt our inner peace.
              </p>
              <p className="leading-relaxed">
                At the Wellness Center, we believe in addressing these often-overlooked aspects of well-being. Our team of professional counselors and empathetic student coordinators is here to support you academically and emotionally. Through counseling, you can learn to make better decisions, enhance interpersonal skills, build confidence, and improve your academic performance. In one-on-one sessions, our counselors provide a safe space to explore your feelings, challenge limiting beliefs, evaluate behaviors, and work toward positive, lasting change.
              </p>
              <p className="leading-relaxed">
                We encourage you to reach out to us without hesitation—whether for academic, emotional, social, or financial concerns. Our goal is to help you stay focused, resilient, and fulfilled as you navigate your journey at IIT Jammu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Provided */}
      <div className="services py-12 px-4 bg-gradient-to-b from-[#f3f4f6] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-bl from-teal-100 to-teal-200 opacity-50"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200 opacity-40"></div>

        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-indigo-700 mb-3">Services Offered</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our comprehensive wellness services are designed to support the physical and mental well-being of the entire IIT Jammu community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 01 - Mental Health Support */}
            <div className="service bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="img-wrapper h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="/images/mental-health-support.png" alt="Mental Health Support" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-700 transition-colors">Mental Health Support</h3>
                </div>

                <p className="text-gray-600 mb-4">Individuals often encounter challenges such as anxiety, anger, loneliness, procrastination, homesickness, bullying, peer pressure, relationship difficulties, and depression.</p>

                <div className="mb-5">
                  <p className="font-semibold text-gray-700 mb-2">Our services offer:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Comprehensive Assessments</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Psychotherapeutic Interventions (Individual and Group Sessions)</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Psychiatric Support</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>
                    <span className="font-semibold">Availability: </span>
                    Monday to Thursday, <span className="text-purple-600 font-medium">9:30 AM – 5:30 PM</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Service 02 - Academic Support */}
            <div className="service bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="img-wrapper h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="/images/academic-support.png" alt="Academic Support" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-700 transition-colors">Academic Support</h3>
                </div>

                <p className="text-gray-600 mb-4">We provide assistance for challenges such as exam and placement stress, concentration difficulties, communication barriers, stage fear, and more.</p>

                <div className="mb-5">
                  <p className="font-semibold text-gray-700 mb-2">Our services offer:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Assessment & Evaluation</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Psychotherapeutic Interventions (Individual and Group Sessions)</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Study Skill Development</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>
                    <span className="font-semibold">Availability: </span>
                    Monday to Thursday, <span className="text-purple-600 font-medium">9:30 AM – 5:30 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <CompactFooter />
    </div>
  );
}

export default AboutUs;