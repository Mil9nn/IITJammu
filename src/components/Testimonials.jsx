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
    }
  ];

  // Function to get initials for avatar
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  // Get gradient colors based on index
  const getGradient = (index) => {
    const gradients = [
      { from: 'from-indigo-50', to: 'to-purple-50', textColor: 'text-indigo-600', avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-700' },
      { from: 'from-rose-50', to: 'to-amber-50', textColor: 'text-rose-600', avatarBg: 'bg-rose-100', avatarText: 'text-rose-700' },
      { from: 'from-teal-50', to: 'to-emerald-50', textColor: 'text-teal-600', avatarBg: 'bg-teal-100', avatarText: 'text-teal-700' }
    ];
    return gradients[index % gradients.length];
  };

  // Render testimonial card
  const renderTestimonialCard = (testimonial, index) => {
    // Extract data safely
    const name = testimonial.name || 'Anonymous';
    const position = testimonial.position || '';
    const content = testimonial.content || '';
    const gradient = getGradient(index);
   
    return (
      <div 
        key={testimonial.id} 
        className={`bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full opacity-5 -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full opacity-5 -mb-8 -ml-8"></div>
        
        {/* Quote icon */}
        <div className="absolute top-4 right-4 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        
        <div className="p-6 z-10 relative">
          <p className={`text-gray-700 italic mb-6 leading-relaxed`}>"{content}"</p>
          
          <div className="flex items-center mt-6 border-t border-gray-200 pt-4">
            <div className={`h-12 w-12 rounded-full ${gradient.avatarBg} flex items-center justify-center mr-4 shadow-sm`}>
              <span className={`${gradient.avatarText} font-bold text-xl`}>
                {getInitials(name)}
              </span>
            </div>
            <div>
              <h4 className={`font-bold ${gradient.textColor}`}>{name}</h4>
              <p className="text-sm text-gray-500">{position}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-blue-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
      <div className="absolute -top-10 left-1/4 w-20 h-20 rounded-full bg-indigo-100 opacity-40"></div>
      <div className="absolute bottom-20 right-1/4 w-32 h-32 rounded-full bg-purple-100 opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">What Our Community Says</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from members of the IIT Jammu community about their experiences with our wellness services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;