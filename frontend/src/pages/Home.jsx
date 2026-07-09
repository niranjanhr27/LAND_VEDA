// Home.jsx — Assembles all sections of the LandVeda website

/*import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import NRI from "../components/NRI/NRI";
import Agri from "../components/Agri/Agri";
import GovtServices from "../components/GovtServices/GovtServices";
import Process from "../components/Process/Process";
import ContactForm from "../components/ContactForm/ContactForm";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <NRI />
      <Agri />
      <GovtServices />
      <Process />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;*/

// Home.jsx — Assembles all sections of the LandVeda website
// Receives login handler props from App.jsx and passes to Navbar

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import NRI from "../components/NRI/NRI";
import Agri from "../components/Agri/Agri";
import GovtServices from "../components/GovtServices/GovtServices";
import Process from "../components/Process/Process";
import ContactForm from "../components/ContactForm/ContactForm";
import Footer from "../components/Footer/Footer";

// Home receives onAdminLogin and onClientLogin from App.jsx
// These are passed to Navbar so login buttons work correctly
function Home({ onAdminLogin, onClientLogin }) {
  return (
    <div>
      {/* Navbar — fixed at top, receives login handlers */}
      <Navbar onAdminLogin={onAdminLogin} onClientLogin={onClientLogin} />

      {/* All page sections below navbar */}
      <Hero />
      <Services />
      <NRI />
      <Agri />
      <GovtServices />
      <Process />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
