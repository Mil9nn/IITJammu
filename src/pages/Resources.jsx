import { useState } from 'react';
import ErrorBoundary from "../components/ErrorBoundary";
import ProactiveMentalWellbeing from '../components/ProactiveMentalWellbeing';

const MentalHealthResources = () => {
  const [activeTab, setActiveTab] = useState('conditions');
  const [activeVideo, setActiveVideo] = useState(null);

  // Updated color scheme to match Team component
  const colors = {
    primary: '#4f46e5', // indigo-600 equivalent
    secondary: '#f59e0b', // amber-500
    accent: '#ec4899', // pink-500 (part of the gradient)
    lightBg: 'from-rose-50 to-amber-50',
    cardBg: 'white',
    textDark: '#374151', // gray-700
    textLight: '#6b7280', // gray-500
  };

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
    <div className="min-h-screen">
      {/* Header with gradient background matching Team component */}
      <header className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">Encouraging Proactive Mental Well-Being</h1>
          <p className="text-purple-700 max-w-2xl mx-auto">Take care of your mind with proactive approaches to mental wellness</p>
        </div>
      </header>

      {/* Video Player Bar - Shows when a video is active */}
      {activeVideo && (
        <div className="fixed bottom-0 left-0 right-0 bg-indigo-900 shadow-lg z-50 transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-2 text-white">
            <div className="flex items-center">
              <button
                onClick={closeVideo}
                className="mr-4 hover:bg-indigo-800 p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="font-medium">Now Playing</span>
            </div>
            <button
              onClick={closeVideo}
              className="hover:bg-indigo-800 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="aspect-w-16 aspect-h-9 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64"
            ></iframe>
          </div>
        </div>
      )}

      {/* Tabs navigation - Styled to match the team component */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex space-x-1 p-2 min-w-max">
            {Object.entries(tabData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 
                  ${activeTab === key
                    ? 'bg-gradient-to-r from-amber-100 to-rose-100 text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Resource Sections - Styled with gradients and animations */}
      <main className="bg-gradient-to-r from-rose-50 to-amber-50 py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">{tabData[activeTab].title}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">{tabData[activeTab].description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources[activeTab].map((resource, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-600 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  {(activeTab === 'conditions' || activeTab === 'coping') ? (
                    <button
                      onClick={() => resource.videoId && playVideo(resource.videoId)}
                      className="text-blue-400 bg-[#f6eeee] font-medium py-2 px-4 rounded-full transition-all duration-300 hover:shadow-md flex items-center cursor-pointer"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd"></path>
                      </svg>
                      Watch Video
                    </button>
                  ) : (
                    <a
                      href={resource.link || '#'}
                      target="_blank"
                      className="inline-block text-blue-400 bg-[#f6eeee] font-medium py-2 px-4 rounded-full transition-all duration-300 hover:shadow-md"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <ErrorBoundary>
            <ProactiveMentalWellbeing />
          </ErrorBoundary>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-rose-50 to-amber-50 py-8 px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="prose prose-lg text-gray-700 mx-auto">
            <p className="mb-4">
              If you&apos;re experiencing a mental health emergency, please call your local emergency number or crisis hotline immediately.
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Mental Health Resources. Information provided is for educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthResources;