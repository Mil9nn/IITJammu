import { useState } from 'react';
import ProactiveMentalWellbeing from '../components/ProactiveMentalWellbeing';

const MentalHealthResources = () => {
  const [activeTab, setActiveTab] = useState('conditions');
  const [activeCategory, setActiveCategory] = useState(null);
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
        imgSrc: '/images/understanding-anxiety.webp',
        title: 'Understanding Anxiety',
        description: 'Learn about symptoms, causes, and treatment options for anxiety disorders.',
        videoLink: 'https://www.youtube.com/watch?v=U9ml2mmfMfM',
        videoId: 'U9ml2mmfMfM'
      },
      {
        imgSrc: '/images/depression-explained.webp',
        title: 'Depression Explained',
        description: 'Understanding depression, its impact, and evidence-based approaches to recovery.',
        videoLink: 'https://www.youtube.com/watch?v=z-IR48Mb3W0',
        videoId: 'z-IR48Mb3W0'
      },
      {
        imgSrc: '/images/ptsd-guide.webp',
        title: 'PTSD Guide',
        description: 'Exploring trauma responses and effective therapies for post-traumatic stress disorder.',
        videoLink: 'https://www.youtube.com/watch?v=qlYvyPtYcwc&t=30s',
        videoId: 'qlYvyPtYcwc'
      },
    ],
    coping: [
      {
        imgSrc: '/images/mindfulness-practices.webp',
        title: 'Mindfulness Practices',
        description: 'Simple mindfulness exercises you can incorporate into your daily routine.',
        videoLink: 'https://www.youtube.com/watch?v=ZToicYcHIOU',
        videoId: 'ZToicYcHIOU'
      },
      {
        imgSrc: '/images/relaxation-techniques.webp',
        title: 'Relaxation Techniques',
        description: 'Guided breathing exercises, progressive muscle relaxation, and visualization techniques.',
        videoLink: 'https://www.youtube.com/watch?v=cyEdZ23Cp1E',
        videoId: 'cyEdZ23Cp1E'
      },
      {
        imgSrc: '/images/exercises.webp',
        title: 'Exercise for Mental Health',
        description: 'The science behind how physical activity improves mood and reduces anxiety and depression.',
        videoLink: 'https://www.youtube.com/watch?v=GNWaWJm1A1g',
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

  const showResources = (category) => {
    setActiveCategory(category);
    setActiveTab(category);
    setActiveVideo(null); // Reset video when changing categories
  };

  const playVideo = (videoId) => {
    setActiveVideo(videoId);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header style={{ backgroundColor: colors.buttonBg }} className="text-[#003f87] py-12 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Mental Health Resources</h1>
          <p className="text-xl text-gray-700">Supporting your journey to mental wellness with evidence-based information and tools</p>
        </div>
      </header>

      {/* Video Player Bar - Shows when a video is active */}
      {activeVideo && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#001f44] shadow-lg z-50 transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-2 text-white">
            <div className="flex items-center">
              <button
                onClick={closeVideo}
                className="mr-4 hover:bg-[#003366] p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="font-medium">Now Playing</span>
            </div>
            <button
              onClick={closeVideo}
              className="hover:bg-[#003366] p-2 rounded-full"
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
          <div className="flex space-x-1 p-2 min-w-max">
            {Object.entries(tabData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeTab === key
                  ? 'text-gray-600'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
                style={activeTab === key ? { backgroundColor: colors.buttonBg } : {}}
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Resource Sections - Updated with video player functionality */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.linkText }}>{tabData[activeTab].title}</h2>
          <p className="text-gray-600">{tabData[activeTab].description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources[activeTab].map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              {(activeTab === 'conditions' || activeTab === 'coping') && (
                <div
                  className="aspect-w-16 aspect-h-9 bg-gray-200 relative cursor-pointer"
                  onClick={() => resource.videoId && playVideo(resource.videoId)}
                >
                  <img
                    src={`${resource.imgSrc}`}
                    alt={`${resource.title} thumbnail`}
                    className="object-cover w-full h-48"
                  />
                  {resource.videoId && (
                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 hover:bg-opacity-50 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="15,10 40,25 15,40" fill="#000000" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.linkText }}>{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                {(activeTab === 'conditions' || activeTab === 'coping') ? (
                  ""
                ) : (
                  <a
                    href={resource.link || '#'}
                    target="_blank"
                    className="inline-block text-gray-600 font-medium py-2 px-4 rounded-md transition-colors"
                    style={{ backgroundColor: colors.buttonBg }}
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <ProactiveMentalWellbeing />
      </main>

      <footer className="bg-gray-100 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            If you&apos;re experiencing a mental health emergency, please call your local emergency number or crisis hotline immediately.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mental Health Resources. Information provided is for educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthResources;