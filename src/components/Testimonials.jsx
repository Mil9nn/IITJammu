import { useState, useEffect } from 'react';

// Testimonials component that fetches data from Strapi CMS
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Strapi API configuration
  const STRAPI_API_URL = 'http://localhost:1337/api/testimonials?populate=*';

  useEffect(() => {
    // Fetch testimonials from Strapi CMS
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);

        // Add a timeout to the fetch request
        const fetchPromise = fetch(STRAPI_API_URL);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 10000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();

        // Check if data has the expected structure
        if (!data) {
          console.error('Unexpected data structure:', data);
          throw new Error('Data from Strapi does not have the expected structure');
        }

        // Transform the Strapi response into the format we need
        let transformedTestimonials = [];

        // Handle both potential response structures
        if (data.data && Array.isArray(data.data)) {
          
          // Standard Strapi v4 response structure with nested attributes
          transformedTestimonials = data.data.map(item => {
            // Check if the item is in the attributes format
            if (item && item.attributes) {
              return {
                id: item.id,
                name: item.attributes.name || '',
                position: item.attributes.position || '',
                content: item.attributes.content || ''
              };
            } 
            // Handle the format shown in your error message where fields are directly on the item
            else if (item && item.id && item.name) {
              return {
                id: item.id,
                name: item.name || '',
                position: item.position || '',
                content: item.content || ''
              };
            }
            return null;
          }).filter(item => item !== null);
        } else if (Array.isArray(data)) {
          // Direct array of testimonials
          transformedTestimonials = data.map(item => {
            if (item && item.id) {
              return {
                id: item.id,
                name: item.name || '',
                position: item.position || '',
                content: item.content || ''
              };
            }
            return null;
          }).filter(item => item !== null);
        } else if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
          // Single testimonial object
          if (data.data.attributes) {
            transformedTestimonials = [{
              id: data.data.id,
              name: data.data.attributes.name || '',
              position: data.data.attributes.position || '',
              content: data.data.attributes.content || ''
            }];
          } else if (data.data.id) {
            transformedTestimonials = [{
              id: data.data.id,
              name: data.data.name || '',
              position: data.data.position || '',
              content: data.data.content || ''
            }];
          }
        }

        if (transformedTestimonials.length === 0) {
          console.warn('No valid testimonials found after transformation');
          
          // Based on your error message, the data seems to be directly in data.data
          // without the attributes wrapper, so let's try that
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            
            const directTransform = data.data.map(item => {
              return {
                id: item.id || 0,
                name: item.name || '',
                position: item.position || '',
                content: item.content || ''
              };
            });
            
            if (directTransform.length > 0) {
              transformedTestimonials = directTransform;
              setTestimonials(transformedTestimonials);
              setError(null);
              setIsLoading(false);
              return;
            }
          }
          
          // Fall back to sample data
          setTestimonials(getFallbackTestimonials());
          setError('No testimonials available at this time. Showing sample testimonials.');
        } else {
          setTestimonials(transformedTestimonials);
          setError(null);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        
        // More specific error message based on error type
        let errorMessage = 'Failed to load testimonials. Please try again later.';

        if (err.message.includes('timed out')) {
          errorMessage = 'Request timed out. Please check if the server is running.';
        } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          errorMessage = 'Could not connect to server. Please check if it is running at the correct address.';
        }
        
        setError(errorMessage);
        setIsLoading(false);
        
        // Fall back to sample data if there's an error
        setTestimonials(getFallbackTestimonials());
      }
    };

    fetchTestimonials();
  }, []);

  // Fallback testimonials data
  const getFallbackTestimonials = () => [
    {
      id: 1,
      name: 'Arjun Mehta',
      position: 'Ph.D. Scholar, Physics',
      content: 'As research scholars, we often face unique challenges that impact our mental health. The wellness center has been instrumental in providing specialized support through group therapy sessions tailored for research students.'
    }
  ];

  // Function to get initials for avatar
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  // Render testimonial card with proper structure based on data format
  const renderTestimonialCard = (testimonial) => {
    // Extract data safely
    const name = testimonial.name || 'Anonymous';
    const position = testimonial.position || '';
    const content = testimonial.content || '';
    
    return (
      <div key={testimonial.id} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-[#003f87] font-bold text-xl">
              {getInitials(name)}
            </span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{position}</p>
          </div>
        </div>
        <p className="text-gray-700 italic">&quot;{content}&quot;</p>
      </div>
    );
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#003f87] mb-4">Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What members of the IIT Jammu community say about our wellness services
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading testimonials...</p>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => renderTestimonialCard(testimonial))
            ) : (
              <div className="col-span-full text-center py-4">
                <p className="text-gray-500">No testimonials available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;