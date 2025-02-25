
import React, { useState } from 'react';

const HealthAndCounselingServices = () => {
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
            Find answers to common questions about health and counseling services available at IIT Jammu.
          </p>
        </div>

        {/* Service Hours Section */}
        <div className="flex flex-wrap justify-around gap-4 my-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500 flex-1 min-w-[300px]">
            <h3 className="text-xl font-semibold text-indigo-900">Health Center Hours</h3>
            <p className="mt-2"><strong>Weekdays:</strong> 8:00 AM - 8:00 PM</p>
            <p><strong>Weekends:</strong> 9:00 AM - 5:00 PM</p>
            <p><strong>Emergency:</strong> 24/7 Support Available</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500 flex-1 min-w-[300px]">
            <h3 className="text-xl font-semibold text-indigo-900">Counseling Center Hours</h3>
            <p className="mt-2"><strong>Weekdays:</strong> 9:00 AM - 6:00 PM</p>
            <p><strong>Weekends:</strong> By Appointment Only</p>
            <p><strong>Crisis Support:</strong> Available 24/7</p>
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
          <p className="mt-2"><strong>Health Center:</strong> health@iitjammu.ac.in | 0191-XXX-XXXX</p>
          <p><strong>Counseling Center:</strong> counseling@iitjammu.ac.in | 0191-XXX-XXXX</p>
          <p className="mt-2">For emergencies, call our 24/7 helpline: 0191-XXX-XXXX</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003f87] text-white text-center py-4 mt-8">
        <p>© 2025 Indian Institute of Technology Jammu | Health & Counseling Services</p>
      </footer>
    </div>
  );
};

// FAQ Data
const faqData = [
  {
    question: "Where is the Health Center located?",
    answer: "The Health Center is located in the Student Welfare Building, Ground Floor, near the Academic Block. It is easily accessible from all hostels and academic areas.",
  },
  {
    question: "Who can access the health and counseling services?",
    answer: "All registered students, faculty, and staff of IIT Jammu can access the health and counseling services. Family members of faculty and staff are also eligible for health services.",
  },
  {
    question: "What medical services are provided at the Health Center?",
    answer: (
      <ul>
        <li>General physician consultations</li>
        <li>Basic diagnostic services</li>
        <li>First aid and emergency care</li>
        <li>Preventive health services</li>
        <li>Referrals to specialists</li>
        <li>Health awareness programs</li>
        <li>COVID-19 testing and vaccination (as per government guidelines)</li>
      </ul>
    ),
  },
  {
    question: "How do I book an appointment with a doctor?",
    answer: (
      <div>
        You can book an appointment by:
        <ul>
          <li>Using the IIT Jammu health portal (intranet)</li>
          <li>Calling the Health Center helpline at 0191-XXX-XXXX</li>
          <li>Visiting the Health Center reception during working hours</li>
          <li>Using the IIT Jammu mobile app</li>
        </ul>
        Walk-in consultations are also available but subject to doctor availability.
      </div>
    ),
  },
  {
    question: "What should I do in case of a medical emergency?",
    answer: (
      <div>
        <p>For medical emergencies:</p>
        <ol>
          <li>Call the Emergency Helpline: 0191-XXX-XXXX (available 24/7)</li>
          <li>Campus Security can be contacted at 0191-XXX-XXXX</li>
          <li>An ambulance is available 24/7 on campus for transportation to hospitals</li>
          <li>The Health Center has tie-ups with nearby hospitals for emergency care</li>
        </ol>
        <p>Always remember to carry your IIT Jammu ID card for quick verification.</p>
      </div>
    ),
  },
  {
    question: "What counseling services are available?",
    answer: (
      <ul>
        <li>Individual counseling sessions</li>
        <li>Group therapy</li>
        <li>Stress management workshops</li>
        <li>Academic performance counseling</li>
        <li>Career guidance</li>
        <li>Mental health awareness programs</li>
        <li>Crisis intervention</li>
      </ul>
    ),
  },
  {
    question: "How do I schedule a counseling appointment?",
    answer: (
      <div>
        You can schedule a counseling appointment by:
        <ul>
          <li>Emailing counseling@iitjammu.ac.in</li>
          <li>Calling the Counseling Center at 0191-XXX-XXXX</li>
          <li>Using the online appointment system through the institute portal</li>
          <li>Visiting the Counseling Center reception (ensures privacy)</li>
        </ul>
        All counseling appointments are confidential.
      </div>
    ),
  },
  {
    question: "Is the counseling service confidential?",
    answer: "Yes, all counseling services are strictly confidential. Information shared during counseling sessions will not be disclosed to anyone, including faculty, parents, or peers, without your explicit consent. Exceptions may only be made in situations where there is a risk of harm to yourself or others.",
  },
  {
    question: "What should I do if I'm experiencing a mental health crisis?",
    answer: (
      <div>
        <p>If you're experiencing a mental health crisis:</p>
        <ol>
          <li>Call the 24/7 Crisis Helpline: 0191-XXX-XXXX</li>
          <li>Approach your hostel warden or faculty advisor</li>
          <li>Visit the Health Center if during working hours</li>
          <li>Contact campus security in case of emergencies: 0191-XXX-XXXX</li>
        </ol>
        <p>Remember, seeking help is a sign of strength, not weakness.</p>
      </div>
    ),
  },
  {
    question: "Are there any specialized health programs for female students?",
    answer: "Yes, the Health Center offers specialized services for female students including gynecological consultations, awareness programs on women's health issues, and regular check-ups. A female doctor is available on specific days of the week. Schedule information is posted at the Health Center and on the institute portal.",
  },
  {
    question: "How can I access medication on campus?",
    answer: "The Health Center has an in-house pharmacy that provides medications prescribed by the institute doctors. For prescriptions from external doctors, the pharmacy can provide commonly used medications. For specialized medications, the Health Center can assist in procuring them from nearby pharmacies.",
  },
  {
    question: "Are there support groups for specific issues?",
    answer: "Yes, the Counseling Center organizes various support groups throughout the academic year. These include groups for stress management, academic pressure, homesickness, and other common challenges faced by students. Information about upcoming support group sessions is shared via email and posted on notice boards.",
  },
];

export default HealthAndCounselingServices;