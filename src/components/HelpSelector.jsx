import { useState } from "react";

const HelpSelector = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Function to handle showing resources for a specific category
  const showResources = (category) => {
    setActiveCategory(category);
  };

  // Function to handle booking an appointment
  const bookAppointment = (category) => {
    window.location.href = `/appointments?category=${category}`;
  };

  return (
    <div className="help-selector-container">
      <h2 className="text-center mb-6">What Do You Need Help With?</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Help Option Cards */}
        <div
          className="help-card bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-lg p-6 w-64 text-center transition-all duration-300"
          onClick={() => showResources("stress")}
        >
          <img src="/assets/icons/stress.svg" alt="Stress" className="mx-auto h-16 mb-4" />
          <h3 className="font-medium text-lg mb-2">I&apos;m feeling stressed</h3>
          <p className="text-sm text-gray-600">Get tools and techniques to manage academic stress and anxiety</p>
        </div>

        <div
          className="help-card bg-green-100 hover:bg-green-200 cursor-pointer rounded-lg p-6 w-64 text-center transition-all duration-300"
          onClick={() => showResources("career")}
        >
          <img src="/assets/icons/career.svg" alt="Career" className="mx-auto h-16 mb-4" />
          <h3 className="font-medium text-lg mb-2">I need career guidance</h3>
          <p className="text-sm text-gray-600">Explore career options and get help with decisions</p>
        </div>

        <div
          className="help-card bg-purple-100 hover:bg-purple-200 cursor-pointer rounded-lg p-6 w-64 text-center transition-all duration-300"
          onClick={() => showResources("health")}
        >
          <img src="/assets/icons/health.svg" alt="Health" className="mx-auto h-16 mb-4" />
          <h3 className="font-medium text-lg mb-2">I have health concerns</h3>
          <p className="text-sm text-gray-600">Access health resources and support services</p>
        </div>

        <div
          className="help-card bg-orange-100 hover:bg-orange-200 cursor-pointer rounded-lg p-6 w-64 text-center transition-all duration-300"
          onClick={() => showResources("social")}
        >
          <img src="/assets/icons/social.svg" alt="Social" className="mx-auto h-16 mb-4" />
          <h3 className="font-medium text-lg mb-2">I feel isolated</h3>
          <p className="text-sm text-gray-600">Connect with peers and find community activities</p>
        </div>
      </div>

      {/* Resource Sections */}
      <div
        id="stress-resources"
        className={`resource-section mt-8 p-6 bg-white rounded-lg shadow-md ${
          activeCategory === "stress" ? "" : "hidden"
        }`}
      >
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Stress Management Resources</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <div>
              <a href="/resources/meditation" className="text-blue-600 hover:underline font-medium">
                Guided Meditation Sessions
              </a>
              <p className="text-sm">Every Tuesday and Thursday at 5:30 PM in the Wellness Center</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <div>
              <a href="/tools/stress-assessment" className="text-blue-600 hover:underline font-medium">
                Stress Assessment Tool
              </a>
              <p className="text-sm">Identify your stressors and get personalized recommendations</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <div>
              <a href="/counseling/appointment" className="text-blue-600 hover:underline font-medium">
                Schedule a Counseling Session
              </a>
              <p className="text-sm">One-on-one support with our professional counselors</p>
            </div>
          </li>
        </ul>
        <button
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => bookAppointment("stress")}
        >
          Book an Urgent Appointment
        </button>
      </div>

      {/* Career Resources Section */}
      <div
        id="career-resources"
        className={`resource-section mt-8 p-6 bg-white rounded-lg shadow-md ${
          activeCategory === "career" ? "" : "hidden"
        }`}
      >
        <h3 className="text-xl font-semibold text-green-700 mb-4">Career Guidance Resources</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <div>
              <a href="/resources/career-workshops" className="text-green-600 hover:underline font-medium">
                Career Workshops
              </a>
              <p className="text-sm">Join our workshops to explore career options and build skills</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <div>
              <a href="/tools/career-assessment" className="text-green-600 hover:underline font-medium">
                Career Assessment Tool
              </a>
              <p className="text-sm">Discover your strengths and interests</p>
            </div>
          </li>
        </ul>
        <button
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => bookAppointment("career")}
        >
          Book a Career Counseling Session
        </button>
      </div>

      {/* Health Resources Section */}
      <div
        id="health-resources"
        className={`resource-section mt-8 p-6 bg-white rounded-lg shadow-md ${
          activeCategory === "health" ? "" : "hidden"
        }`}
      >
        <h3 className="text-xl font-semibold text-purple-700 mb-4">Health Resources</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <div>
              <a href="/resources/health-checkups" className="text-purple-600 hover:underline font-medium">
                Health Checkups
              </a>
              <p className="text-sm">Schedule regular health checkups at the campus clinic</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <div>
              <a href="/tools/health-tips" className="text-purple-600 hover:underline font-medium">
                Health Tips
              </a>
              <p className="text-sm">Access tips for maintaining physical and mental health</p>
            </div>
          </li>
        </ul>
        <button
          className="mt-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          onClick={() => bookAppointment("health")}
        >
          Book a Health Consultation
        </button>
      </div>

      {/* Social Resources Section */}
      <div
        id="social-resources"
        className={`resource-section mt-8 p-6 bg-white rounded-lg shadow-md ${
          activeCategory === "social" ? "" : "hidden"
        }`}
      >
        <h3 className="text-xl font-semibold text-orange-700 mb-4">Social Connection Resources</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <div>
              <a href="/resources/peer-groups" className="text-orange-600 hover:underline font-medium">
                Peer Support Groups
              </a>
              <p className="text-sm">Join groups to connect with peers and share experiences</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <div>
              <a href="/tools/social-activities" className="text-orange-600 hover:underline font-medium">
                Social Activities
              </a>
              <p className="text-sm">Participate in campus events and activities</p>
            </div>
          </li>
        </ul>
        <button
          className="mt-6 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
          onClick={() => bookAppointment("social")}
        >
          Join a Social Event
        </button>
      </div>
    </div>
  );
};

export default HelpSelector;