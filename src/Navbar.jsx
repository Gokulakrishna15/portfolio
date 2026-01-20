import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"];
      let current = "";
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bg-black text-green-400 font-retro p-4 flex justify-between border-b-2 border-green-400 fixed w-full top-0 z-50">
      <h1 className="text-xl font-bold">Gokulakrishna N.E</h1>
      <div className="space-x-6">
        <a
          href="#about"
          className={`${
            activeSection === "about" ? "text-pink-400 underline" : "hover:text-pink-400"
          }`}
        >
          About
        </a>
        <a
          href="#skills"
          className={`${
            activeSection === "skills" ? "text-pink-400 underline" : "hover:text-pink-400"
          }`}
        >
          Skills
        </a>
        <a
          href="#projects"
          className={`${
            activeSection === "projects" ? "text-pink-400 underline" : "hover:text-pink-400"
          }`}
        >
          Projects
        </a>
        <a
          href="#contact"
          className={`${
            activeSection === "contact" ? "text-pink-400 underline" : "hover:text-pink-400"
          }`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}