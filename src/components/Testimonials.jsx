import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Arjun Mehta',
      position: 'Ph.D. Scholar, Physics',
      content: 'As research scholars, we often face unique challenges that impact our mental health. The wellness center has been instrumental in providing specialized support through group therapy sessions tailored for research students.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'B.Tech Student, Computer Science',
      content: 'The counseling services helped me navigate the stress of my final year projects and placements. Their mindfulness workshops gave me practical tools to manage my anxiety.'
    },
    {
      id: 3,
      name: 'Dr. Rajiv Kumar',
      position: 'Faculty, Mechanical Engineering',
      content: "I've personally recommended several of my students to the wellness center. The staff's professionalism and the confidential nature of their services make them a valuable resource for our campus community."
    }
  ];

  // Function to get initials for avatar
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  // Render testimonial card
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => renderTestimonialCard(testimonial))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;