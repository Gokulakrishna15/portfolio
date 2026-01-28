import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications"; // ✅ Added Certifications import
import Contact from "./Contact";
import Footer from "./Footer";

function App() {
  return (
    // Removed 'text-green-400 font-retro' to let individual components control their premium styling
    <div className="bg-black min-h-screen text-slate-200 font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications /> {/* ✅ Added Certifications Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;