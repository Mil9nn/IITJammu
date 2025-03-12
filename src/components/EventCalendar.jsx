import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const createDate = (year, oneBasedMonth, day) => {
  // Convert 1-based month to 0-based for JavaScript's Date
  return new Date(year, oneBasedMonth - 1, day);
};

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  // Updated events data with the new events from the image
  const events = [
    { id: 1, date: createDate(2025, 2, 21), title: "Relaxation Session", time: "", location: "Hostel" },
    { id: 2, date: createDate(2025, 2, 25), title: "Team Building Session", time: "", location: "Staff and Faculty" },
    { id: 3, date: createDate(2025, 2, 27), title: "Sneh Session", time: "", location: "" },
    { id: 4, date: createDate(2025, 2, 28), title: "Gatekeeper Training Program", time: "", location: "Staff" },
    { id: 5, date: createDate(2025, 2, 28), title: "Suicide Prevention Program", time: "", location: "Staff" },
    { id: 6, date: createDate(2025, 3, 1), title: "Open Mic", time: "", location: "" },
    { id: 7, date: createDate(2025, 3, 8), title: "Fun Games", time: "", location: "Hostel" },
    { id: 8, date: createDate(2025, 3, 19), title: "Life Skills Workshop - Empowering Growth and Resilience", time: "3:00 PM - 4:00 PM" },
  
    // Recurring Counselor Meetings on Fridays
  
    { id: 16, date: createDate(2025, 3, 21), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Braeg, Dedhar" },
    { id: 17, date: createDate(2025, 3, 21), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Egret, Fulgar" },
  
    { id: 18, date: createDate(2025, 3, 28), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Egret, Braeg" },
    { id: 19, date: createDate(2025, 3, 28), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Fulgar, Dedhar" },

    { id: 18, date: createDate(2025, 4, 4), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Fulgar, Dedhar" },
    { id: 19, date: createDate(2025, 4, 4), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Braeg, Egret" },

    { id: 18, date: createDate(2025, 4, 11), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Braeg, Egret" },
    { id: 19, date: createDate(2025, 4, 11), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Dedhar, Fulgar" },

    { id: 18, date: createDate(2025, 4, 25), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Egret, Fulgar" },
    { id: 19, date: createDate(2025, 4, 25), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Braeg, Dedhar" },
  ];

  // Generate a consistent color based on event title - creates mapping of event title to color classes
  const getEventClasses = () => {
    const eventColors = {};
    const colorOptions = [
      { cell: 'bg-blue-100 text-blue-800 border-blue-200', panel: 'border-blue-300 bg-blue-50' },
      { cell: 'bg-green-100 text-green-800 border-green-200', panel: 'border-green-300 bg-green-50' },
      { cell: 'bg-purple-100 text-purple-800 border-purple-200', panel: 'border-purple-300 bg-purple-50' },
      { cell: 'bg-red-100 text-red-800 border-red-200', panel: 'border-red-300 bg-red-50' },
      { cell: 'bg-yellow-100 text-yellow-800 border-yellow-200', panel: 'border-yellow-300 bg-yellow-50' },
      { cell: 'bg-pink-100 text-pink-800 border-pink-200', panel: 'border-pink-300 bg-pink-50' },
      { cell: 'bg-indigo-100 text-indigo-800 border-indigo-200', panel: 'border-indigo-300 bg-indigo-50' },
      { cell: 'bg-orange-100 text-orange-800 border-orange-200', panel: 'border-orange-300 bg-orange-50' },
      { cell: 'bg-teal-100 text-teal-800 border-teal-200', panel: 'border-teal-300 bg-teal-50' },
      { cell: 'bg-cyan-100 text-cyan-800 border-cyan-200', panel: 'border-cyan-300 bg-cyan-50' }
    ];

    // Get unique event titles
    const uniqueTitles = [...new Set(events.map(event => event.title))];

    // Assign colors to each unique title
    uniqueTitles.forEach((title, index) => {
      // Use a hash function for more distributed colors
      let hash = 0;
      for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
      }
      hash = Math.abs(hash) % colorOptions.length;

      eventColors[title] = colorOptions[hash];
    });

    return eventColors;
  };

  // Create and memoize color mapping
  const eventColorMap = getEventClasses();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDay(null);
    setSelectedDayEvents([]);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDay(null);
    setSelectedDayEvents([]);
  };

  const handleDayClick = (day) => {
    const newSelectedDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
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
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 bg-gray-50 rounded-lg"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(event =>
        event.date.getDate() === day &&
        event.date.getMonth() === month &&
        event.date.getFullYear() === year
      );

      const isSelected = selectedDay &&
        selectedDay.getDate() === day &&
        selectedDay.getMonth() === month &&
        selectedDay.getFullYear() === year;

      days.push(
        <div
          key={day}
          className={`h-10 ${isSelected ? 'bg-blue-50' : 'bg-white'} rounded-lg shadow-sm p-1 flex flex-col hover:shadow-md transition-shadow cursor-pointer`}
          onClick={() => handleDayClick(day)}
        >
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center ${isSelected ? 'bg-[#003f87] text-white' : dayEvents.length > 0 ? 'bg-[#003f87] text-white' : 'text-gray-700'}`}>
              {day}
            </span>
          </div>
          <div className="flex-grow overflow-y-auto scrollbar-thin space-y-1">
            {dayEvents.map((event, idx) => (
              <div
                key={idx}
                className={`text-xs p-1 rounded truncate border ${eventColorMap[event.title]?.cell || 'bg-gray-100 text-gray-800 border-gray-200'}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-xl text-[#003f87]">{monthName} {year}</h3>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>

        {/* Absolutely positioned Event Details Panel */}
        {selectedDay && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-95 rounded-lg shadow-lg flex flex-col p-6 z-10">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-lg text-[#003f87]">
                {selectedDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} Events
              </h4>
              <button
                onClick={closeEventDetails}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                aria-label="Close event details"
              >
                <X size={18} />
              </button>
            </div>

            {selectedDayEvents.length > 0 ? (
              <div className="space-y-3 overflow-y-auto pr-1 flex-grow">
                {selectedDayEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`p-3 border-l-2 rounded ${eventColorMap[event.title]?.panel || 'border-gray-300 bg-gray-50'}`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-gray-600 mt-1">{event.time} | {event.location}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events scheduled for this day.</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={20} className="text-[#003f87]" />
        <h3 className="font-semibold text-lg text-[#003f87]">Events</h3>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default EventCalendar;