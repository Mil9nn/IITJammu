import { useState } from 'react';
import emailjs from '@emailjs/browser';

const ProactiveMentalWellbeing = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [formData, setFormData] = useState({
    question: '',
    email: '',
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  
  // Hardcoded counselor Q&A data
  const counselorQA = [
    {
      id: 1,
      question: "How do I know if I'm just stressed or developing anxiety?",
      answer: "Stress is typically temporary and tied to specific situations, while anxiety tends to persist even after stressors are gone. If you're experiencing persistent worry, physical symptoms like racing heart or trouble breathing, or if your daily functioning is affected, it may be anxiety.",
      date: "2025-02-18"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, error: false, message: 'Submitting your question...' });

    try {
      // Initialize EmailJS with your user ID (only needs to be done once)
      emailjs.init("KniHu1m19uqHKrqKD");
      
      // Prepare template parameters for EmailJS
      const templateParams = {
        question: formData.question,
        email: formData.email || 'Anonymous',
        timestamp: new Date().toISOString(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        "service_ev9dr4z",
        "template_0gaeqnu",
        templateParams
      );

      if (response.status !== 200) {
        throw new Error('Failed to send email');
      }

      setFormStatus({
        submitted: true,
        error: false,
        message: 'Your question has been submitted successfully! Our counselors will review it soon.'
      });

      // Reset form after successful submission
      setFormData({ question: '', email: '' });

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);

    } catch (error) {
      console.error('Error submitting question:', error);
      setFormStatus({
        submitted: false,
        error: true,
        message: 'There was an error submitting your question. Please try again later.'
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-800 mb-3 relative inline-block">
            <span className="relative z-10">Encouraging Proactive Mental Well-Being</span>
            <span className="absolute -bottom-1 left-0 w-full h-3 bg-amber-200 opacity-50 z-0"></span>
          </h2>
          <p className="text-purple-700 max-w-2xl mx-auto">Take care of your mind with proactive approaches to mental wellness</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full overflow-hidden shadow-lg">
            <button
              type="button"
              className={`px-6 py-4 text-sm font-medium relative overflow-hidden transition-all duration-300 rounded-full cursor-pointer ${
                activeTab === 'challenges'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('challenges')}
            >
              <span className="relative z-10">Monthly Wellness Challenges</span>
              {activeTab === 'challenges' && (
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-50"></span>
              )}
            </button>
            <button
              type="button"
              className={`px-6 py-4 text-sm font-medium relative overflow-hidden transition-all duration-300 cursor-pointer rounded-full ${
                activeTab === 'counselor'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('counselor')}
            >
              <span className="relative z-10">Ask the Counselor</span>
              {activeTab === 'counselor' && (
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-50"></span>
              )}
            </button>
          </div>
        </div>

        {/* Ask the Counselor Tab */}
        {activeTab === 'counselor' && (
          <div className="animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-gray-600 mb-10 bg-white bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                Have a question about mental health, stress management, or general well-being?
                Submit it anonymously below, and our professional counselors will answer selected questions
                regularly. Your question might help other students facing similar challenges.
              </p>

              {/* Question Submission Form with improved styling */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <h3 className="text-xl font-bold text-teal-700 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Your Question
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Your Email <span className="text-gray-500">(optional - only if you want a direct response)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@iitjammu.ac.in"
                        className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-purple-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-300"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="question" className="block text-gray-700 font-medium mb-2">
                      Your Question <span className="text-gray-500">(anonymous)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="question"
                        name="question"
                        rows="4"
                        placeholder="Type your mental health or well-being question here..."
                        required
                        className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-purple-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 resize-none transition-all duration-300"
                        value={formData.question}
                        onChange={handleInputChange}
                      ></textarea>
                      <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      All submissions are reviewed by licensed counselors.
                    </p>
                    <button
                      type="submit"
                      disabled={formStatus.submitted}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        formStatus.submitted
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-md hover:shadow-lg hover:translate-y-px transform'
                      }`}
                    >
                      {formStatus.submitted ? 'Submitting...' : 'Submit Question'}
                    </button>
                  </div>

                  {formStatus.message && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      formStatus.error 
                        ? 'bg-red-100 text-red-700 border-l-4 border-red-500' 
                        : 'bg-green-100 text-green-700 border-l-4 border-green-500'
                    }`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Previously Answered Questions - Enhanced styling */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-pink-700 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Recently Answered Questions
                </h3>

                <div className="space-y-6">
                  {counselorQA.map((item, index) => (
                    <div 
                      key={item.id} 
                      
                    >
                      <div className="mb-4">
                        <h4 className={`text-lg font-semibold ${
                          index % 3 === 0 ? 'text-purple-700' : 
                          index % 3 === 1 ? 'text-teal-700' : 
                          'text-pink-700'
                        }`}>{item.question}</h4>
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Posted on {formatDate(item.date)}
                        </p>
                      </div>
                      <div className="pl-4 border-l-2 border-gray-300 bg-white bg-opacity-60 p-4 rounded-r-lg">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <a href="#" className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    View All Answered Questions
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Wellness Challenges Tab */}
        {activeTab === 'challenges' && (
          ""
        )}
      </div>
    </section>
  );
};

export default ProactiveMentalWellbeing;