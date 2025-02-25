import React from 'react';

function AboutUs() {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#003f87] mb-6">About Our Healthcare Center</h1>
            <p className="text-xl text-gray-700 mb-8">
              Dedicated to supporting the health and wellbeing of the entire IIT Jammu community
            </p>
            <div className="flex justify-center">
              <a href="/appointments" className="inline-flex items-center px-6 py-3 bg-[#003f87] text-white font-semibold rounded-full hover:bg-[#00326d] transition-colors shadow-md mr-4">
                Book an Appointment
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="/contact-us" className="inline-flex items-center px-6 py-3 border-2 border-[#003f87] text-[#003f87] font-semibold rounded-full hover:bg-blue-50 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <img src="/images/mission.jpg" alt="Healthcare professionals in a meeting" className="rounded-xl shadow-lg w-full" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#003f87] mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The Healthcare Center at IIT Jammu is committed to fostering a healthy campus by providing comprehensive,
                accessible, and high-quality healthcare services to students, faculty, and staff. We believe in a holistic
                approach that addresses both physical and mental wellbeing.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#39a4cf]">
                <h3 className="font-semibold text-xl text-gray-800 mb-3">Our Core Values</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39a4cf] mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Compassion:</strong> Treating each individual with kindness, dignity, and respect</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39a4cf] mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Excellence:</strong> Maintaining the highest standards of professional care</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39a4cf] mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Accessibility:</strong> Ensuring care is available to all members of our community</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39a4cf] mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Confidentiality:</strong> Respecting privacy and maintaining trust</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003f87] mb-4">Our Counsellors Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who oversee our healthcare services and ensure we provide
              the highest quality care to the IIT Jammu community.
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

          <div className="text-center mt-10">
            <a href="/services" className="inline-flex items-center px-6 py-3 bg-[#003f87] text-white font-semibold rounded-full hover:bg-[#00326d] transition-colors shadow-md">
              Explore Our Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003f87] mb-4">Our Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our modern healthcare center is equipped with state-of-the-art facilities to provide comprehensive care
              to all members of the IIT Jammu community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Facility 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="/images/consultation-room.jpg"
                  alt="Consultation Rooms"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">Private Consultation Rooms</h3>
                </div>
                <p className="text-gray-600">
                  Comfortable, soundproof rooms designed for confidential medical consultations and therapy sessions.
                </p>
              </div>
            </div>

            {/* Facility 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="/images/emergency-care.jpg"
                  alt="Emergency Care Unit"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">Emergency Care Unit</h3>
                </div>
                <p className="text-gray-600">
                  Fully equipped emergency response station with trained staff available for immediate medical attention.
                </p>
              </div>
            </div>

            {/* Facility 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="/images/group-therapy.jpg"
                  alt="Group Therapy Room"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">Group Therapy Spaces</h3>
                </div>
                <p className="text-gray-600">
                  Spacious, welcoming rooms designed for group therapy sessions, workshops, and community health programs.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Facility 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="/images/pharmacy.jpg"
                  alt="Pharmacy"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">On-Site Pharmacy</h3>
                </div>
                <p className="text-gray-600">
                  Well-stocked pharmacy providing essential medications and health supplies for the campus community.
                </p>
              </div>
            </div>

            {/* Facility 5 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="/images/telehealth.jpg"
                  alt="Telehealth Services"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">Telehealth Facilities</h3>
                </div>
                <p className="text-gray-600">
                  State-of-the-art telehealth equipment for remote consultations with specialists and after-hours support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003f87] mb-4">Community Feedback</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What members of the IIT Jammu community say about our healthcare services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-[#003f87] font-bold text-xl">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Arjun Mehta</h4>
                  <p className="text-sm text-gray-500">Engineering Student</p>
                </div>
              </div>

              <p className="text-gray-700 italic">
                "The counseling services helped me cope with academic pressure and anxiety. The staff is supportive, professional, and truly cares about student wellbeing."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;