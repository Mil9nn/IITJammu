import { useState } from 'react';
import ErrorBoundary from "../components/ErrorBoundary";
import ProactiveMentalWellbeing from '../components/ProactiveMentalWellbeing';

const MentalHealthResources = () => {
  const [activeTab, setActiveTab] = useState('conditions');
  const [activeVideo, setActiveVideo] = useState(null);

  const tabData = {
    conditions: {
      title: 'Mental Health Conditions',
      description: 'Simple, evidence-based guides on various mental health conditions.'
    },
    coping: {
      title: 'Coping Strategies & Self-Care',
      description: 'Mindfulness, relaxation techniques, journaling, and exercise benefits.'
    },
    books: {
      title: 'Books & Podcasts',
      description: 'Recommended reading and listening resources for mental health support.'
    },
    community: {
      title: 'Community Support',
      description: 'Online and offline peer support groups and networks.'
    }
  };

  const resources = {
    conditions: [
      {
        title: 'Understanding Anxiety',
        description: 'Learn about symptoms, causes, and treatment options for anxiety disorders.',
        videoId: 'U9ml2mmfMfM'
      },
      {
        title: 'Depression Explained',
        description: 'Understanding depression, its impact, and evidence-based approaches to recovery.',
        videoId: 'z-IR48Mb3W0'
      }
    ],
    coping: [
      {
        title: 'Mindfulness Practices',
        description: 'Simple mindfulness exercises you can incorporate into your daily routine.',
        videoId: 'ZToicYcHIOU'
      },
      {
        title: 'Relaxation Techniques',
        description: 'Guided breathing exercises, progressive muscle relaxation, and visualization techniques.',
        videoId: 'cyEdZ23Cp1E'
      },
      {
        title: 'Exercise for Mental Health',
        description: 'The science behind how physical activity improves mood and reduces anxiety and depression.',
        videoId: 'GNWaWJm1A1g'
      }
    ],
    books: [
      {
        title: 'Recommended Reading',
        description: 'Books that provide insights and strategies for managing mental health.',
        link: 'https://www.panmacmillan.com/blogs/lifestyle-wellbeing/best-mental-health-books'
      },
      {
        title: 'Mental Health Podcasts',
        description: 'Audio resources featuring experts and personal stories about mental wellness.',
        link: 'https://themedicalpractice.com/technology/care-management/best-mental-health-podcasts/'
      }
    ],
    community: [
      {
        title: 'NAMI Support Groups',
        description: 'National Alliance on Mental Illness peer-led support groups.',
        link: 'https://www.nami.org/Support-Education/Support-Groups/'
      },
      {
        title: 'Local Support Groups',
        description: 'Find in-person support meetings in your area.',
        link: '#'
      }
    ]
  };

  const playVideo = (videoId) => {
    setActiveVideo(videoId);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-500 to-blue-500 py-10 px-4 text-white shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Encouraging Proactive Mental Well-Being</h1>
          <p className="text-xl opacity-90">Take care of your mind with proactive approaches to mental wellness</p>
        </div>
      </header>

      {/* Video Player Bar */}
      {activeVideo && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <button 
                onClick={closeVideo}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="font-medium">Now Playing</span>
            </div>
            <button 
              onClick={closeVideo}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="aspect-video max-h-96">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Tabs navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {Object.entries(tabData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors duration-200 relative
                  ${activeTab === key 
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-teal-500'
                  }`}
              >
                {data.title}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Resource Sections */}
      <main className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{tabData[activeTab].title}</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto my-3 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{tabData[activeTab].description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources[activeTab].map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                  {(activeTab === 'conditions' || activeTab === 'coping') ? (
                    <button 
                      onClick={() => resource.videoId && playVideo(resource.videoId)}
                      className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd"></path>
                      </svg>
                      Watch Video
                    </button>
                  ) : (
                    <a 
                      href={resource.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <ErrorBoundary>
              <ProactiveMentalWellbeing />
            </ErrorBoundary>
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-gray-800 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <p className="text-yellow-300 font-medium mb-2">
              If you're experiencing a mental health emergency, please call your local emergency number or crisis hotline immediately.
            </p>
            <p className="text-gray-400 text-sm mt-6">
              © {new Date().getFullYear()} Mental Health Resources. Information provided is for educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthResources;