import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

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

      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      setShowTopButton(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-black/70 backdrop-blur-md border-b-2 border-orange-400 shadow-lg relative">
        {/* Sunrise Aura */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,#ffdd00,#ff8800,transparent)]"></div>

        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
          <div
            className="h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center px-8 py-4 relative z-10">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-orange-400 hover:text-yellow-300 transition duration-300 cursor-pointer">
            🌅 Gokulakrishna N.E
          </h1>

          {/* Desktop Links with Tooltips */}
          <div className="hidden md:flex space-x-12">
            {["about", "skills", "projects", "contact"].map((section) => (
              <div key={section} className="group relative">
                <a
                  href={`#${section}`}
                  className={`relative text-lg font-semibold transition duration-300 ${
                    activeSection === section
                      ? "text-yellow-300"
                      : "text-orange-400 hover:text-pink-400"
                  }`}
                >
                  {section === "about" && "👤 About"}
                  {section === "skills" && "🛠 Skills"}
                  {section === "projects" && "📂 Projects"}
                  {section === "contact" && "📞 Contact"}
                </a>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-orange-300 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {section === "about" && "💡 Learn who I am"}
                  {section === "skills" && "⚡ Tech stack mastery"}
                  {section === "projects" && "🚀 See my work"}
                  {section === "contact" && "📧 Let’s connect"}
                </span>
              </div>
            ))}
          </div>

          {/* Hire Me Button */}
          <a
            href="#contact"
            className="hidden md:inline-block bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition"
          >
            💼 Hire Me
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-orange-400 hover:text-pink-400 transition text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center bg-black/95 border-t border-orange-400 animate-fadeIn">
            <a href="#about" onClick={() => setIsOpen(false)} className="py-3 w-full text-center text-lg text-orange-400 hover:text-pink-400">👤 About</a>
            <a href="#skills" onClick={() => setIsOpen(false)} className="py-3 w-full text-center text-lg text-orange-400 hover:text-pink-400">🛠 Skills</a>
            <a href="#projects" onClick={() => setIsOpen(false)} className="py-3 w-full text-center text-lg text-orange-400 hover:text-pink-400">📂 Projects</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="py-3 w-full text-center text-lg text-orange-400 hover:text-pink-400">📞 Contact</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="my-4 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition">💼 Hire Me</a>
          </div>
        )}
      </nav>

      {/* Floating Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-black px-4 py-2 rounded-full shadow-lg hover:scale-110 transition"
        >
          ⬆️ Back to Top
        </button>
      )}
    </>
  );
}
