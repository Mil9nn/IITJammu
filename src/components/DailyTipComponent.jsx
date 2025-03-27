import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw } from 'lucide-react';

const DailyTipComponent = () => {
  const [currentTip, setCurrentTip] = useState(null);
  const [isChanging, setIsChanging] = useState(false);

  const tips = [
    { text: "Get regular exercise. Just 30 minutes of walking every day can boost your mood and improve your health. Small amounts of exercise add up, so don’t be discouraged if you can’t do 30 minutes at one time.", category: "Physical Wellness" },
    { text: "Eat healthy, regular meals and stay hydrated. A balanced diet and plenty of water can improve your energy and focus throughout the day. Pay attention to your intake of caffeine and alcohol and how they affect your mood and well-being—for some, decreasing caffeine and alcohol consumption can be helpful.", category: "Physical Wellness" },
    { text: "Make sleep a priority. Stick to a schedule, and make sure you’re getting enough sleep. Blue light from devices and screens can make it harder to fall asleep, so reduce blue light exposure from your phone or computer before bedtime.", category: "Physical Wellness" },
    { text: "Try a relaxing activity. Explore relaxation or wellness programs or apps, which may incorporate meditation, muscle relaxation, or breathing exercises. Schedule regular times for these and other healthy activities you enjoy, such as listening to music, reading, spending time in nature, and engaging in low-stress hobbies.", category: "Relaxation" },
    { text: "Set goals and priorities. Decide what must get done now and what can wait. Learn to say 'no' to new tasks if you start to feel like you’re taking on too much. Try to appreciate what you have accomplished at the end of the day.", category: "Focus" },
    { text: "Practice gratitude. Remind yourself daily of things you are grateful for. Be specific. Write them down or replay them in your mind.", category: "Gratitude" },
    { text: "Focus on positivity. Identify and challenge your negative and unhelpful thoughts.", category: "Mindset" },
    { text: "Stay connected. Reach out to friends or family members who can provide emotional support and practical help.", category: "Support" }
  ];
  

  const getRandomTip = () => {
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const displayRandomTip = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentTip(getRandomTip());
      setIsChanging(false);
    }, 300);
  };

  useEffect(() => {
    displayRandomTip();
    const intervalId = setInterval(displayRandomTip, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getBadgeColor = (category) => {
    const colorMap = {
      "Stress Relief": "bg-blue-500 text-white",
      "Focus": "bg-indigo-500 text-white",
      "Self-Worth": "bg-purple-500 text-white",
      "Support": "bg-rose-500 text-white",
      "Gratitude": "bg-green-500 text-white",
      "Physical Wellness": "bg-amber-500 text-white",
      "Study Habits": "bg-teal-500 text-white"
    };
    return colorMap[category] || "bg-gray-500 text-white";
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto my-12 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
      </div>
      
      <div className="flex items-center mb-4">
        <Lightbulb className="w-8 h-8 text-amber-500 mr-3" />
        <h3 className="text-2xl font-bold text-gray-800">Daily Wellness Tip</h3>
      </div>

      <AnimatePresence mode="wait">
        {currentTip && !isChanging && (
          <motion.div
            key={currentTip.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4"
          >
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getBadgeColor(currentTip.category)}`}>
              {currentTip.category}
            </span>
            <p className="text-lg text-gray-700 flex-grow">{currentTip.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyTipComponent;