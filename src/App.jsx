import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";
import AI from "./AI"; // ✅ Added AI Import
import Contact from "./Contact";
import Footer from "./Footer";

function App() {
  return (
    <div className="bg-black min-h-screen text-slate-200 font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <AI /> {/* ✅ Added AI & Automation Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;