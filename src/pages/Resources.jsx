import { useState } from 'react';
import ErrorBoundary from "../components/ErrorBoundary";
import ProactiveMentalWellbeing from '../components/ProactiveMentalWellbeing';

const MentalHealthResources = () => {
  const [activeTab, setActiveTab] = useState('conditions');
  const [activeVideo, setActiveVideo] = useState(null);

  // Color scheme variables - keeping the bluish theme
  const colors = {
    linkText: '#004088',
    buttonBg: '#deecfe',
    normalText: '#fffce',
    darkBlue: '#003366', // Darker variation for headings
    lightBlue: '#e6f3fa', // Light blue for backgrounds and highlights
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
    <div className="bg-gradient-to-b from-purple-50 to-indigo-50 min-h-screen">
      <header className="bg-white py-12 px-4 text-center shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-indigo-700">Mental Health Resources</h1>
          <p className="text-xl text-gray-700">Supporting your journey to mental wellness with evidence-based information and tools</p>
        </div>
      </header>

      {/* Video Player Bar - Shows when a video is active */}
      {activeVideo && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg z-50 transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-2 text-white">
            <div className="flex items-center">
              <button
                onClick={closeVideo}
                className="mr-4 hover:bg-gray-700 p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="font-medium">Now Playing</span>
            </div>
            <button
              onClick={closeVideo}
              className="hover:bg-gray-700 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex space-x-1 px-2 min-w-max">
            {Object.entries(tabData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${activeTab === key
                    ? 'bg-teal-100 text-teal-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Resource Sections */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-purple-700">{tabData[activeTab].title}</h2>
          <p className="text-gray-600">{tabData[activeTab].description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources[activeTab].map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
              <div className="h-2 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-purple-600 group-hover:text-pink-600 transition-colors">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                {(activeTab === 'conditions' || activeTab === 'coping') ? (
                  <button
                    onClick={() => resource.videoId && playVideo(resource.videoId)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-md transition-colors hover:from-purple-600 hover:to-pink-600 flex items-center cursor-pointer"
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
                    className="inline-block bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-medium py-2 px-4 rounded-md transition-colors hover:from-teal-500 hover:to-emerald-600"
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
      </main>

      <footer className="bg-white py-8 px-4 mt-12 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-500 text-sm text-center mt-6">
            © {new Date().getFullYear()} Mental Health Resources. Information provided is for educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthResources;