const EnhancedFooter = () => {
  return (
    <footer className="bg-[#003f87] text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              {["Anti-Ragging",].map((link, index) => (
                <li key={index}>
                  <a href="https://iitjammu.ac.in/anti-ragging" className="text-blue-200 hover:text-white transition-all duration-300 flex items-center group">
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">&raquo;</span>
                    <span className="ml-2">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 inline-block">Emergency Contacts</h3>
            <ul className="space-y-3">
              {[
                { title: "Wellness/Counselling Centre", number: "0191-257-0730", email: "counsellingservices@iitjammu.ac.in" },
                { title: "Medical/Health Centre", number: "0191-257-0636", email: "medical.centre@iitjammu.ac.in" },
                { title: "Security Office Jagti", number: "0191-257-0638", email: "office.security@iitjammu.ac.in" },
                { title: "Student Welfare Office", number: "0191-257-0697", email: "swoffice@iitjammu.ac.in" },
              ].map((contact, index) => (
                <li key={index} className="flex items-center group">
                  <div className="bg-[#007fc6] p-2 rounded-full group-hover:bg-[#0e6496] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-200">{contact.title}</p>
                    <a href={`tel:${contact.number.replace(/\s/g, "")}`} className="font-medium hover:text-blue-300 transition-colors duration-300">
                      {contact.number}
                    </a>
                    <a href={`mailto:${contact.email}`} className="block text-sm text-blue-200 hover:text-blue-300 transition-colors duration-300">
                      {contact.email}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* About/Connect Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 inline-block">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com/IITJammuOfficial/" className="bg-[#007fc6] hover:bg-[tomato] p-2 rounded-full transition-colors duration-300">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.18182 10.3333C5.20406 10.3333 5 10.5252 5 11.4444V13.1111C5 14.0304 5.20406 14.2222 6.18182 14.2222H8.54545V20.8889C8.54545 21.8081 8.74951 22 9.72727 22H12.0909C13.0687 22 13.2727 21.8081 13.2727 20.8889V14.2222H15.9267C16.6683 14.2222 16.8594 14.0867 17.0631 13.4164L17.5696 11.7497C17.9185 10.6014 17.7035 10.3333 16.4332 10.3333H13.2727V7.55556C13.2727 6.94191 13.8018 6.44444 14.4545 6.44444H17.8182C18.7959 6.44444 19 6.25259 19 5.33333V3.11111C19 2.19185 18.7959 2 17.8182 2H14.4545C11.191 2 8.54545 4.48731 8.54545 7.55556V10.3333H6.18182Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
              <a href="https://www.instagram.com/iit.jammu/" className="bg-[#007fc6] hover:bg-[tomato] p-2 rounded-full transition-colors duration-300">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path
                      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
              <a href="https://www.linkedin.com/school/iitjammu/" className="bg-[#007fc6] hover:bg-[tomato] p-2 rounded-full transition-colors duration-300">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path
                      d="M4.5 9.5H4C3.05719 9.5 2.58579 9.5 2.29289 9.79289C2 10.0858 2 10.5572 2 11.5V20C2 20.9428 2 21.4142 2.29289 21.7071C2.58579 22 3.05719 22 4 22H4.5C5.44281 22 5.91421 22 6.20711 21.7071C6.5 21.4142 6.5 20.9428 6.5 20V11.5C6.5 10.5572 6.5 10.0858 6.20711 9.79289C5.91421 9.5 5.44281 9.5 4.5 9.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M6.5 4.25C6.5 5.49264 5.49264 6.5 4.25 6.5C3.00736 6.5 2 5.49264 2 4.25C2 3.00736 3.00736 2 4.25 2C5.49264 2 6.5 3.00736 6.5 4.25Z" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M12.326 9.5H11.5C10.5572 9.5 10.0858 9.5 9.79289 9.79289C9.5 10.0858 9.5 10.5572 9.5 11.5V20C9.5 20.9428 9.5 21.4142 9.79289 21.7071C10.0858 22 10.5572 22 11.5 22H12C12.9428 22 13.4142 22 13.7071 21.7071C14 21.4142 14 20.9428 14 20L14.0001 16.5001C14.0001 14.8433 14.5281 13.5001 16.0879 13.5001C16.8677 13.5001 17.5 14.1717 17.5 15.0001V19.5001C17.5 20.4429 17.5 20.9143 17.7929 21.2072C18.0857 21.5001 18.5572 21.5001 19.5 21.5001H19.9987C20.9413 21.5001 21.4126 21.5001 21.7055 21.2073C21.9984 20.9145 21.9985 20.4432 21.9987 19.5006L22.0001 14.0002C22.0001 11.515 19.6364 9.50024 17.2968 9.50024C15.9649 9.50024 14.7767 10.1531 14.0001 11.174C14 10.5439 14 10.2289 13.8632 9.995C13.7765 9.84686 13.6531 9.72353 13.505 9.63687C13.2711 9.5 12.9561 9.5 12.326 9.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </div>
            <div className="text-sm text-blue-200">
              <p className="mb-2">Indian Institute of Technology Jammu</p>
              <p>Jagti, NH-44</p>
              <p>Nagrota, Jammu, 181221</p>
              <p>Jammu & Kashmir, India</p>
            </div>
            <div className="mt-8 pt-6 border-t border-blue-700 text-sm text-blue-300">
              <p>&copy; {new Date().getFullYear()} IIT Jammu. All rights reserved.</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;