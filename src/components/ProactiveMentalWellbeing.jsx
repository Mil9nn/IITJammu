import { useState } from 'react';
import emailjs from '@emailjs/browser';

const ProactiveMentalWellbeing = () => {
  const [activeTab, setActiveTab] = useState('counselor');
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
      // Initialize EmailJS with your user ID from environment variables
      emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);

      // Prepare template parameters for EmailJS
      const templateParams = {
        question: formData.question,
        email: formData.email || 'Anonymous',
        timestamp: new Date().toISOString(),
      };

      // Send email using EmailJS with service ID and template ID from environment variables
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
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
    <section className="py-12">
      <div className="container mx-auto px-4">

        {/* Ask the Counselor Tab */}
        {activeTab === 'counselor' && (
          <div className="animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <div className="text-center text-gray-600 mb-10 bg-white bg-opacity-60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                <h2 className="underline mb-3 font-bold">Ask the Counselor</h2>
                <p>Have a question about mental health, stress management, or general well-being?
                  Submit it anonymously below, and our professional counselors will answer selected questions. Your question might help other students facing similar challenges.</p>
              </div>

              {/* Question Submission Form with improved styling */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <h3 className="text-xl font-bold text-teal-700 mb-6 flex items-center">
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-300"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-100 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 resize-none transition-all duration-300"
                        value={formData.question}
                        onChange={handleInputChange}
                      ></textarea>
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
                      className={`px-6 py-3 rounded-full cursor-pointer hover:scale-[1.1] font-medium transition-all duration-300 ${formStatus.submitted
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:translate-y-px transform'
                        }`}
                    >
                      {formStatus.submitted ? 'Submitting...' : 'Submit Question'}
                    </button>
                  </div>

                  {formStatus.message && (
                    <div className={`mt-4 p-4 rounded-lg ${formStatus.error
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
                  Recently Answered Questions
                </h3>

                <div className="space-y-6">
                  {counselorQA.map((item, index) => (
                    <div
                      key={item.id}
                    >
                      <div className="mb-4">
                        <h4 className={`text-lg font-semibold ${index % 3 === 0 ? 'text-purple-700' :
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
                  <a href="#" className="inline-block px-6 py-3 font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1">
                    View All Answered Questions
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProactiveMentalWellbeing;