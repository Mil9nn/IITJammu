import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WellnessCenterEvents = () => {
  // State for events data, carousel, and modal
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Strapi API configuration
  const STRAPI_API_URL = 'http://localhost:1337/api/events?populate=*';

  // Extract text from Strapi's rich text format (reused from ProactiveMentalWellbeing)
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

  // Fetch events data from Strapi
  useEffect(() => {
    const fetchEventsFromStrapi = async () => {
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
        console.log('Received events data:', data);

        // Check if data has the expected structure
        if (!data || !data.data || !Array.isArray(data.data)) {
          console.error('Unexpected data structure:', data);
          throw new Error('Data from Strapi does not have the expected structure');
        }

        // Transform the Strapi response into the format we need
        const transformedData = data.data.map((item) => {
          try {
            console.log('Processing item:', item);
            
            // Handle different Strapi response structures
            if (item && item.attributes) {
              // Standard Strapi v4 response structure
              console.log('Using standard Strapi v4 structure');
              
              // Handle image URL
              let imageSrc = "/api/placeholder/800/400"; // Default placeholder
              
              // Check if there's a media field with image data
              if (item.attributes.image && 
                  item.attributes.image.data && 
                  item.attributes.image.data.attributes && 
                  item.attributes.image.data.attributes.url) {
                // Construct the full URL for the image
                const baseUrl = 'http://localhost:1337'; // Add your Strapi base URL
                imageSrc = `${baseUrl}${item.attributes.image.data.attributes.url}`;
              }
              
              return {
                id: item.id,
                title: item.attributes.title,
                date: item.attributes.date,
                imageSrc: imageSrc,
                shortDescription: item.attributes.shortDescription,
                fullDescription: extractTextFromRichText(item.attributes.fullDescription)
              };
            } else if (item && typeof item === 'object' && 'id' in item && 'title' in item) {
              // Handle direct object structure (possibly custom Strapi response)
              console.log('Using direct object structure');
              
              // Handle image
              let imageSrc = "/api/placeholder/800/400"; // Default placeholder
              
              // Try to extract image URL from different potential structures
              if (item.image && typeof item.image === 'object') {
                if (item.image.url) {
                  imageSrc = `http://localhost:1337${item.image.url}`;
                } else if (item.image.formats && item.image.formats.medium) {
                  imageSrc = `http://localhost:1337${item.image.formats.medium.url}`;
                } else if (item.image.name) {
                  // Construct a likely path if we have the filename
                  imageSrc = `/images/${item.image.name}`;
                }
              }
              
              return {
                id: item.id,
                title: item.title,
                date: item.date,
                imageSrc: imageSrc,
                shortDescription: item.shortDescription,
                fullDescription: extractTextFromRichText(item.fullDescription)
              };
            } else {
              console.warn('Unrecognized item structure:', item);
              return null;
            }
          } catch (err) {
            console.error('Error processing event item:', err, item);
            return null;
          }
        }).filter(item => item !== null);

        console.log('Transformed events data:', transformedData);

        if (transformedData.length === 0) {
          console.warn('No valid events found after transformation');
          setError('No events available at this time. Please check back later.');
          // Fall back to sample data
          setEvents(getFallbackEvents());
        } else {
          setEvents(transformedData);
          setError(null);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching events data:', err);

        // More specific error message based on error type
        let errorMessage = 'Failed to load events data. Please try again later.';

        if (err.message.includes('timed out')) {
          errorMessage = 'Request timed out. Please check if the server is running.';
        } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          errorMessage = 'Could not connect to server. Please check if it is running at the correct address.';
        }

        setError(errorMessage);
        setLoading(false);
        
        // Fall back to sample data if there's an error
        setEvents(getFallbackEvents());
      }
    };

    fetchEventsFromStrapi();
  }, []);

  // Fallback events data (original static data)
  const getFallbackEvents = () => [
    {
      id: 1,
      title: "Awaz-e-dil",
      date: "October 8, 2024",
      imageSrc: "/images/awaz-e-dil.jpg",
      shortDescription: "An open mic event dedicated to raising awareness about mental health and suicide prevention.",
      fullDescription: "Awaz-e-Dil: Open Mic is an event dedicated to raising awareness about mental health and suicide prevention. Organized by the Wellbeing Club of IIT Jammu, the event provides a safe space for students to express their thoughts, emotions, and experiences through poetry, Shayari, storytelling, or simply by sharing their personal journeys. It encourages open conversations around mental health, offering support and fostering a sense of community. Participants can either perform or attend as an audience, promoting empathy and understanding. The event took place on 8th October 2024 at 9:00 PM in the Egret Common Room."
    },
    {
      id: 2,
      title: "Treasure Hunt",
      date: "October 9, 2024",
      imageSrc: "/images/treasure-hunt.jpg",
      shortDescription: "An adventure promoting teamwork, problem-solving, and mental wellness among students.",
      fullDescription: "The Treasure Hunt - Adventure & Well-being Edition, held on 8th October 2024 at IIT Jammu, was a collaborative event organized by the Nature and Adventure Club and Wellbeing Club. The event aimed to promote teamwork, problem-solving, and mental wellness among students. Participants formed teams to navigate the campus using clues, completing challenges centered around nature and well-being. This fun-filled adventure encouraged students to explore campus landmarks while emphasizing the importance of physical and mental health."
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (events.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [events.length]);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + events.length) % events.length);
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Modal functions
  const openModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  // Format date function
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (err) {
      console.warn('Error formatting date:', err, dateString);
      return dateString; // Return the original string if parsing fails
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="text-center py-8 px-4 shadow-md">
        <h1 className="text-indigo-400 text-4xl font-bold mb-2 animate-fade-in">IIT Jammu Wellness Center</h1>
        <p className="text-xl opacity-90 transform translate-y-0 transition duration-500">Nurturing Mind, Body & Soul</p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : error && events.length === 0 ? (
          <div className="text-center text-red-700 p-4 rounded-lg bg-red-100 my-8">
            {error}
          </div>
        ) : (
          <>
            {/* Carousel */}
            {events.length > 0 && (
              <div className="relative h-96 overflow-hidden shadow-xl mb-12">
                <div 
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {events.map((event) => (
                    <div 
                      key={event.id}
                      className="min-w-full h-full relative"
                    >
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${event.imageSrc})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-10 left-10 text-white z-10 max-w-lg">
                        <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{event.title}</h2>
                        <p className="text-lg drop-shadow-md">{event.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 -translate-y-1/2">
                  <button 
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center hover:bg-white/90 transition-all transform hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center hover:bg-white/90 transition-all transform hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {events.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentSlide === index 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Events Grid */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Wellness Center Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 opacity-100 transform translate-y-0"
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.imageSrc})` }}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1 text-black">{event.title}</h3>
                    <span className="text-sm text-gray-500 italic block mb-4">{formatDate(event.date)}</span>
                    <p className="text-gray-700 mb-6">{event.shortDescription}</p>
                    <button
                      onClick={() => openModal(event)}
                      className="px-6 py-2 bg-black text-white rounded-full hover:bg-black/50 transition-all hover:-translate-y-1 cursor-pointer"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Event Detail Modal */}
      {modalOpen && selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto transform translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="h-56 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedEvent.imageSrc})` }}
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2 text-indigo-600">{selectedEvent.title}</h2>
              <span className="text-sm text-gray-500 italic block mb-6">{formatDate(selectedEvent.date)}</span>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedEvent.fullDescription}</p>
              <div className="flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessCenterEvents;