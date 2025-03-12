import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const CompactEventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  // Custom Date constructor that accepts 1-based months
  const createDate = (year, oneBasedMonth, day) => {
    // Convert 1-based month to 0-based for JavaScript's Date
    return new Date(year, oneBasedMonth - 1, day);
  };

  // Sample events data - with 1-based month indexing (1 = January, 2 = February, 3 = March)
  const events = [
    { date: createDate(2025, 3, 15), title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint optio soluta sapiente dolorum, sit eligendi?", type: "wellness", time: "10:00 AM", location: "Wellness Center" },
    { date: createDate(2025, 3, 18), title: "Stress Management Session", type: "counseling", time: "2:30 PM", location: "Room B204" },
    { date: createDate(2025, 3, 22), title: "Yoga Class", type: "wellness", time: "9:00 AM", location: "Activity Center" },
    { date: createDate(2025, 3, 25), title: "Group Therapy", type: "counseling", time: "4:00 PM", location: "Counseling Suite" },
    { date: createDate(2025, 4, 29), title: "Mental Health Awareness Talk", type: "seminar", time: "11:30 AM", location: "Main Auditorium" }
  ];

  // Helper to get 1-based month from Date object
  const getOneBasedMonth = (date) => {
    return date.getMonth() + 1;
  };

  const getDaysInMonth = (year, oneBasedMonth) => {
    return new Date(year, oneBasedMonth, 0).getDate();
  };

  const getFirstDayOfMonth = (year, oneBasedMonth) => {
    return new Date(year, oneBasedMonth - 1, 1).getDay();
  };

  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    setSelectedDay(null);
  };

  const handleDayClick = (day) => {
    const newSelectedDay = createDate(
      currentMonth.getFullYear(),
      getOneBasedMonth(currentMonth),
      day
    );
    
    // If already selected, deselect
    if (selectedDay && 
        selectedDay.getDate() === day && 
        selectedDay.getMonth() === currentMonth.getMonth() && 
        selectedDay.getFullYear() === currentMonth.getFullYear()) {
      setSelectedDay(null);
      setSelectedDayEvents([]);
    } else {
      setSelectedDay(newSelectedDay);
      
      // Find events for this day
      const dayEvents = events.filter(event => 
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear()
      );
      
      setSelectedDayEvents(dayEvents);
    }
  };

  const closeEventDetails = () => {
    setSelectedDay(null);
    setSelectedDayEvents([]);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const oneBasedMonth = getOneBasedMonth(currentMonth);
    const daysInMonth = getDaysInMonth(year, oneBasedMonth);
    const firstDayOfMonth = getFirstDayOfMonth(year, oneBasedMonth);

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(event =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear()
      );

      const isSelected = selectedDay && 
                         selectedDay.getDate() === day && 
                         selectedDay.getMonth() === currentMonth.getMonth() && 
                         selectedDay.getFullYear() === currentMonth.getFullYear();

      days.push(
        <div 
          key={day} 
          onClick={() => handleDayClick(day)}
          className={`h-8 flex items-center justify-center rounded-md cursor-pointer transition-all
            ${dayEvents.length > 0 ? 'font-medium' : ''}
            ${isSelected 
              ? 'bg-[#003f87] text-white' 
              : dayEvents.length > 0 
                ? 'bg-blue-50 hover:bg-blue-100' 
                : 'hover:bg-gray-100'}`}
        >
          <div className="relative flex items-center justify-center">
            <span className="text-sm">{day}</span>
            {dayEvents.length > 0 && !isSelected && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#003f87]"></span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm p-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm text-[#003f87]">{monthName} {year}</h3>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100">
              <ChevronLeft size={14} />
            </button>
            <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center text-xs text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {days}
        </div>

        {/* Event Details Panel */}
        {selectedDay && (
          <div className="mt-3 border-t pt-2">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">
                {selectedDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} Events
              </h4>
              <button 
                onClick={closeEventDetails} 
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close event details"
              >
                <X size={14} />
              </button>
            </div>
            
            {selectedDayEvents.length > 0 ? (
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {selectedDayEvents.map((event, index) => {
                  const typeColors = {
                    wellness: "border-green-300 bg-green-50",
                    counseling: "border-blue-300 bg-blue-50",
                    seminar: "border-purple-300 bg-purple-50"
                  };
                  
                  return (
                    <div 
                      key={index} 
                      className={`text-xs p-2 border-l-2 rounded ${typeColors[event.type] || "border-gray-300 bg-gray-50"}`}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-gray-600 mt-1">{event.time} | {event.location}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No events scheduled for this day.</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1 mb-2">
        <Calendar size={14} className="text-[#003f87]" />
        <h3 className="font-semibold text-sm text-[#003f87]">Events</h3>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default CompactEventCalendar;