import { useState } from "react";
import { Calendar, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const AppointmentBooking = () => {
  const [appointmentType, setAppointmentType] = useState("consultation");

  const handleAppointmentTypeChange = (value) => {
    setAppointmentType(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule an Appointment</h2>
      
      {/* Contact info section with updated colors and Saral Portal */}
      <div className="bg-amber-50 p-6 rounded-lg mb-8 border border-amber-100">
        <div className="flex items-start space-x-3 mb-4">
          <div className="bg-amber-100 p-2 rounded-full">
            <Users className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need to speak with a counselor?</h3>
            <p className="text-gray-700">
              Visit our <Link to="/team" className="font-medium text-amber-700 hover:text-amber-800 underline">team page</Link> to find contact details for all our counselors.
            </p>
          </div>
        </div>
        
        {/* Saral Portal Section */}
        <div className="flex items-start space-x-3 mt-4 mb-4">
          <div className="bg-amber-100 p-2 rounded-full">
            <Globe className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Saral Portal</h3>
            <p className="text-gray-700 mb-2">
              You can also book appointments through our <a href="https://saral.iitjammu.ac.in/" className="text-amber-700 font-medium underline" >Saral Portal</a>.
            </p>
          </div>
        </div>
        
        <div className="text-sm bg-white p-4 rounded-md border border-amber-200 mt-4">
          <p className="text-gray-800 font-medium">Quick Scheduling</p>
          <p className="text-gray-600">Select your appointment type below and choose an available time slot from our calendar.</p>
        </div>
      </div>

      {/* Appointment type selection with updated colors */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Appointment Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div 
            className={`p-4 border rounded-md cursor-pointer transition ${
              appointmentType === "consultation" ? "border-teal-500 bg-teal-50" : "hover:border-teal-300"
            }`}
            onClick={() => handleAppointmentTypeChange("consultation")}
          >
            <h4 className="font-medium text-gray-800">General Consultation</h4>
          </div>
          <div 
            className={`p-4 border rounded-md cursor-pointer transition ${
              appointmentType === "followup" ? "border-teal-500 bg-teal-50" : "hover:border-teal-300"
            }`}
            onClick={() => handleAppointmentTypeChange("followup")}
          >
            <h4 className="font-medium text-gray-800">Follow-up Visit</h4>
          </div>
          <div 
            className={`p-4 border rounded-md cursor-pointer transition ${
              appointmentType === "virtual" ? "border-teal-500 bg-teal-50" : "hover:border-teal-300"
            }`}
            onClick={() => handleAppointmentTypeChange("virtual")}
          >
            <h4 className="font-medium text-gray-800">Virtual Appointment</h4>
          </div>
        </div>
      </div>
      
      {/* Calendar info section with updated colors */}
      <div className="mt-4 mb-6">
        <div className="flex items-center text-gray-800 mb-2">
          <Calendar className="mr-2 h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-semibold">Select a Date & Time</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Choose from available time slots below.
        </p>
      </div>

      {/* Placeholder for appointment scheduling system */}
      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-gray-50 p-8 text-center">
        <Calendar className="h-12 w-12 text-teal-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment Calendar</h3>
        <p className="text-gray-600 mb-6">
          Our appointment scheduling system will be displayed here. Please check back soon or use the Saral Portal for now.
        </p>
        <a 
          href="https://saral.iitjammu.ac.in/" 
          className="inline-block px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition font-medium"
        >
          Book via Saral Portal
        </a>
      </div>
    </div> 
  );
};

export default AppointmentBooking;