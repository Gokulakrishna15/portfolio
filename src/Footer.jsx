import React, { useState, useEffect } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaArrowUp, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaEnvelope 
} from "react-icons/fa";
import { 
  SiReact, 
  SiTailwindcss, 
  SiVite 
} from "react-icons/si";

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const [particles, setParticles] = useState([]);

  // FIX: Wrapped in setTimeout to prevent synchronous state update error
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParticles = [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      }));
      setParticles(newParticles);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  const year = new Date().getFullYear();

  return (
    // FIX: bg-gradient-to-b -> bg-linear-to-b
    <footer className="relative bg-linear-to-b from-[#1a1333] via-[#0f0c29] to-[#0a0612] border-t-2 border-orange-500/30 overflow-hidden pt-20 pb-10">
      
      <style>{`
        @keyframes footerGrid {
          0% { background-position: 0 0; }
          100% { background-position: 30px 30px; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 0 0 60px rgba(236, 72, 153, 0.4); }
        }
        
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        
        .footer-grid {
          background-image: linear-gradient(rgba(255, 190, 120, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 190, 120, 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: linear-gradient(to bottom, transparent, black 40%);
          animation: footerGrid 20s linear infinite;
        }
        
        .social-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .social-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #f59e0b, #ec4899, #f59e0b);
          background-size: 300% 300%;
          border-radius: inherit;
          opacity: 0;
          z-index: -1;
          filter: blur(10px);
          animation: gradientFlow 3s ease infinite;
        }
        
        .social-btn:hover::before {
          opacity: 0.8;
        }
        
        .social-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: translateX(-100%) rotate(45deg);
        }
        
        .social-btn:hover::after {
          animation: shimmer 0.8s ease;
        }
        
        .contact-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .contact-item::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f59e0b, #ec4899);
          transition: width 0.4s ease;
        }
        
        .contact-item:hover::before {
          width: 100%;
        }
        
        .tech-badge {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .tech-badge::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: inherit;
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .tech-badge:hover::before {
          opacity: 0.6;
        }
        
        .tech-badge:hover {
          transform: translateY(-5px) scale(1.05);
        }
        
        .back-to-top {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .back-to-top::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6);
          background-size: 200% 200%;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: gradientFlow 3s ease infinite;
        }
        
        .back-to-top:hover::before {
          opacity: 1;
        }
        
        .back-to-top:hover {
          transform: translateY(-5px) scale(1.1);
          animation: glow 2s ease-in-out infinite;
        }
        
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: morphBlob 10s ease-in-out infinite, float 12s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent);
          pointer-events: none;
          animation: ripple 1s ease-out;
        }
        
        .brand-title {
          position: relative;
          display: inline-block;
        }
        
        .brand-title::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #f59e0b, #ec4899, transparent);
          animation: gradientFlow 3s ease infinite;
        }
        
        .icon-circle {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .icon-circle:hover {
          transform: scale(1.2) rotate(10deg);
        }
        
        .orbit-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #f59e0b, #ec4899);
          border-radius: 50%;
          animation: orbit 8s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 footer-grid pointer-events-none" />
      
      {/* Morphing Blobs */}
      <div className="blob absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20" />
      <div className="blob absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/15" style={{ animationDelay: '2s' }} />
      <div className="blob absolute top-1/2 right-1/3 w-72 h-72 bg-purple-600/10" style={{ animationDelay: '4s' }} />
      
      {/* Ambient Horizon Glow */}
      {/* FIX: bg-gradient-to-t -> bg-linear-to-t, h-[300px] -> h-75 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-75 bg-linear-to-t from-orange-600/30 via-rose-600/10 to-transparent blur-[90px] pointer-events-none" />

      {/* Cursor Glow */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08), transparent)',
          filter: 'blur(50px)'
        }}
      />

      {/* Floating Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0 ? '#f59e0b' : p.id % 3 === 1 ? '#ec4899' : '#8b5cf6',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND */}
          <div className="md:col-span-5 space-y-6 animate-[slideInUp_0.6s_ease-out]">
            <div className="relative inline-block">
              <h2 className="brand-title text-4xl font-extrabold text-white tracking-tight">
                Gokulakrishna <span className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">N.E</span>
              </h2>
              <div className="absolute -inset-4 bg-amber-500/10 blur-2xl -z-10 animate-pulse" />
            </div>
            
            <p className="text-orange-200/80 leading-relaxed max-w-sm text-lg">
              Certified MERN Full Stack Developer crafting <span className="text-amber-300 font-semibold">pixel-perfect</span>, scalable, and high-performance web applications.
            </p>
            
            {/* Enhanced Social Buttons */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/Gokulakrishna15" 
                target="_blank" 
                rel="noreferrer"
                onClick={createRipple}
                // FIX: hover:bg-gradient-to-r -> hover:bg-linear-to-r
                className="social-btn relative w-12 h-12 rounded-xl bg-white/5 border border-orange-500/30 flex items-center justify-center text-white hover:bg-linear-to-r hover:from-orange-500 hover:to-pink-500 hover:border-transparent text-xl"
              >
                <FaGithub className="relative z-10" />
                {ripples.map(ripple => (
                  <div 
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 100,
                      height: 100,
                      marginLeft: -50,
                      marginTop: -50
                    }}
                  />
                ))}
              </a>
              <a 
                href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388" 
                target="_blank" 
                rel="noreferrer"
                className="social-btn relative w-12 h-12 rounded-xl bg-white/5 border border-orange-500/30 flex items-center justify-center text-white hover:bg-[#0077b5] hover:border-[#0077b5] text-xl"
              >
                <FaLinkedin className="relative z-10" />
              </a>
            </div>

            {/* Orbiting Particles around social */}
            <div className="relative w-12 h-12">
              <div className="orbit-particle" style={{ animationDelay: '0s' }} />
              <div className="orbit-particle" style={{ animationDelay: '2s' }} />
              <div className="orbit-particle" style={{ animationDelay: '4s' }} />
            </div>
          </div>

          {/* COLUMN 2: QUICK CONTACT */}
          <div className="md:col-span-4 space-y-6 animate-[slideInUp_0.6s_ease-out_0.1s]">
            <div className="relative inline-block">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest pb-3">
                Contact
              </h3>
              {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-orange-500/50 via-pink-500/50 to-transparent" />
            </div>
            
            <ul className="space-y-4">
              <li>
                <a href="mailto:gokulakrishna578@gmail.com" className="contact-item group flex items-center gap-3 text-orange-200/80 hover:text-amber-300 py-2">
                  <span className="icon-circle w-10 h-10 rounded-full bg-white/5 border border-orange-500/20 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-all">
                    <FaEnvelope className="text-sm" />
                  </span>
                  <span className="text-sm">gokulakrishna578@gmail.com</span>
                </a>
              </li>
              <li className="contact-item group flex items-start gap-3 text-orange-200/80 py-2">
                {/* FIX: flex-shrink-0 -> shrink-0 */}
                <span className="icon-circle w-10 h-10 rounded-full bg-white/5 border border-orange-500/20 flex items-center justify-center shrink-0 mt-1 group-hover:border-rose-500/50">
                  <FaMapMarkerAlt className="text-sm text-rose-400" />
                </span>
                <span>
                  <span className="block text-white font-medium">Gobichettipalayam</span>
                  <span className="text-xs opacity-60">Erode – 638452, Tamil Nadu</span>
                </span>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: TECH STACK */}
          <div className="md:col-span-3 space-y-6 animate-[slideInUp_0.6s_ease-out_0.2s]">
            <div className="relative inline-block">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest pb-3">
                Powered By
              </h3>
              {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-orange-500/50 via-pink-500/50 to-transparent" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="tech-badge px-4 py-2.5 rounded-lg bg-[#1a1333] border border-orange-500/30 text-cyan-400 text-sm font-bold flex items-center gap-2 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <SiReact className="text-lg" /> React
              </span>
              <span className="tech-badge px-4 py-2.5 rounded-lg bg-[#1a1333] border border-orange-500/30 text-sky-400 text-sm font-bold flex items-center gap-2 hover:border-sky-400/70 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <SiTailwindcss className="text-lg" /> Tailwind
              </span>
              <span className="tech-badge px-4 py-2.5 rounded-lg bg-[#1a1333] border border-orange-500/30 text-pink-400 text-sm font-bold flex items-center gap-2 hover:border-pink-400/70 hover:shadow-[0_0_20px_rgba(244,114,182,0.3)]">
                <SiVite className="text-lg" /> Vite
              </span>
            </div>
            
            <div className="p-4 rounded-lg bg-white/5 border border-orange-500/20 backdrop-blur-sm">
              <p className="text-xs text-orange-200/70">
                Deployed on <span className="text-amber-400 font-bold">Netlify</span> with CI/CD
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Divider */}
        <div className="relative h-px w-full mb-8">
          {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-orange-500/40 to-transparent blur-sm" />
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-orange-200/70 text-sm">
            © {year} <span className="text-amber-400 font-bold">Gokulakrishna</span>. All rights reserved.
          </p>

          <p className="text-orange-200/70 text-sm flex items-center gap-2">
            Made with <FaHeart className="text-rose-500 animate-pulse" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} /> from <span className="text-white font-semibold">Gobi</span>
          </p>

          {/* Enhanced Back to Top */}
          <button 
            onClick={scrollToTop}
            className="back-to-top group flex items-center gap-3 text-sm font-bold text-white bg-white/5 border-2 border-orange-500/30 px-6 py-3 rounded-full shadow-xl hover:shadow-orange-500/30"
          >
            <span className="relative z-10">TOP</span>
            <FaArrowUp className="relative z-10 group-hover:-translate-y-2 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}