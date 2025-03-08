import { useState, useEffect, useRef } from "react";

function NotificationsPanel() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New mental health workshop scheduled next week",
      date: "21-02-2025",
    },
    {
      id: 2,
      message: "COVID-19 booster shots now available at health center",
      date: "18-02-2025",
    },
    {
      id: 3,
      message: "Yoga classes every Wednesday at Student Activity Center",
      date: "15-02-2025",
    },
    {
      id: 4,
      message: "Nutritionist consultation slots open for booking",
      date: "10-02-2025",
    },
  ]);
  
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const notificationsRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const notificationsEl = notificationsRef.current;
    let animationId;
    let startTime;
    const scrollSpeed = 0.05; // pixels per millisecond
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      if (isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      const elapsed = timestamp - startTime;
      const scrollAmount = elapsed * scrollSpeed;
      
      // Reset when all notifications have scrolled through
      if (scrollAmount >= notificationsEl.scrollHeight - container.clientHeight) {
        startTime = timestamp;
        container.scrollTop = 0;
      } else {
        container.scrollTop = scrollAmount % (notificationsEl.scrollHeight - container.clientHeight + 100);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);
  
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="bg-[#003f87] text-white p-4">
        <h2 className="font-semibold text-xl flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          Notifications
        </h2>
      </div>
      <div 
        ref={containerRef}
        className="notifications overflow-hidden h-90" 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={notificationsRef} 
          className="flex flex-col items-start p-5"
        >
          {/* Notification Items */}
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification group w-full flex flex-col gap-1 mb-4 p-3 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
            >
              <p className="text-[#004088] font-medium">{notification.message}</p>
              <p className="flex items-center gap-1 text-gray-400 text-sm ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Published: {notification.date}</span>
              </p>
            </div>
          ))}
          
          {/* Duplicate notifications to create continuous scrolling effect */}
          {notifications.map((notification) => (
            <div
              key={`duplicate-${notification.id}`}
              className="notification group w-full flex flex-col gap-1 mb-4 p-3 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
            >
              <p className="text-[#004088] font-medium">{notification.message}</p>
              <p className="flex items-center gap-1 text-gray-400 text-sm ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Published: {notification.date}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPanel;