
import {
  MessageCircle,
  Phone,
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FacilitiesSection from '../components/FacilitiesSection';

function AboutUs() {

  const counselors = [
    {
      name: "Himanshi Singh",
      role: "Clinical Psychologist",
      image: "/images/karunika.webp",
      email: "himanshi.singh@iitjammu.ac.in",
      phone: "+91 9797894944",
      description: "M.Phil in Clinical Psychology and experience at premier institutions like AIIMS, New Delhi. Specializes in psychological assessments and therapies for depression, anxiety, OCD, trauma, substance use, and relationship issues.",
      specialties: ["Depression", "Anxiety", "Trauma", "Relationship Counseling"]
    },
    {
      name: "Nandita Sharma",
      role: "Institute Counsellor",
      image: "/images/nandita.webp",
      email: "nandita.sharma@iitjammu.ac.in",
      phone: "+91 9033961612",
      description: "Extensive experience in academic research and practice across medical institutions, NGOs, and schools. Specializing in stress, self-esteem, relationship issues, addiction, trauma, LGBTQIA+ concerns, anger, and procrastination.",
      specialties: ["Stress Management", "Self-esteem", "Addiction", "LGBTQIA+ Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#003f87] to-[#39a4cf] text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mx-auto">
              <span>About Wellness Center</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Dedicated to supporting the holistic wellbeing of the entire IIT Jammu community through compassionate, professional care.
            </p>

            <div className="flex justify-center space-x-4">

              <Link to="/Appointments"
                className="relative px-6 py-3 font-semibold rounded-full overflow-hidden bg-white text-[#003f87] hover:text-white group"
              >
                <span className="relative z-10">Book Appointment</span>

                {/* Hover Effect */}
                <span className="absolute inset-0 bg-[#c433ba] scale-0 group-hover:scale-100 transition-transform duration-100 ease-out"></span>
              </Link>
              <a
                href="/ContactUs.jsx"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/20 transition-all transform hover:translate-x-1"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#003f87]/80 to-[#39a4cf]/80 opacity-75"></div>
      </div>
      {/* Services Provided */}
      <div className="services py-12 px-4 bg-gradient-to-b from-[#f3f4f6] to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-[#003f87] mb-3">Services Offered</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our comprehensive wellness services are designed to support the physical and mental well-being of the entire IIT Jammu community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 01 - Mental Health Support */}
            <div className="service bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="img-wrapper h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src="/images/mental-health-support.webp" alt="Mental Health Support" loading="lazy" />
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

                <p className="text-gray-600 mb-4">Individuals often encounter challenges such as anxiety, anger, loneliness, procrastination, homesickness, bullying, peer pressure, relationship difficulties, and depression.</p>

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
              <div className="img-wrapper h-48 overflow-hidden">e
                <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src="/images/academic-support.webp" alt="Academic Support" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <h3 className="font-bold text-xl text-gray-800">Academic Support</h3>
                </div>

                <p className="text-gray-600 mb-4">We provide assistance for challenges such as exam and placement stress, concentration difficulties, communication barriers, stage fear, and more.</p>

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
          </div>
        </div>
      </div>


      {/* Counselors Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003f87]">Meet the Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Meet the dedicated professionals who oversee our wellness services and ensure we provide the highest quality care to the IIT Jammu community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {counselors.map((counselor, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={counselor.image}
                    alt={counselor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {counselor.role}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#003f87] mb-2">{counselor.name}</h3>
                  <p className="text-gray-600 mb-4">{counselor.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {counselor.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <a
                      href={`mailto:${counselor.email}`}
                      className="flex items-center text-gray-600 hover:text-[#003f87] transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 mr-2 text-[#39a4cf]" />
                      {counselor.email}
                    </a>
                    <a href={`tel:${counselor.phone}`}
                      className="flex items-center text-gray-600 hover:text-[#003f87] transition-colors">
                      <Phone className="h-5 w-5 mr-2 text-[#39a4cf]" />
                      {counselor.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FacilitiesSection />
      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003f87] mb-4">Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What members of the IIT Jammu community say about our wellness services</p>
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
              <p className="text-gray-700 italic">&quot;The counseling services helped me cope with academic pressure and anxiety. The staff is supportive, professional, and truly cares about student wellbeing.&quot;</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutUs;