import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Resources from "../pages/Resources";
import Appointments from "../pages/Appointments";
import FAQs from "../pages/FAQs";
import Events from "../pages/Events";
import Team from "../pages/Team";

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
                <Home />
              </>
            }
          />

          {/* Other Routes */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;