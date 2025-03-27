import { useState, useRef, useEffect } from 'react';

const WellnessChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the IIT Jammu Wellness Center virtual assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [conversationContext, setConversationContext] = useState({
    lastTopic: null,
    followUpExpected: false,
    userName: null,
    appointmentDetails: {
      service: null,
      date: null,
      time: null,
      confirmed: false
    }
  });
  const [chatbotData, setChatbotData] = useState({
    knowledgeBase: {},
    intents: {},
    conversationFlows: {},
    fallbackResponses: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch knowledge base data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real implementation, you would fetch from an actual endpoint
        // For demo purposes, you could use fetch('/api/knowledge.json')
        const response = await fetch('/knowledge.json');
        if (!response.ok) {
          throw new Error('Failed to fetch knowledge base');
        }
        const data = await response.json();
        setChatbotData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching knowledge base:', error);
      }
    };

    fetchData();
  }, []);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle user input
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    
    // Process response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 600);
    
    setInputValue('');
  };

  // Function to detect intent from user input
  const detectIntent = (input) => {
    if (isLoading) return "unknown";
    
    const lowercaseInput = input.toLowerCase();
    
    // Check for exact intent matches
    for (const [intent, phrases] of Object.entries(chatbotData.intents)) {
      for (const phrase of phrases) {
        if (lowercaseInput.includes(phrase)) {
          return intent;
        }
      }
    }
    
    // Check for topic/entity matches in knowledge base
    for (const topic of Object.keys(chatbotData.knowledgeBase)) {
      if (lowercaseInput.includes(topic)) {
        return `info_${topic}`;
      }
    }
    
    return "unknown";
  };

  // Function to extract entities from user input
  const extractEntities = (input, entityTypes) => {
    const lowercaseInput = input.toLowerCase();
    const extractedEntities = {};
    
    // Simple date extraction (very basic implementation)
    if (entityTypes.includes("date")) {
      const datePatterns = [
        /\b(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
        /\b(\d{1,2}(?:st|nd|rd|th)? (?:january|february|march|april|may|june|july|august|september|october|november|december))\b/i,
        /\b(\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4})\b/i
      ];
      
      for (const pattern of datePatterns) {
        const match = lowercaseInput.match(pattern);
        if (match) {
          extractedEntities.date = match[1];
          break;
        }
      }
    }
    
    // Simple time extraction
    if (entityTypes.includes("time")) {
      const timePattern = /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm)|morning|afternoon|evening)\b/i;
      const match = lowercaseInput.match(timePattern);
      if (match) {
        extractedEntities.time = match[1];
      }
    }
    
    // Service type extraction
    if (entityTypes.includes("service")) {
      const services = ["counseling", "yoga", "meditation", "psychologist"];
      for (const service of services) {
        if (lowercaseInput.includes(service)) {
          extractedEntities.service = service;
          break;
        }
      }
    }
    
    return extractedEntities;
  };

  // Function to handle conversation flow
  const handleConversationFlow = (intent, input) => {
    if (isLoading) return null;
    
    // Check if we're in an active flow
    if (conversationContext.activeFlow) {
      const flow = chatbotData.conversationFlows[conversationContext.activeFlow];
      const currentStep = flow.steps[flow.current];
      
      // Extract entities for the current step
      const entities = extractEntities(input, [currentStep]);
      
      // Update appointment details with extracted entity
      if (Object.keys(entities).length > 0) {
        const updatedAppointmentDetails = {
          ...conversationContext.appointmentDetails,
          ...entities
        };
        
        setConversationContext(prev => ({
          ...prev,
          appointmentDetails: updatedAppointmentDetails
        }));
        
        // Move to next step
        if (flow.current < flow.steps.length - 1) {
          const nextStep = flow.steps[flow.current + 1];
          let response = flow.responses[currentStep];
          
          // Replace placeholders with actual values
          Object.entries(updatedAppointmentDetails).forEach(([key, value]) => {
            if (value) {
              response = response.replace(`{${key}}`, value);
            }
          });
          
          // Update flow state
          setConversationContext(prev => ({
            ...prev,
            activeFlow: prev.activeFlow,
            flowStep: nextStep,
            lastTopic: currentStep
          }));
          
          return response;
        } else {
          // Flow completed
          setConversationContext(prev => ({
            ...prev,
            activeFlow: null,
            flowStep: null
          }));
          
          return flow.responses.confirmation;
        }
      }
    }
    
    // Start a new flow if intent matches a flow
    if (intent === "book_appointment" && chatbotData.conversationFlows.book_appointment) {
      setConversationContext(prev => ({
        ...prev,
        activeFlow: "book_appointment",
        flowStep: chatbotData.conversationFlows.book_appointment.steps[0]
      }));
      
      return chatbotData.conversationFlows.book_appointment.start;
    }
    
    return null;
  };

  // Function to generate bot response based on user input and context
  const generateResponse = (input) => {
    if (isLoading) {
      return "I'm still loading my knowledge base. Please give me a moment...";
    }
    
    const intent = detectIntent(input);
    const lowercaseInput = input.toLowerCase();
    
    // Check if we're in a conversation flow
    const flowResponse = handleConversationFlow(intent, input);
    if (flowResponse) return flowResponse;
    
    // Handle basic intents
    if (intent === "greeting") {
      return "Hello! How can I assist you with IIT Jammu's wellness services today?";
    }
    
    if (intent === "farewell") {
      return "Thank you for chatting with me! If you need any wellness assistance in the future, I'm here to help. Take care!";
    }
    
    if (intent === "thanks") {
      return "You're welcome! Is there anything else I can help you with regarding our wellness services?";
    }
    
    if (intent === "feeling_unwell") {
      return "I'm sorry to hear you're not feeling well. For immediate medical concerns, please visit our Wellness Center during operating hours (8 AM - 8 PM weekdays, 9 AM - 5 PM Saturdays) or call our emergency hotline at 0191-257-XXXX for urgent situations. Would you like information about specific symptoms?";
    }
    
    if (intent === "mental_health") {
      return "Your mental well-being is important to us. Our counseling services are available Monday to Friday, 9 AM to 5 PM, with confidential sessions. We also offer stress management workshops and guided meditation sessions. Would you like me to help you schedule a counseling appointment?";
    }
    
    // Check for topics in the knowledge base based on context and keywords
    for (const [topic, info] of Object.entries(chatbotData.knowledgeBase)) {
      if (lowercaseInput.includes(topic)) {
        // Update conversation context
        setConversationContext(prev => ({
          ...prev,
          lastTopic: topic,
          followUpExpected: true
        }));
        
        // Return a random response from the topic
        return info.responses[Math.floor(Math.random() * info.responses.length)];
      }
    }
    
    // Check for follow-up questions if we have a last topic
    if (conversationContext.lastTopic && conversationContext.followUpExpected) {
      const lastTopicInfo = chatbotData.knowledgeBase[conversationContext.lastTopic];
      
      // Check if the input matches any follow-up topics
      for (const followUp of lastTopicInfo.followUps) {
        if (lowercaseInput.includes(followUp.toLowerCase())) {
          // This is a valid follow-up, generate a more specific response
          return `Regarding ${followUp} for our ${conversationContext.lastTopic} services: We offer specialized options and flexible scheduling. Our staff can provide personalized guidance for your specific needs. Would you like more details about anything in particular?`;
        }
      }
    }
    
    // Reset follow-up expectation for fallback responses
    setConversationContext(prev => ({
      ...prev,
      followUpExpected: false
    }));
    
    // Use fallback responses from knowledge base
    return chatbotData.fallbackResponses[Math.floor(Math.random() * chatbotData.fallbackResponses.length)];
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/wellness-logo.jpg" alt="IIT Jammu Logo" className="h-8 w-8 rounded-full mr-2" />
              <div>
                <h3 className="font-medium text-sm">IIT Jammu Wellness</h3>
                <p className="text-xs text-indigo-100">Virtual Assistant</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-indigo-100 hover:text-white"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 text-sm focus:outline-none"
                aria-label="Chat message input"
              />
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-center disabled:bg-indigo-400"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>

          {/* Quick suggestions */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => {
                  setInputValue("Wellness Events");
                  document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                }}
                className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                disabled={isLoading}
              >
                Wellness Events
              </button>
              <button 
                onClick={() => {
                  setInputValue("Counseling services");
                  document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                }}
                className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                disabled={isLoading}
              >
                Counseling
              </button>
              <button 
                onClick={() => {
                  setInputValue("Yoga classes");
                  document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                }}
                className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                disabled={isLoading}
              >
                Wellness Resources
              </button>
              <button 
                onClick={() => {
                  setInputValue("Center timings");
                  document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                }}
                className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                disabled={isLoading}
              >
                Center timings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessChatbot;