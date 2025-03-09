import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import Hero from "../pages/Hero";
import AboutUs from "../pages/AboutUs";
import Resources from "../pages/Resources";
import Appointments from "../pages/Appointments";
import FAQs from "../pages/FAQs";
import ContactUs from "../pages/ContactUs";
import Footer from "../components/Footer";
import WellnessCTA from "./WellnessCTA";
import Events from "../pages/Events";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <WellnessCTA />
                <Footer />
              </>
            }
          />

          {/* Other Routes */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;