import { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft, Video, PlusCircle } from 'lucide-react';

const FacilitiesSection = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const facilities = [
    {
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>),
      title: "Private Consultation Rooms",
      description: "Comfortable, soundproof rooms designed for confidential medical consultations and therapy sessions.",
      image: "/images/consultation-room.webp"
    },
    {
      icon: <PlusCircle className="h-6 w-6 text-[#003f87]" />,
      title: "Emergency Care",
      description: "A dedicated Wellness Center offering professional counseling, mental health support, stress management, and holistic well-being services.",
      image: "/images/emergency-care.webp"
    },
    {
      icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003f87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>),
      title: "Group Therapy Spaces",
      description: "Spacious, welcoming rooms designed for group wellness sessions, workshops, and community well-being programs.",
      image: "/images/group-therapy.webp"
    },
    {
      icon: <Video className="h-6 w-6 text-[#003f87]" />,
      title: "Telehealth Facilities",
      description: "State-of-the-art telehealth equipment for remote consultations with specialists and after-hours support.",
      image: "/images/telehealth.webp"
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth; // Scroll by one container width

      const newScrollLeft = direction === 'right' 
        ? scrollLeft + scrollAmount 
        : scrollLeft - scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      // Update arrow visibility
      setShowLeftArrow(newScrollLeft > 0);
      setShowRightArrow(newScrollLeft + clientWidth < scrollWidth);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#003f87]">Our Facilities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
        Our modern healthcare center is equipped with state-of-the-art facilities to provide comprehensive care to all members of the IIT Jammu community.
        </p>
      </div>

      <div className="relative">
        {/* Left Scroll Arrow */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[blueviolet] rounded-full p-2 shadow-md hover:bg-[#892be2a5] transition cursor-pointer"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
        )}

        {/* Right Scroll Arrow */}
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[blueviolet] rounded-full p-2 shadow-md hover:bg-[#892be2a5] transition cursor-pointer"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        )}

        {/* Facilities Container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-8 overflow-x-hidden scroll-smooth no-scrollbar p-5" 
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-[380px] snap-start flex-shrink-0"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {facility.icon}
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">{facility.title}</h3>
                </div>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;