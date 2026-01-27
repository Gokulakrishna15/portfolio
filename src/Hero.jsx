import React, { useState, useEffect, useRef } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaFileDownload,
  FaArrowDown,
  FaCode,
  FaServer,
  FaDatabase
} from "react-icons/fa";

/**
 * ==========================================
 * UTILITY HOOKS & PHYSICS ENGINES
 * ==========================================
 */

// Hook: Tracks mouse position for Parallax effects
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

// Hook: Advanced Typewriter with Pause/Delete logic
const useTypewriter = (words, typingSpeed = 150, deletingSpeed = 100, pauseTime = 2000) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const blink2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blink2);
  }, []);

  // Typing logic
  useEffect(() => {
    // If finished typing word, wait then delete
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    // If finished deleting, switch to next word
    if (subIndex === 0 && reverse) {
      // FIX: Wrapped in setTimeout to avoid "synchronous setState in effect" error
      const timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 0);
      return () => clearTimeout(timeout);
    }

    // Typing/Deleting character
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseTime]);

  return `${words[index].substring(0, subIndex)}${blink ? "|" : " "}`;
};

/**
 * ==========================================
 * VISUAL SUB-COMPONENTS
 * ==========================================
 */

// FIX: Moved Particle class outside the component to satisfy linter
class MistParticle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(255, 255, 200, ${Math.random() * 0.5 + 0.1})`; // Gold/White dust
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around screen
    if (this.x > canvasWidth) this.x = 0;
    if (this.x < 0) this.x = canvasWidth;
    if (this.y > canvasHeight) this.y = 0;
    if (this.y < 0) this.y = canvasHeight;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Component: Canvas-based Morning Mist/Pollen Particles
const MorningMistCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Particle Configuration
    const particlesArray = [];
    const numberOfParticles = 80;

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        // FIX: Using external class
        particlesArray.push(new MistParticle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(canvas.width, canvas.height);
        particlesArray[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none opacity-60" />;
};

// Component: Magnetic Button (Pulls towards cursor)
const MagneticButton = ({ children, href, className }) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const x = (clientX - centerX) * 0.3; // Magnetic strength
    const y = (clientY - centerY) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </a>
  );
};

// Component: Parallax Cloud Layer
const CloudLayer = ({ speed, opacity, scale, top }) => {
  return (
    <div 
      className="absolute w-full overflow-hidden pointer-events-none"
      style={{ 
        top: top, 
        opacity: opacity,
        zIndex: 5
      }}
    >
      <div 
        className="flex animate-cloudMove"
        style={{ 
          animationDuration: `${speed}s`,
          transform: `scale(${scale})` 
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mx-20">
            <svg width="200" height="100" viewBox="0 0 200 100" className="text-white fill-current opacity-40">
              <path d="M20,80 Q40,40 70,70 Q90,30 130,60 Q160,40 180,80 Z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * ==========================================
 * MAIN HERO COMPONENT
 * ==========================================
 */
export default function Hero() {
  const mouse = useMousePosition();
  const text = useTypewriter([
    "Certified MERN Developer 💻",
    "ReactJS Enthusiast ⚛️",
    "Node.js Explorer ⚡",
    "From Gobichettipalayam 🏡"
  ]);

  // Calculate Parallax Offsets based on mouse position
  // We check window existence for SSR safety, though mostly client-side here
  const parallaxX = typeof window !== 'undefined' ? (mouse.x / window.innerWidth - 0.5) * 20 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mouse.y / window.innerHeight - 0.5) * 20 : 0;

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#ff7e5f] font-sans">
      
      {/* 1. Global Styles & Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&family=Righteous&display=swap');
        
        .font-righteous { font-family: 'Righteous', cursive; }
        .font-outfit { font-family: 'Outfit', sans-serif; }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes cloudMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes sunPulse {
          0%, 100% { box-shadow: 0 0 60px 30px rgba(255, 200, 50, 0.4); transform: translate(-50%, -50%) scale(1); }
          50% { box-shadow: 0 0 100px 50px rgba(255, 200, 50, 0.6); transform: translate(-50%, -50%) scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        .text-shadow-retro {
          text-shadow: 2px 2px 0px rgba(255, 100, 50, 0.8);
        }
      `}</style>

      {/* 2. DYNAMIC BACKGROUND LAYERS */}
      
      {/* Layer 0: Sky Gradient (Animated) */}
      <div 
        // FIX: bg-gradient-to-br -> bg-linear-to-br
        className="absolute inset-0 z-0 bg-linear-to-br from-[#ff512f] via-[#dd2476] to-[#ff9966]"
        style={{ backgroundSize: "400% 400%", animation: "gradientFlow 15s ease infinite" }}
      />

      {/* Layer 1: The Massive Sun (Parallax Enhanced) */}
      <div 
        className="absolute z-0 rounded-full bg-[#ffcc33]"
        style={{
          width: '600px',
          height: '600px',
          top: '20%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${parallaxX * -2}px, ${parallaxY * -2}px)`,
          animation: 'sunPulse 8s ease-in-out infinite'
        }}
      />

      {/* Layer 2: Moving Clouds */}
      <CloudLayer top="10%" speed={60} opacity={0.6} scale={1.2} />
      <CloudLayer top="25%" speed={45} opacity={0.4} scale={0.8} />

      {/* Layer 3: Back Mountains (Slower Parallax) */}
      <div 
        className="absolute bottom-0 w-full z-1 opacity-80"
        style={{ transform: `translateX(${parallaxX * 2}px)` }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-orange-900 fill-current">
          <path d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,197.3C672,203,768,213,864,224C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Layer 4: Front Mountains (Faster Parallax) */}
      <div 
        className="absolute bottom-0 w-full z-2 text-[#4a1c13]"
        style={{ transform: `translateX(${parallaxX * 5}px)` }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto fill-current">
          <path d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,144C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Layer 5: Canvas Mist */}
      <MorningMistCanvas />

      {/* 3. FOREGROUND CONTENT LAYER */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 w-full max-w-5xl">
        
        {/* Glassmorphic Hero Card */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl text-center backdrop-blur-md animate-[float_6s_ease-in-out_infinite]">
          
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="bg-orange-500/20 text-orange-100 border border-orange-200/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
              Full Stack Engineer
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-righteous text-5xl md:text-8xl text-white mb-4 drop-shadow-xl text-shadow-retro">
            Gokulakrishna <span className="text-yellow-300">N.E</span>
          </h1>

          {/* Typewriter Subtitle */}
          <div className="h-12 mb-8 flex items-center justify-center">
            <p className="font-outfit text-xl md:text-3xl text-orange-100 font-light">
              {text}
            </p>
          </div>

          {/* Tech Stack Icons (Decorative) */}
          <div className="flex justify-center gap-6 mb-10 text-orange-200/60">
            <FaCode className="text-2xl animate-pulse" />
            <span className="text-xl">•</span>
            <FaServer className="text-2xl animate-pulse delay-100" />
            <span className="text-xl">•</span>
            <FaDatabase className="text-2xl animate-pulse delay-200" />
          </div>

          {/* Call To Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            
            {/* Resume Button - Magnetic */}
            <MagneticButton 
              href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link"
              className="group relative px-8 py-4 bg-yellow-400 text-orange-900 rounded-full font-bold shadow-[0_0_20px_rgba(250,204,21,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative flex items-center gap-2">
                <FaFileDownload /> View My Resume
              </div>
            </MagneticButton>

            {/* Social Buttons - Glass */}
            <div className="flex gap-4">
              <MagneticButton 
                href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
                className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 hover:text-blue-300 transition-colors border border-white/10"
              >
                <FaLinkedin size={24} />
              </MagneticButton>
              
              <MagneticButton 
                href="https://github.com/Gokulakrishna15"
                className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 hover:text-black transition-colors border border-white/10"
              >
                <FaGithub size={24} />
              </MagneticButton>
              
              <MagneticButton 
                href="mailto:gokulakrishna578@gmail.com"
                className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 hover:text-red-300 transition-colors border border-white/10"
              >
                <FaEnvelope size={24} />
              </MagneticButton>
            </div>
          </div>

          {/* Email Display */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-orange-200/80 font-mono text-sm tracking-wide">
              gokulakrishna578@gmail.com
            </p>
          </div>

        </div>
      </div>

      {/* 4. SCROLL INDICATOR */}
      <div className="absolute bottom-8 z-30 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/80 text-xs uppercase tracking-widest font-bold text-shadow-retro">Explore</span>
        <div className="p-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
          <FaArrowDown className="text-yellow-300" />
        </div>
      </div>

    </section>
  );
}