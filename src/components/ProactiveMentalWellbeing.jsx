import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Function to extract plain text from Strapi's structured content format
const extractTextFromRichText = (content) => {
  if (typeof content === 'string') return content;

  try {
    // If it's a JSON string, parse it first
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

    // Handle array format (multiple blocks)
    if (Array.isArray(parsedContent)) {
      return parsedContent.map(block => extractTextFromRichText(block)).join('\n');
    }

    // Handle object format (single block)
    if (parsedContent && typeof parsedContent === 'object') {
      // Check for text property directly
      if (parsedContent.text) return parsedContent.text;

      // Check for children array with text nodes
      if (parsedContent.children && Array.isArray(parsedContent.children)) {
        return parsedContent.children.map(child => extractTextFromRichText(child)).join('');
      }
    }

    return String(content);
  } catch (e) {
    console.warn('Error parsing rich text content:', e);
    return String(content);
  }
};

const ProactiveMentalWellbeing = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [formData, setFormData] = useState({
    question: '',
    email: '', // Optional email if student wants a direct response
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  const [counselorQA, setCounselorQA] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Strapi API configuration
  const STRAPI_API_URL = 'http://localhost:1337/api/questions?populate=*';

  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init("KniHu1m19uqHKrqKD");

    // Fetch counselor Q&A data from Strapi
    fetchQAFromStrapi();
  }, []);

  const fetchQAFromStrapi = async () => {
    try {
      setLoading(true);
      console.log(`Fetching from: ${STRAPI_API_URL}`);

      // Add a timeout to the fetch request
      const fetchPromise = fetch(STRAPI_API_URL);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        throw new Error(`Failed to fetch data from Strapi CMS: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received data:', data); // Log the received data structure

      // Check if data has the expected structure
      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Unexpected data structure:', data);
        throw new Error('Data from Strapi does not have the expected structure');
      }

      // Transform the Strapi response into the format we need
      const transformedData = data.data.map((item) => {
        // Check if item has attributes structure (standard Strapi response)
        if (item && item.attributes) {
          return {
            id: item.id,
            question: item.attributes.question,
            answer: extractTextFromRichText(item.attributes.answer),
            date: item.attributes.date,
            featured: item.attributes.featured || false
          };
        }
        // Handle direct structure (your current response)
        else if (item && item.id && item.question) {
          return {
            id: item.id,
            question: item.question,
            // Handle case where answer is an array
            // In your transformedData mapping function:
            answer: extractTextFromRichText(Array.isArray(item.answer) ? item.answer[0] : item.answer),
            date: item.date,
            featured: item.featured || false
          };
        } else {
          console.warn('Invalid item structure:', item);
          return null;
        }
      })
        .filter(item => item && item.question && item.answer); // Filter out null and empty entries

      console.log('Transformed data:', transformedData);

      if (transformedData.length === 0) {
        console.warn('No valid data items found after transformation');
        setError('No questions available at this time. Please check back later.');
      } else {
        setCounselorQA(transformedData);
        setError(null);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching Q&A data:', err);

      // More specific error message based on error type
      let errorMessage = 'Failed to load Q&A data. Please try again later.';

      if (err.message.includes('timed out')) {
        errorMessage = 'Request timed out. Please check if the server is running.';
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        errorMessage = 'Could not connect to  server. Please check if it is running at the correct address.';
      }

      setError(errorMessage);
      setLoading(false);

      // Fall back to sample data if there's an error
      setCounselorQA([
        {
          id: 1,
          question: "How do I know if I'm just stressed or developing anxiety?",
          answer: "Stress is typically temporary and tied to specific situations, while anxiety tends to persist even after stressors are gone. If you're experiencing persistent worry, physical symptoms like racing heart or trouble breathing, or if your daily functioning is affected, it may be anxiety.",
          date: "2025-02-18"
        },
        {
          id: 2,
          question: "What's the difference between sadness and depression?",
          answer: "Sadness is a normal emotion that comes and goes in response to life events. Depression is persistent (lasting weeks or more), affects your ability to function daily, and may include symptoms like loss of interest in activities, changes in sleep or appetite, and feelings of worthlessness.",
          date: "2025-03-01"
        }
      ]);
    }
  };

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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Encouraging Proactive Mental Well-Being</h2>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-1000 ${activeTab === 'challenges'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setActiveTab('challenges')}
            >
              Monthly Wellness Challenges
            </button>
            <button
              type="button"
              className={`px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-1000 ${activeTab === 'counselor'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => setActiveTab('counselor')}
            >
              Ask the Counselor
            </button>
          </div>
        </div>
        {/* Ask the Counselor Tab */}
        {activeTab === 'counselor' && (
          <div className="animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-gray-600 mb-10">
                Have a question about mental health, stress management, or general well-being?
                Submit it anonymously below, and our professional counselors will answer selected questions
                regularly. Your question might help other students facing similar challenges.
              </p>

              {/* Question Submission Form */}
              <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Submit Your Question</h3>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email <span className="text-gray-500">(optional - only if you want a direct response)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@iitjammu.ac.in"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="question" className="block text-gray-700 font-medium mb-2">
                      Your Question <span className="text-gray-500">(anonymous)</span>
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      rows="4"
                      placeholder="Type your mental health or well-being question here..."
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 resize-none"
                      value={formData.question}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      All submissions are reviewed by licensed counselors.
                    </p>
                    <button
                      type="submit"
                      disabled={formStatus.submitted}
                      className={`px-6 py-3 rounded-lg font-medium ${formStatus.submitted
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-[#007bff] text-white hover:translate-x-2 transition-all cursor-pointer duration-300'
                        }`}
                    >
                      Submit Question
                    </button>
                  </div>

                  {formStatus.message && (
                    <div className={`mt-4 p-4 rounded-lg ${formStatus.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Previously Answered Questions */}
              <h3 className="text-xl font-bold text-blue-800 mb-6">Recently Answered Questions</h3>

              {loading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading questions and answers...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-700 p-4 rounded-lg">
                  {error}
                </div>
              ) : (
                <div className="space-y-6">
                  {counselorQA.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-blue-800">{item.question}</h4>
                        <p className="text-sm text-gray-500 mt-1">Posted on {formatDate(item.date)}</p>
                      </div>
                      <div className="pl-4 border-l-4 border-blue-500">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  View All Answered Questions →
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