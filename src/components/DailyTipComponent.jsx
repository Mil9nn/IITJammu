import React, { useState, useEffect } from 'react';

const DailyTipComponent = () => {
  const [currentTip, setCurrentTip] = useState(null);

  const tips = [
    { text: "Take 5 deep breaths when feeling overwhelmed. Inhale for 4 counts, hold for 2, exhale for 6.", category: "Stress Relief" },
    { text: "Today, write down three things you're grateful for, no matter how small they seem.", category: "Gratitude" },
    { text: "Struggling with a problem? Try the 5-minute rule: work on it for just 5 minutes, then reassess.", category: "Focus" },
    { text: "Remember that asking for help is a sign of strength, not weakness.", category: "Support" },
    { text: "Stay hydrated! Proper hydration improves mood, cognition, and physical performance.", category: "Physical Wellness" },
    { text: "Try the 20-20-20 rule when studying: Every 20 minutes, look at something 20 feet away for 20 seconds.", category: "Study Habits" },
    { text: "Remember: Your worth isn't measured by your productivity or academic performance.", category: "Self-Worth" }
  ];

  const getRandomTip = () => {
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const displayRandomTip = () => {
    setCurrentTip(getRandomTip());
  };

  useEffect(() => {
    displayRandomTip();
    const intervalId = setInterval(displayRandomTip, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getBadgeColor = (category) => {
    switch (category) {
      case "Stress Relief":
      case "Focus":
        return "bg-blue-500 text-white";
      case "Self-Worth":
      case "Support":
        return "bg-purple-500 text-white";
      case "Gratitude":
        return "bg-green-500 text-white";
      case "Physical Wellness":
        return "bg-yellow-500 text-white";
      case "Study Habits":
        return "bg-indigo-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="px-6 py-4 rounded-sm shadow-lg text-center">
      {currentTip ? (
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getBadgeColor(currentTip.category)}`}>
            {currentTip.category}
          </span>
          <p className="text-xl font-medium text-gray-800">{currentTip.text}</p>
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading tip...</p>
      )}
    </div>
  );
};

export default DailyTipComponent;