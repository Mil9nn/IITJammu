import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const createDate = (year, oneBasedMonth, day) => {
  // Convert 1-based month to 0-based for JavaScript's Date
  return new Date(year, oneBasedMonth - 1, day);
};

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [holidayData, setHolidayData] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  // Regular events data
  const regularEvents = [
    { id: 1, date: createDate(2025, 2, 21), title: "Relaxation Session", time: "", location: "Hostel" },
    { id: 2, date: createDate(2025, 2, 25), title: "Team Building Session", time: "", location: "Staff and Faculty" },
    { id: 3, date: createDate(2025, 2, 27), title: "Sneh Session", time: "", location: "" },
    { id: 4, date: createDate(2025, 2, 28), title: "Gatekeeper Training Program - Suicide Prevention", time: "", location: "Staff" },
    { id: 5, date: createDate(2025, 3, 1), title: "Open Mic", time: "", location: "" },
    { id: 6, date: createDate(2025, 3, 8), title: "Fun Games", time: "", location: "Hostel" },
    { id: 7, date: createDate(2025, 3, 19), title: "Life Skills Workshop - Empowering Growth and Resilience", time: "3:00 PM - 4:00 PM" },
  
    // Recurring Counselor Meetings on Fridays
    { id: 16, date: createDate(2025, 3, 21), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Braeg, Dedhar" },
    { id: 17, date: createDate(2025, 3, 21), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Egret, Fulgar" },
  
    { id: 18, date: createDate(2025, 3, 28), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Egret, Braeg" },
    { id: 19, date: createDate(2025, 3, 28), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Fulgar, Dedhar" },

    { id: 20, date: createDate(2025, 4, 4), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Fulgar, Dedhar" },
    { id: 21, date: createDate(2025, 4, 4), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Braeg, Egret" },

    { id: 22, date: createDate(2025, 4, 11), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Braeg, Egret" },
    { id: 23, date: createDate(2025, 4, 11), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Dedhar, Fulgar" },

    { id: 24, date: createDate(2025, 4, 25), title: "Counselor Meeting", time: "3:00 PM - 4:00 PM", location: "Egret, Fulgar" },
    { id: 25, date: createDate(2025, 4, 25), title: "Counselor Meeting", time: "4:15 PM - 5:15 PM", location: "Braeg, Dedhar" },
  ];

  // Fetch holiday data from JSON file
  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const response = await fetch('/holiday.json');
        const data = await response.json();
        setHolidayData(data);
      } catch (error) {
        console.error("Error fetching holiday data:", error);
      }
    };

    fetchHolidayData();
  }, []);

  // Process holiday data and combine with regular events
  useEffect(() => {
    if (!holidayData) return;

    const holidays = [];
    let nextId = regularEvents.length + 1;

    try {
      // Extract holidays from the JSON structure
      const year2025 = holidayData["2025"];
      if (year2025) {
        Object.keys(year2025).forEach(month => {
          const monthData = year2025[month];
          Object.keys(monthData).forEach(dateString => {
            const eventData = monthData[dateString];
            
            // Parse the date string (e.g., "January 1, 2025, Wednesday")
            const dateParts = dateString.split(',')[0].split(' ');
            const monthName = dateParts[0];
            const day = parseInt(dateParts[1]);
            const year = parseInt(dateString.match(/\d{4}/)[0]);
            
            // Map month name to month number (1-12)
            const monthMap = {
              "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
              "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
            };
            
            const monthNum = monthMap[monthName];
            
            // Create a holiday event
            holidays.push({
              id: nextId++,
              date: createDate(year, monthNum, day),
              title: eventData.event,
              time: "",
              location: eventData.type,
              isHoliday: true, // Flag to identify holiday events
              extras: eventData.extras
            });
          });
        });
      }
    } catch (error) {
      console.error("Error processing holiday data:", error);
    }

    // Combine regular events with holidays
    setAllEvents([...regularEvents, ...holidays]);
  }, [holidayData]);

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

    // Special colors for event types
    const typeColors = {
      "Government Holiday": { cell: 'bg-red-100 text-red-800 border-red-200', panel: 'border-red-300 bg-red-50' },
      "Religional Festival": { cell: 'bg-orange-100 text-orange-800 border-orange-200', panel: 'border-orange-300 bg-orange-50' },
      "Good to know": { cell: 'bg-blue-100 text-blue-800 border-blue-200', panel: 'border-blue-300 bg-blue-50' },
      "Counselor Meeting": { cell: 'bg-green-100 text-green-800 border-green-200', panel: 'border-green-300 bg-green-50' }
    };

    // Get unique event titles
    const uniqueTitles = [...new Set(allEvents.map(event => event.title))];
    const uniqueTypes = [...new Set(allEvents.filter(event => event.isHoliday).map(event => event.location))];

    // Add special colors for types
    uniqueTypes.forEach(type => {
      if (typeColors[type]) {
        eventColors[type] = typeColors[type];
      }
    });

    // Assign colors to each unique title
    uniqueTitles.forEach((title, index) => {
      // Special color for counselor meetings
      if (title === "Counselor Meeting" && typeColors["Counselor Meeting"]) {
        eventColors[title] = typeColors["Counselor Meeting"];
        return;
      }

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
      const dayEvents = allEvents.filter(event =>
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
      const dayEvents = allEvents.filter(event =>
        event.date.getDate() === day &&
        event.date.getMonth() === month &&
        event.date.getFullYear() === year
      );
  
      const isSelected = selectedDay &&
        selectedDay.getDate() === day &&
        selectedDay.getMonth() === month &&
        selectedDay.getFullYear() === year;
  
      const hasHoliday = dayEvents.some(event => event.isHoliday);
  
      days.push(
        <div
          key={day}
          className={`h-10 ${isSelected ? 'bg-blue-50' : 'bg-white'} rounded-lg shadow-sm p-1 flex flex-col hover:shadow-md transition-shadow cursor-pointer`}
          onClick={() => handleDayClick(day)}
        >
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center ${
              isSelected ? 'bg-[#003f87] text-white' : 
              hasHoliday ? 'bg-red-500 text-white' : 
              dayEvents.length > 0 ? 'bg-[#003f87] text-white' : 
              'text-gray-700'
            }`}>
              {day}
            </span>
          </div>
          <div className="flex-grow overflow-y-auto scrollbar-thin space-y-1">
            {dayEvents.slice(0, 2).map((event, idx) => (
              <div
                key={idx}
                className={`text-xs p-1 rounded truncate border ${
                  event.isHoliday ? 
                  eventColorMap[event.location]?.cell || 'bg-red-100 text-red-800 border-red-200' : 
                  eventColorMap[event.title]?.cell || 'bg-gray-100 text-gray-800 border-gray-200'
                }`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 truncate px-1">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#003f87] flex items-center">
            <Calendar className="mr-2" />
            {monthName} {year}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 cursor-pointer" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 cursor-pointer" />
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
  
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </div>
    );
  };

  // Event details panel
  const renderEventDetails = () => {
    if (!selectedDay) return null;

    const formattedDate = selectedDay.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="bg-white p-4 rounded-lg shadow mt-4 absolute left-0 top-[-15px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#003f87]">{formattedDate}</h3>
          <button
            onClick={closeEventDetails}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close details"
          >
            <X className="h-5 w-5 text-gray-600 cursor-pointer" />
          </button>
        </div>

        {selectedDayEvents.length === 0 ? (
          <p className="text-gray-500">No events scheduled for this day.</p>
        ) : (
          <div className="space-y-3">
            {selectedDayEvents.map((event) => (
              <div 
                key={event.id} 
                className={`p-3 rounded-lg border ${
                  event.isHoliday ? 
                  eventColorMap[event.location]?.panel || 'border-red-300 bg-red-50' : 
                  eventColorMap[event.title]?.panel || 'border-gray-300 bg-gray-50'
                }`}
              >
                <h4 className="font-medium text-gray-800">{event.title}</h4>
                {event.time && <p className="text-sm text-gray-600 mt-1">{event.time}</p>}
                {event.location && <p className="text-sm text-gray-600 mt-1">{event.location}</p>}
                {event.extras && <p className="text-sm text-gray-600 mt-1">{event.extras}</p>}
                {event.isHoliday && <p className="text-sm font-medium mt-1">{event.location}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 relative">
        {renderCalendar()}
        {renderEventDetails()}
      </div>
    </div>
  );
};

export default EventCalendar;