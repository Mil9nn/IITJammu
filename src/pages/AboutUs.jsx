

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CompactFooter from "../components/CompactFooter";
import { Phone, Mail, MapPin, Clock, HelpCircle, Heart, User } from "lucide-react";

function AboutUs() {
  const concerns = [
    "Stress", "Anxiety", "Depression", "Relationships",
    "Alcohol/Drugs", "Family Concerns", "Sexual Assault",
    "Career", "Self-Esteem", "Body Image", "Grades",
    "Grief", "Gender/Sexuality"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Wellness Center</h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Dedicated to supporting the holistic wellbeing of the entire IIT Jammu community through compassionate, professional care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/Appointments" className="bg-white text-indigo-700 hover:scale-[1.1] font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 text-lg">Book Appointment</Link>
              <Link to="/resources" className="bg-transparent border-2 border-white hover:bg-white/10 py-3 px-6 rounded-lg shadow-md transition duration-300 text-lg">Resources</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Mission</h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                In our journey through life, we strive to transform our personal and professional aspirations into reality. Yet, the pressure to excel often brings emotional and psychological challenges that disrupt our inner peace.
              </p>
              <p>
                At the Wellness Center, we believe in addressing these often-overlooked aspects of well-being. Our team of professional counselors and empathetic student coordinators is here to support you academically and emotionally. Through counseling, you can learn to make better decisions, enhance interpersonal skills, build confidence, and improve your academic performance. In one-on-one sessions, our counselors provide a safe space to explore your feelings, challenge limiting beliefs, evaluate behaviors, and work toward positive, lasting change.
              </p>
              <p>
                We encourage you to reach out to us without hesitation—whether for academic, emotional, social, or financial concerns. Our goal is to help you stay focused, resilient, and fulfilled as you navigate your journey at IIT Jammu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Provided */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Services Offered</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our comprehensive wellness services are designed to support the physical and mental well-being of the entire IIT Jammu community.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Service 01 - Mental Health Support */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
              <div className="h-56 overflow-hidden bg-indigo-100">
                <img className="w-full h-full object-cover" src="/images/mental-health-support.png" alt="Mental Health Support" />
              </div>
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-indigo-100 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Mental Health Support</h3>
                </div>

                <p className="text-gray-600 mb-6">Individuals often encounter challenges such as anxiety, anger, loneliness, procrastination, homesickness, bullying, peer pressure, relationship difficulties, and depression.</p>

                <div className="mb-6">
                  <p className="font-medium text-gray-800 mb-2">Our services offer:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Comprehensive Assessments</li>
                    <li>Psychotherapeutic Interventions (Individual and Group Sessions)</li>
                    <li>Psychiatric Support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 02 - Academic Support */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
              <div className="h-56 overflow-hidden bg-purple-100">
                <img className="w-full h-full object-cover" src="/images/academic-support.png" alt="Academic Support" />
              </div>
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Academic Support</h3>
                </div>

                <p className="text-gray-600 mb-6">We provide assistance for challenges such as exam and placement stress, concentration difficulties, communication barriers, stage fear, and more.</p>

                <div className="mb-6">
                  <p className="font-medium text-gray-800 mb-2">Our services offer:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Assessment & Evaluation</li>
                    <li>Psychotherapeutic Interventions (Individual and Group Sessions)</li>
                    <li>Study Skill Development</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* NEW Service 03 - Workshops and Seminars */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
              <div className="h-56 overflow-hidden bg-teal-100">
                <img className="w-full h-full object-cover" src="/images/workshop.jpg" alt="Workshops and Seminars" />
              </div>
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-teal-100 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Workshops & Seminars</h3>
                </div>

                <p className="text-gray-600 mb-6">Regular group sessions addressing common challenges faced by students and faculty, designed to build resilience and develop essential life skills.</p>

                <div className="mb-6">
                  <p className="font-medium text-gray-800 mb-2">Featured topics include:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Stress Management Techniques</li>
                    <li>Mindfulness & Emotional Intelligence</li>
                    <li>Work-Life Balance for Academic Success</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* When to Reach Us Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <section className="bg-blue-50 rounded-2xl p-8 hover:shadow-lg transition duration-300">
              <h2 className="flex items-center text-2xl font-bold text-blue-800 mb-6">
                <Clock className="mr-3 text-blue-600" /> When to Reach Us
              </h2>

              <p className="text-blue-800 mb-4 font-medium">Reach out whenever you're experiencing:</p>

              <div className="flex flex-wrap gap-2">
                {concerns.map((concern, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{concern}</span>
                ))}
              </div>
            </section>

            {/* Why Section */}
            <section className="bg-green-50 rounded-2xl p-8 hover:shadow-lg transition duration-300">
              <h2 className="flex items-center text-2xl font-bold text-green-800 mb-6">
                <HelpCircle className="mr-3 text-green-600" /> Why Reach Out
              </h2>

              <div className="space-y-4">
                <p className="flex items-center text-green-800">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                  Professional, confidential support
                </p>
                <p className="flex items-center text-green-800">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                  Early intervention prevents worsening
                </p>
                <p className="flex items-center text-green-800">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                  Connection to community resources
                </p>
              </div>
            </section>

            {/* How Section */}
            <section className="bg-purple-50 rounded-2xl p-8 hover:shadow-lg transition duration-300">
              <h2 className="flex items-center text-2xl font-bold text-purple-800 mb-6">
                <Heart className="mr-3 text-purple-600" /> How to Connect
              </h2>

              <div className="space-y-6">
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Mail className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-purple-800 font-medium">Email: counsellingservices@iitjammu.ac.in</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <User className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-purple-800 font-medium">Saral Portal</p>
                    <a href="https://saral.iitjammu.ac.in/" className="text-purple-700 hover:underline">https://saral.iitjammu.ac.in/</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Where Section - Spans 2 columns on md screens */}
            <section className="md:col-span-2 lg:col-span-3 bg-amber-50 rounded-2xl p-8 hover:shadow-lg transition duration-300">
              <h2 className="flex items-center text-2xl font-bold text-amber-800 mb-6">
                <MapPin className="mr-3 text-amber-600" /> Where to Find Help
              </h2>

              <div className="flex items-center">
                <div>
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">Support Availability</h3>
                  <p className="mb-3 text-amber-800">
                    Our team is available to support you both online and in-person. Reach out via phone, or visit us during open hours.
                  </p>
                  <p className="text-amber-700">Monday to Friday, 9:00am – 5:00pm</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
      <CompactFooter />
    </div>
  );
}

export default AboutUs;