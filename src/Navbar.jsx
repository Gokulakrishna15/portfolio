import React, { useEffect, useRef, useState } from "react";

/**
 * Navbar.jsx
 * - Cinematic navbar with parallax logo, scroll progress, accessible mobile menu
 * - Enhanced with advanced UI/UX animations and micro-interactions
 * - Respects prefers-reduced-motion
 */

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const logoRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", handler);
    return () => mediaQuery.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"];
      let current = "";
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id;
          }
        }
      });
      setActiveSection(current);

      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      setShowTopButton(scrollTop > 300);
      setIsScrolled(scrollTop > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape or outside click
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClickOutside);
    };
  }, [isOpen]);

  // Parallax logo (mouse move)
  useEffect(() => {
    if (!logoRef.current || prefersReducedMotion) return;
    const el = logoRef.current;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0) rotate(${x * 2}deg)`;
    };
    const reset = () => (el.style.transform = "");
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", reset);
    };
  }, [prefersReducedMotion]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const navItems = [
    { id: "about", label: "👤 About", hint: "Learn who I am", icon: "👨‍💻" },
    { id: "skills", label: "🛠 Skills", hint: "Tech stack mastery", icon: "⚡" },
    { id: "projects", label: "📂 Projects", hint: "See my work", icon: "🚀" },
    { id: "contact", label: "📞 Contact", hint: "Let's connect", icon: "💬" },
  ];

  return (
    <>
      <style>{`
        /* Enhanced animations */
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .nav-container {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-scrolled {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 40px rgba(255, 136, 0, 0.2);
        }
        
        .logo-glow {
          position: relative;
        }
        
        .logo-glow::before {
          content: "";
          position: absolute;
          inset: -4px;
          background: linear-gradient(45deg, #ff8800, #ffdd00, #ff8800);
          background-size: 300% 300%;
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          filter: blur(8px);
          transition: opacity 0.3s ease;
          animation: gradientFlow 3s ease infinite;
        }
        
        .logo-glow:hover::before {
          opacity: 0.6;
        }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 221, 0, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .nav-link:hover::before {
          left: 100%;
        }
        
        .nav-link-active {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .hire-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #ff8800, #ff44aa, #aa44ff, #ff8800);
          background-size: 300% 300%;
          animation: gradientFlow 4s ease infinite;
        }
        
        .hire-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }
        
        .hire-button:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .hire-button::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
        }
        
        .mobile-menu-item {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideDown 0.4s ease forwards;
        }
        
        .scroll-progress {
          position: relative;
          overflow: hidden;
        }
        
        .scroll-progress::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
        }
        
        .back-to-top {
          animation: float 3s ease-in-out infinite;
        }
        
        .back-to-top::before {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff8800, #ff44aa);
          opacity: 0;
          z-index: -1;
          filter: blur(10px);
          animation: ripple 2s ease-out infinite;
        }
        
        .tooltip {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .hamburger {
          transition: transform 0.3s ease;
        }
        
        .hamburger:hover {
          transform: rotate(90deg) scale(1.1);
        }
        
        .nav-item-hover-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 136, 0, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          border-radius: 8px;
        }
        
        .nav-link:hover .nav-item-hover-bg {
          opacity: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 z-50">
        Skip to content
      </a>

      <nav
        className={`nav-container fixed w-full top-0 z-50 bg-black/70 backdrop-blur-md border-b-2 border-orange-400 shadow-lg ${
          isScrolled ? 'nav-scrolled' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Sunrise Aura */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffdd00,#ff8800,transparent)] pointer-events-none"
          style={{ 
            opacity: 0.2,
            animation: prefersReducedMotion ? 'none' : 'pulseGlow 4s ease-in-out infinite'
          }}
        />

        {/* Scroll Progress */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
          <div
            className="scroll-progress h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 transition-all duration-200 shadow-lg"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center justify-between px-6 md:px-10 py-3 relative z-10">
          {/* Logo */}
          <button
            ref={logoRef}
            onClick={() => scrollToTop()}
            aria-label="Go to top"
            className="flex items-center gap-3 text-left focus:outline-none group"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <span
              className="logo-glow inline-block rounded-full p-2 bg-gradient-to-br from-orange-400 to-pink-400 text-black shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              aria-hidden="true"
            >
              🌅
            </span>
            <div className="leading-tight">
              <div className="text-lg md:text-2xl font-bold tracking-widest text-orange-400 hover:text-yellow-300 transition duration-300 bg-clip-text">
                Gokulakrishna N.E
              </div>
              <div className="text-xs text-slate-300 -mt-1 group-hover:text-orange-200 transition duration-300">
                MERN Full Stack Developer
              </div>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8" role="menubar" aria-label="Primary">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li 
                    key={item.id} 
                    role="none" 
                    className="relative group"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(-1)}
                  >
                    <div className="nav-item-hover-bg" />
                    <a
                      role="menuitem"
                      href={`#${item.id}`}
                      className={`nav-link relative text-lg font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 px-3 py-2 rounded-lg ${
                        isActive ? "text-yellow-300 nav-link-active" : "text-orange-400 hover:text-pink-400"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </a>

                    {/* Tooltip */}
                    <div
                      className={`tooltip absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-900 to-pink-900 text-orange-100 text-sm px-3 py-1.5 rounded-lg shadow-xl transition-all duration-300 pointer-events-none border border-orange-400/30 ${
                        hoverIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                      aria-hidden="true"
                    >
                      <span className="text-2xl mr-1">{item.icon}</span>
                      {item.hint}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-900 rotate-45 border-t border-l border-orange-400/30" />
                    </div>

                    {/* Active underline */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 -bottom-1 h-1 rounded-full transition-all duration-300 ${
                        isActive ? "bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 scale-x-100 shadow-lg" : "bg-transparent scale-x-0"
                      }`}
                      style={{ transformOrigin: "center" }}
                    />
                  </li>
                );
              })}
            </ul>

            <a
              href="#contact"
              className="hire-button relative ml-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-black font-bold shadow-xl transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 overflow-hidden"
            >
              <span className="relative z-10">💼 Hire Me</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen((s) => !s)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              className="hamburger text-orange-400 hover:text-pink-400 transition text-3xl focus:outline-none focus:ring-2 focus:ring-orange-400 rounded p-1"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden bg-gradient-to-b from-black/95 to-gray-900/95 border-t border-orange-400 overflow-hidden backdrop-blur-xl ${
            isOpen ? "max-h-[600px] py-4" : "max-h-0"
          } transition-[max-height] duration-500 ease-in-out`}
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col items-center gap-2">
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className="mobile-menu-item w-full text-center py-3 text-lg text-orange-400 hover:text-pink-400 hover:bg-orange-400/10 transition rounded-lg"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="hire-button mobile-menu-item mt-3 text-black px-6 py-3 rounded-lg font-bold shadow-xl hover:scale-105 transition"
              style={{ animationDelay: `${navItems.length * 60}ms` }}
            >
              <span className="relative z-10">💼 Hire Me</span>
            </a>
          </nav>
        </div>
      </nav>

      {/* Back to Top */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="back-to-top fixed bottom-6 right-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition transform z-50 relative"
          aria-label="Back to top"
        >
          <span className="text-xl font-bold">⬆️</span>
        </button>
      )}
    </>
  );
}