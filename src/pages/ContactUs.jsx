const ContactCard = ({ title, phone, email, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      <h3 className="text-blue-800 text-xl font-semibold mb-4 pb-2 border-b border-gray-100">{title}</h3>
      <div className="my-4">
        <p className="flex items-center my-2">
          <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-blue-800 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </span>
          {phone}
        </p>
        <p className="flex items-center my-2">
          <span className="inline-flex justify-center items-center w-6 h-6 mr-3 text-blue-800 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          {email}
        </p>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={`mailto:${email}`}
        className="inline-block bg-blue-800 text-white py-2 px-4 rounded transition-colors hover:bg-blue-600"
      >
        Email Now
      </a>
    </div>
  );
};

const ContactUs = () => {
  const contacts = [
    {
      title: "Wellness Center",
      phone: "0191-257-0730",
      email: "wellness@iitjammu.ac.in",
      description: "Holistic wellness services for students, including mental health support, workshops, and well-being programs."
    },
    {
      title: "Security Office",
      phone: "0191-257-0638",
      email: "security@iitjammu.ac.in",
      description: "Ensuring campus safety, emergency response, and security assistance for the IIT Jammu community."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-50 text-black text-center py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Contact Wellness Center</h1>
        <p className="text-lg">We&apos;re here to support your well-being</p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Emergency Section */}
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-8">
          <h3 className="text-red-600 font-semibold text-lg mb-1">Emergency Contacts</h3>
          <p>For immediate assistance, please contact our 24/7 Emergency Helpline: <strong>0191-257-0999</strong></p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              title={contact.title}
              phone={contact.phone}
              email={contact.email}
              description={contact.description}
            />
          ))}
        </div>

        {/* Visit Us Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
          <p className="max-w-lg mx-auto">
            Indian Institute of Technology Jammu<br />
            Jagti, NH-44<br />
            Nagrota, Jammu, 181221<br />
            Jammu & Kashmir, India
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003f87] text-white text-center py-6 mt-12">
        <p>&copy; 2025 Indian Institute of Technology Jammu. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
