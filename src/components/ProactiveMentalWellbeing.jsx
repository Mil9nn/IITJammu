import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar, Clock, Lock, ChevronRight } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded counselor Q&A data
  const counselorQA = [
    {
      id: 1,
      question: "How do I know if I'm just stressed or developing anxiety?",
      answer: "Stress is typically temporary and tied to specific situations, while anxiety tends to persist even after stressors are gone. If you're experiencing persistent worry, physical symptoms like racing heart or trouble breathing, or if your daily functioning is affected, it may be anxiety.",
      date: "2025-02-18"
    },
    {
      id: 2,
      question: "What are some quick techniques to manage exam stress?",
      answer: "Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. Take short walks between study sessions. Practice progressive muscle relaxation. Break large tasks into smaller, manageable chunks. Remember to hydrate and maintain proper sleep habits.",
      date: "2025-03-05"
    },
    {
      id: 3,
      question: "How can I support a friend who seems depressed?",
      answer: "Listen without judgment, express your concern gently, encourage them to seek professional help, and offer to help them find resources. Stay connected with them regularly, but also respect their boundaries. Remember that you're not responsible for 'fixing' them - just being there consistently matters.",
      date: "2025-04-01"
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
    setIsLoading(true);
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
        setIsLoading(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting question:', error);
      setFormStatus({
        submitted: false,
        error: true,
        message: 'There was an error submitting your question. Please try again later.'
      });
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Ask the Counselor Tab */}
        {activeTab === 'counselor' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ask the Counselor</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have a question about mental health, stress management, or general well-being?
                Submit it anonymously below, and our professional counselors will answer selected questions. Your question might help other students facing similar challenges.
              </p>
            </div>

            {/* Question Submission Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Submit Your Question
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email (optional - only if you want a direct response)
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@iitjammu.ac.in"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Question (anonymous)
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="question"
                      name="question"
                      rows="4"
                      placeholder="Type your mental health or well-being question here..."
                      required
                      value={formData.question}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Lock size={16} />
                    All submissions are reviewed by licensed counselors.
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                    ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Question'}
                  </button>
                </div>

                {formStatus.message && (
                  <div className={`p-4 rounded-md ${formStatus.error ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>

            {/* Previously Answered Questions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Recently Answered Questions
              </h3>

              <div className="space-y-6">
                {counselorQA.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{item.question}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar size={14} />
                        Posted on {formatDate(item.date)}
                      </p>
                    </div>
                    <div className="prose prose-blue max-w-none">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  View All Answered Questions
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProactiveMentalWellbeing;