
import { useState } from 'react';
import HelpSelector from '../components/HelpSelector';

const WellnessCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-100 min-h-screen">
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Intro Section */}
        <div className="text-center mb-8 pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <p className="mt-2 text-gray-700">
            Find answers to common questions about wellness services available at IIT Jammu.
          </p>
        </div>

        <div className="flex">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#003f87] mb-4">Hours and Appointments</h2>
            <p className="text-gray-700 mb-2">
              Our Counseling Services are open <span className="font-semibold">Monday to Friday</span>
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Emergency cases</span> are given priority and are available <span className="font-semibold">24/7.</span>
            </p>
            <p className="text-gray-700">
              Appointments can be scheduled through the <span className="font-semibold">EG-Portal</span> or by directly
              contacting an <span className="font-semibold">Institute Counselor.</span>
            </p>
          </div>
          {/* Service Hours Section */}
          <div className="flex flex-wrap justify-around gap-4 my-8">
            <div className="bg-white p-6 rounded-md shadow-sm border-l-4 border-orange-500 flex-1 min-w-[300px]">
              <h3 className="text-xl font-semibold text-indigo-900">Wellness Center Hours</h3>
              <p className="mt-2"><strong>Weekdays:</strong> 9:30 AM - 5:30 PM</p>
              <p><strong>Weekends:</strong> By Appointment Only</p>
              <p><strong>Emergency:</strong> 24/7 Support Available</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="p-4 bg-[whitesmoke] text-[#000] font-medium cursor-pointer flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="text-xl transition-transform duration-300">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: activeIndex === index ? '500px' : '0' }}
              >
                <div className="p-4 text-gray-700">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Box */}
        <div className="text-center p-8 rounded-lg mt-8">
          <h3 className="text-2xl font-semibold">Still Have Questions?</h3>
          <p className="mt-2">Contact us directly for any queries not addressed above:</p>
          <p className="mt-2"><strong>Email:</strong> wellness@iitjammu.ac.in</p>
          <p><strong>Helpline:</strong> 0191-XXX-XXXX (24/7 Support)</p>
        </div>
      </div>


          
















            <HelpSelector />








      {/* Footer */}
      <footer className="bg-[#003f87] text-white text-center py-4 mt-8">
        <p>© 2025 Indian Institute of Technology Jammu | Wellness Center</p>
      </footer>
    </div>
  );
};

// FAQ Data
const faqData = [
  {
    question: "Where is the Wellness Center located?",
    answer: "The Wellness Center is located in the Student Welfare Building, Ground Floor, near the Academic Block. It is easily accessible from all hostels and academic areas.",
  },
  {
    question: "Who can access the wellness services?",
    answer: "All registered students, faculty, and staff of IIT Jammu can access the wellness services. Specialized programs are available for different groups based on their needs.",
  },
  {
    question: "What services are provided at the Wellness Center?",
    answer: (
      <ul>
        <li>Mental health counseling</li>
        <li>Stress management workshops</li>
        <li>Yoga and mindfulness sessions</li>
        <li>Career and academic counseling</li>
        <li>Health awareness programs</li>
        <li>Support groups for various concerns</li>
      </ul>
    ),
  },
  {
    question: "How do I book an appointment with a counselor?",
    answer: (
      <div>
        You can book an appointment by:
        <ul>
          <li>Using the IIT Jammu wellness portal (intranet)</li>
          <li>Emailing wellness@iitjammu.ac.in</li>
          <li>Calling the Wellness Center at 0191-XXX-XXXX</li>
          <li>Visiting the Wellness Center reception during working hours</li>
        </ul>
        Walk-in consultations are also available based on counselor availability.
      </div>
    ),
  },
  {
    question: "Is the counseling service confidential?",
    answer: "Yes, all counseling services are strictly confidential. Information shared during sessions will not be disclosed without explicit consent, except in cases of immediate risk to safety.",
  },
];

export default WellnessCenter;