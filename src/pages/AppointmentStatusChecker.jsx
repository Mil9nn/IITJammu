import { useState } from "react";
import { Search } from "lucide-react";

const AppointmentStatusChecker = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [email, setEmail] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!appointmentId.trim()) {
      setError("Please enter your appointment ID");
      return;
    }
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const API_URL = "https://iitjammu.onrender.com";
      // Fix: Update endpoint to use proper path format
      const response = await fetch(`${API_URL}/api/appointments/${appointmentId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to find appointment");
      }
      
      // Verify the email matches for security
      if (data.email.toLowerCase() !== email.toLowerCase()) {
        setError("The email address doesn't match our records for this appointment ID");
        setAppointment(null);
        return;
      }
      
      setAppointment(data);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      setError(error.message || "Failed to find your appointment. Please check your ID and try again.");
      setAppointment(null);
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return { text: "Pending Review", color: "bg-yellow-100 text-yellow-800" };
      case "confirmed":
        return { text: "Confirmed", color: "bg-green-100 text-green-800" };
      case "waiting":
        return { text: "On Waiting List", color: "bg-blue-100 text-blue-800" };
      case "rejected":
        return { text: "Not Available (Please Reschedule)", color: "bg-red-100 text-red-800" };
      default:
        return { text: status, color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Check Appointment Status</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment ID
          </label>
          <input
            type="text"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="Enter your appointment ID"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            "Checking..."
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Check Status
            </>
          )}
        </button>
      </form>
      
      {appointment && (
        <div className="mt-6 p-4 border rounded-md">
          <h3 className="text-lg font-semibold mb-3">Appointment Details</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{appointment.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(appointment.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{appointment.time}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{appointment.appointmentType}</span>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusLabel(appointment.status).color}`}>
                {getStatusLabel(appointment.status).text}
              </span>
            </div>
          </div>
          
          {appointment.status === "confirmed" && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
              Your appointment is confirmed. Please arrive 10 minutes before your scheduled time.
            </div>
          )}
          
          {appointment.status === "waiting" && (
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
              You&apos;re on our waiting list. We&apos;ll notify you if a spot becomes available.
            </div>
          )}
          
          {appointment.status === "rejected" && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
              We&apos;re unable to accommodate this appointment time. Please book a new appointment.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentStatusChecker;