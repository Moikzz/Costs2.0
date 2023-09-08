import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

import Home from "./components/pages/Home";
import Project from "./components/pages/Project";
import Service from "./components/pages/Service";
import Projects from "./components/pages/Projects";
import Services from "./components/pages/Services";
import NewProject from "./components/pages/NewProject";
import NewService from "./components/pages/NewService";
import Simulation from "./components/pages/Simulation";


function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/newservice" element={<NewService />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/service/:id" element={<Service />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;