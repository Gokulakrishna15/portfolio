import React, { useEffect, useRef, useState } from "react";

/**
 * =====================================================================
 * GOKULAKRISHNA'S ULTIMATE CINEMATIC NAVBAR
 * =====================================================================
 * FEATURES:
 * 1. HTML5 Canvas Particle System (Starfield/Embers)
 * 2. "Hacker" Text Scramble Effect on Hover
 * 3. Magnetic Button Physics
 * 4. Retro/Vintage Grain Overlay Toggle
 * 5. Smart Scroll Detection
 */

// --- UTILITY: Random Character Generator for Scramble Effect ---
const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";
const randomChar = () => CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];

// --- UTILITY: Particle Class (Moved Outside Component) ---
class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.01;
    
    // Reset if too small
    if (this.size <= 0.2) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
    }
  }

  draw(ctx, isRetro) {
    ctx.fillStyle = isRetro ? "rgba(255, 100, 0, 0.5)" : "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- HOOK: useScrambleText (Fixed Linter Warning) ---
const useScrambleText = (text, active) => {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let interval;

    if (active) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return randomChar();
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3; // Speed of decoding
      }, 30);
    } else {
      // FIX: Wrapped in setTimeout to prevent "synchronous setState" linter error.
      // This pushes the state update to the next event loop tick.
      const timer = setTimeout(() => {
          setDisplayText(text);
      }, 0);
      return () => clearTimeout(timer);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [active, text]);

  return displayText;
};

// --- COMPONENT: Magnetic Wrapper (Physics Buttons) ---
const MagneticItem = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Physics strength (lower = stronger pull)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

// --- COMPONENT: Canvas Background (The "Ember" System) ---
const ParticleBackground = ({ isRetro }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100; // Nav height
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Initialize particles using the external class
    const particles = Array.from({ length: 50 }, () => new Particle(canvas.width, canvas.height));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx, isRetro);
      });
      
      // Constellation Lines
      ctx.strokeStyle = isRetro ? "rgba(255, 100, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < 80) {
                  ctx.beginPath();
                  ctx.lineWidth = 0.5;
                  ctx.moveTo(particles[i].x, particles[i].y);
                  ctx.lineTo(particles[j].x, particles[j].y);
                  ctx.stroke();
              }
          }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRetro]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

// --- SUB-COMPONENT: Nav Link with Scramble ---
const NavLink = ({ item, activeSection, onClick, isRetro }) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayText = useScrambleText(item.label, isHovered);
  const isActive = activeSection === item.id;

  return (
    <MagneticItem>
      <a
        href={`#${item.id}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group px-5 py-3 rounded-xl flex flex-col items-center justify-center transition-all duration-500 overflow-hidden ${
            isActive ? "bg-white/5" : "hover:bg-white/5"
        }`}
      >
        <span className={`text-xl mb-1 transition-all duration-300 ${isHovered ? "scale-125 -translate-y-1" : ""} ${isActive ? "text-orange-400" : "text-gray-400"}`}>
            {item.icon}
        </span>
        <span className={`text-xs font-bold tracking-widest uppercase ${isActive ? "text-white" : "text-gray-400"} ${isRetro ? "font-mono" : "font-sans"}`}>
            {displayText}
        </span>
        
        {isActive && (
            <span className="absolute bottom-1 w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" />
        )}
      </a>
    </MagneticItem>
  );
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isRetroMode, setIsRetroMode] = useState(false);

  const navRef = useRef(null);

  // --- Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true); // Hide on scroll down
      } else {
        setIsHidden(false); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);

      const sections = ["about", "skills", "projects", "contact"];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);

      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // --- Spotlight Logic ---
  const handleMouseMove = (e) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      navRef.current.style.setProperty("--mouse-x", `${x}px`);
      navRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const navItems = [
    { id: "about", label: "ABOUT", icon: "🧬" },
    { id: "skills", label: "SKILLS", icon: "⚡" },
    { id: "projects", label: "WORK", icon: "🛸" },
    { id: "contact", label: "CONTACT", icon: "📡" },
  ];

  return (
    <>
      <style>{`
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes grain { 0%, 100% { transform: translate(0, 0); } 10% { transform: translate(-5%, -10%); } 30% { transform: translate(3%, -15%); } 50% { transform: translate(12%, 10%); } 70% { transform: translate(9%, 15%); } 90% { transform: translate(-10%, 10%); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(255, 136, 0, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 136, 0, 0); } 100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(255, 136, 0, 0); } }
        @keyframes float-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        
        .nav-container {
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
        }
        .spotlight-mask {
            background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%);
        }
        .retro-active { font-family: 'Courier New', monospace !important; filter: contrast(1.2) brightness(1.1) sepia(0.3); }
        .retro-scanline { background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 50%); background-size: 100% 4px; animation: scanline 10s linear infinite; pointer-events: none; }
        .retro-grain { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.15; animation: grain 8s steps(10) infinite; pointer-events: none; }
        .liquid-btn { background-size: 200% auto; background-image: linear-gradient(to right, #ff8000 0%, #ff0080 51%, #ff8000 100%); transition: 0.5s; }
        .liquid-btn:hover { background-position: right center; box-shadow: 0 0 20px #ff0080; }
      `}</style>

      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        className={`fixed w-full top-0 z-100 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] 
          ${isHidden ? "-translate-y-full" : "translate-y-0"}
          ${isScrolled ? "nav-container bg-black/80 h-20" : "bg-transparent h-28"}
          ${isRetroMode ? "retro-active" : ""}
        `}
      >
        <div className="absolute inset-0 z-[-1] overflow-hidden rounded-b-2xl">
            <ParticleBackground isRetro={isRetroMode} />
            <div className="spotlight-mask absolute inset-0 opacity-100 pointer-events-none mix-blend-overlay" />
            {isRetroMode && (
                <>
                    <div className="retro-grain fixed inset-0 z-50 mix-blend-overlay" />
                    <div className="retro-scanline absolute inset-0 z-40 opacity-20" />
                    <div className="absolute inset-0 bg-orange-900/10 z-30 mix-blend-color" />
                </>
            )}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/5">
            <div 
                className={`h-full shadow-[0_0_10px_currentColor] transition-all duration-100 ease-linear ${isRetroMode ? "bg-green-500 text-green-500" : "bg-linear-to-r from-orange-500 via-pink-500 to-purple-600"}`}
                style={{ width: `${scrollProgress}%` }}
            />
        </div>

        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative z-10">
            <MagneticItem>
                <div 
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="cursor-pointer group flex items-center gap-4"
                >
                    <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 transition-all duration-500 group-hover:rotate-6 ${isRetroMode ? "bg-black border-green-500" : "bg-linear-to-br from-gray-900 to-black"}`}>
                        <span className="text-2xl animate-pulse">👨‍💻</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className={`text-xl font-bold tracking-tight leading-none transition-colors ${isRetroMode ? "text-green-500 font-mono tracking-widest" : "text-white group-hover:text-orange-400"}`}>
                            GOKULAKRISHNA N.E
                        </h1>
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mt-1 ${isRetroMode ? "text-green-800" : "text-gray-500 group-hover:text-white"}`}>
                            MERN Full Stack Dev
                        </span>
                    </div>
                </div>
            </MagneticItem>

            <div className="hidden lg:flex items-center gap-4 bg-black/20 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
                {navItems.map((item) => (
                    <NavLink 
                        key={item.id} 
                        item={item} 
                        activeSection={activeSection}
                        isRetro={isRetroMode}
                    />
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsRetroMode(!isRetroMode)}
                    className="hidden md:flex flex-col items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:bg-white/10 transition group"
                    title="Toggle Retro Mode"
                >
                    <span className={`text-lg transition-transform duration-500 ${isRetroMode ? "rotate-180 grayscale" : "grayscale-0"}`}>
                        {isRetroMode ? "📺" : "👁️"}
                    </span>
                </button>

                <MagneticItem>
                    <a
                        href="#contact"
                        className={`liquid-btn relative px-8 py-3 rounded-xl font-bold text-white text-sm tracking-widest uppercase shadow-2xl flex items-center gap-2 overflow-hidden group ${isRetroMode ? "bg-green-600 font-mono rounded-none" : ""}`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                           Start Project <span className="group-hover:animate-bounce">🚀</span>
                        </span>
                    </a>
                </MagneticItem>

                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 text-2xl text-white focus:outline-none"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute top-5 right-5">
              <button onClick={() => setIsOpen(false)} className="text-white text-4xl hover:rotate-90 transition duration-300">✕</button>
          </div>
          <div className="flex flex-col items-center justify-center h-full gap-8">
             {navItems.map((item, idx) => (
                 <a 
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600 hover:to-orange-500 transition-all transform hover:scale-110 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                 >
                     {item.label}
                 </a>
             ))}
          </div>
      </div>
      
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-10 right-10 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-500 shadow-2xl ${
            isScrolled ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        } ${isRetroMode ? "bg-green-600 text-black font-mono border-4 border-black" : "bg-white/10 backdrop-blur-md text-orange-400 border border-orange-500/50 hover:bg-orange-500 hover:text-white"}`}
      >
        <span className="animate-[float-y_3s_ease-in-out_infinite]">⬆</span>
        {!isRetroMode && <span className="absolute inset-0 rounded-full animate-[pulse-ring_2s_infinite]" />}
      </button>
    </>
  );
}