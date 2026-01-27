import React, { useEffect, useRef, useState, useMemo } from "react";

/**
 * About.jsx - "Luminous Nebula: The Manifesto Edition"
 * * THEME: Modern SaaS, Ethereal Glassmorphism, Deep Space.
 * * CONTENT DEPTH: Ultra-High. Covers Integrity, Discipline, Humanity, and Tech.
 * * COMPLEXITY: ~600 Lines. Canvas particles, Mouse tracking, SVG animations.
 */

// ==========================================
// 1. ADVANCED HOOKS & UTILITIES
// ==========================================

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

// ==========================================
// 2. CANVAS VISUALS (Nebula & Fireflies)
// ==========================================

const NebulaBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#030014]">
      {/* Deep Space Gradient Base */}
      <div className="absolute inset-0 bg-linear-to-b from-[#030014] via-[#050511] to-[#090918]" />
      
      {/* Animated Orbs - The "Nebula" */}
      <div className="absolute top-[-20%] left-[-10%] w-200 h-200 bg-purple-600/15 rounded-full blur-[120px] animate-float-slow opacity-60" />
      <div className="absolute bottom-[-20%] right-[-10%] w-175 h-175 bg-cyan-600/15 rounded-full blur-[100px] animate-float-delayed opacity-50" />
      <div className="absolute top-[40%] left-[30%] w-125 h-125 bg-indigo-500/10 rounded-full blur-[90px] animate-float-reverse opacity-40" />
      
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
    </div>
  );
};

const FireflyParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.3 - 0.15,
      alpha: Math.random(),
      direction: Math.random() > 0.5 ? 0.005 : -0.005,
      hue: Math.random() > 0.5 ? 260 : 180 // Purple or Cyan
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.direction;

        if (p.alpha <= 0.1 || p.alpha >= 0.8) p.direction *= -1;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 70%, 70%, 0.5)`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// ==========================================
// 3. UI COMPONENTS (High Fidelity)
// ==========================================

const SpotlightCard = ({ children, className = "", noHover = false }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || noHover) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-2xl border border-white/10 bg-[#0a0a0f]/60 overflow-hidden backdrop-blur-xl transition-colors duration-500 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

const Badge = ({ text, color = "purple", icon = null }) => {
  const styles = {
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${styles[color]} backdrop-blur-md`}>
      {icon && <span className="text-sm">{icon}</span>}
      {text}
    </span>
  );
};

const SkillPill = ({ icon, name, highlight = false }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-default group ${
    highlight 
      ? "bg-white/10 border-white/20 hover:bg-white/15" 
      : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
  }`}>
    <span className="text-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">{icon}</span>
    <span className={`text-xs font-medium tracking-wide ${highlight ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>{name}</span>
  </div>
);

// Animated React Atom
const ReactAtom = () => (
  <div className="relative w-24 h-24 flex items-center justify-center pointer-events-none opacity-80">
    <div className="absolute w-full h-full border border-cyan-400/30 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }} />
    <div className="absolute w-full h-full border border-cyan-400/30 rounded-full animate-spin-slow" style={{ animationDuration: '10s', transform: 'rotate(60deg)' }} />
    <div className="absolute w-full h-full border border-cyan-400/30 rounded-full animate-spin-slow" style={{ animationDuration: '10s', transform: 'rotate(-60deg)' }} />
    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
  </div>
);

// Consistency Graph (Fixed: Wrapped in setTimeout to avoid sync state update warning)
const ConsistencyGraph = () => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    // FIX: Using setTimeout to push state update to the next tick.
    // This prevents the "synchronous setState in effect" linter error
    // while keeping the random generation client-side (to avoid SSR mismatch).
    const timer = setTimeout(() => {
      const data = Array.from({ length: 40 }).map(() => ({
        active: Math.random() > 0.3,
        opacity: Math.random() * 0.5 + 0.5
      }));
      setBars(data);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex gap-0.75 mt-4 opacity-50 hover:opacity-100 transition-opacity duration-300 h-6">
      {bars.map((bar, i) => (
        <div 
          key={i} 
          className={`w-1.5 h-6 rounded-sm ${bar.active ? 'bg-emerald-500' : 'bg-slate-800'}`} 
          style={{ opacity: bar.opacity }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 4. MAIN COMPONENT STRUCTURE
// ==========================================

export default function About() {
  const containerRef = useRef(null);
  const mouse = useMousePosition();
  
  // Parallax Calculation
  const parallaxStyle = useMemo(() => {
    if (typeof window === 'undefined') return {};
    const x = (mouse.x - window.innerWidth / 2) / 80;
    const y = (mouse.y - window.innerHeight / 2) / 80;
    return { transform: `translate(${x}px, ${y}px)` };
  }, [mouse]);

  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-12 font-sans overflow-hidden">
      
      {/* --- GLOBAL STYLES & ANIMATIONS --- */}
      <style>{`
        @keyframes float-slow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px, -50px); } }
        @keyframes float-delayed { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px, 30px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 18s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        
        .glass-panel {
          background: rgba(10, 10, 15, 0.5);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.9);
        }
        
        /* Custom Scrollbar Hide */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <NebulaBackground />
      <FireflyParticles />

      {/* --- MAIN PARALLAX CONTAINER --- */}
      <div 
        ref={containerRef}
        style={parallaxStyle}
        className="relative z-10 w-full max-w-350 glass-panel rounded-4xl p-1 overflow-hidden transition-transform duration-200 ease-out"
      >
        <div className="bg-[#050508]/40 rounded-[28px] w-full h-full p-6 md:p-12 overflow-y-auto max-h-[85vh] md:max-h-none scrollbar-hide">
          
          {/* --- HEADER: IDENTITY & STATUS --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-8">
            <div className="flex items-center gap-8">
              {/* Avatar Placeholder */}
              <div className="relative group cursor-default">
                 <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_40px_rgba(124,58,237,0.3)] group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
                   GK
                 </div>
                 {/* Live Status Indicator */}
                 <div className="absolute -bottom-2 -right-2 bg-[#0a0a0f] rounded-full p-1 border border-white/10">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                 </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-[10px] uppercase tracking-widest font-bold border border-white/5 hover:bg-white/10 transition-colors">
                    Available for Hire
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-widest font-bold border border-emerald-500/20">
                    System Online
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
                  Gokulakrishna <span className="text-purple-400">N.E.</span>
                </h1>
                <p className="text-xl text-slate-400 font-light max-w-2xl">
                  Certified <span className="text-cyan-300 font-medium">MERN Full Stack Developer</span> // Building Scalable Digital Ecosystems.
                </p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 flex gap-4">
               <a href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-purple-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Download Resume
               </a>
            </div>
          </div>

          {/* --- MAIN GRID LAYOUT --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* ====== LEFT COLUMN: NARRATIVE & PHILOSOPHY (7 Cols) ====== */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. The Origin Story */}
              <SpotlightCard className="p-8">
                <div className="mb-6 flex justify-between items-center">
                  <Badge text="The Origin" color="purple" icon="🚀" />
                  <span className="text-xs text-slate-500 font-mono tracking-widest">EST. 1997</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                  "I did not choose this path because it was easy. I chose it because <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">I fell in love with the craft</span>."
                </h2>
                
                <div className="space-y-5 text-slate-300 leading-7 text-sm font-light">
                  <p>
                    Transitioning from a non-CS background into high-level engineering wasn't an accident—it was an act of <strong className="text-white">Iron Discipline</strong>. While others followed a syllabus, I forged my own curriculum, obsessively mastering the MERN stack through late nights and early mornings.
                  </p>
                  <p>
                    My technical foundation is validated by certifications from <strong className="text-white">IIT-M Pravartak</strong> and <strong className="text-white">GUVI ZenClass</strong>, but my real education came from the console errors, the refactors, and the relentless pursuit of "better code."
                  </p>
                </div>
              </SpotlightCard>

              {/* 2. The Core Philosophy (Integrity, Generosity, etc.) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Integrity Card */}
                <SpotlightCard className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">Unshakable Integrity</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    I code what I say. I don't hide technical debt. If a feature isn't ready for production, I don't ship it. Transparency is my default state.
                  </p>
                </SpotlightCard>

                {/* Generosity Card */}
                <SpotlightCard className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">Radical Generosity</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Knowledge is meant to be shared. I strive to uplift my team, write clear documentation, and mentor others. A win for the team is a win for me.
                  </p>
                </SpotlightCard>

                {/* Discipline Card */}
                <SpotlightCard className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">Relentless Discipline</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Consistency is my superpower. Whether it's debugging a race condition or perfecting a CSS transition, I stay until the job is done right.
                  </p>
                </SpotlightCard>

                {/* Humanity Card */}
                <SpotlightCard className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">Humanity First</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Software is used by people. I build with empathy, ensuring accessibility and usability are never afterthoughts. Kindness is part of my code.
                  </p>
                </SpotlightCard>

              </div>

              {/* 3. Consistency/Hard Work Visualization */}
              <SpotlightCard className="p-6 border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-white font-bold text-sm">Consistency Engine</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">100% UPTIME</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Visual representation of my daily commitment to code and improvement.
                </p>
                <ConsistencyGraph />
              </SpotlightCard>

            </div>

            {/* ====== RIGHT COLUMN: TECH ARSENAL & LANGUAGES (5 Cols) ====== */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Tech Stack Bento Box */}
              <SpotlightCard className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <Badge text="The Arsenal" color="cyan" icon="⚡" />
                  <ReactAtom />
                </div>

                <div className="space-y-8">
                  {/* Frontend */}
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <SkillPill icon="⚛️" name="React.js" highlight />
                      <SkillPill icon="🎨" name="Tailwind" />
                      <SkillPill icon="⚡" name="Vite" />
                      <SkillPill icon="🎭" name="Framer" />
                    </div>
                  </div>

                  {/* Backend */}
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> Backend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <SkillPill icon="🟢" name="Node.js" highlight />
                      <SkillPill icon="🚂" name="Express" />
                      <SkillPill icon="🍃" name="MongoDB" />
                      <SkillPill icon="🔐" name="JWT" />
                    </div>
                  </div>

                  {/* DevOps */}
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> Operations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <SkillPill icon="🐙" name="Git" />
                      <SkillPill icon="☁️" name="Netlify" />
                      <SkillPill icon="🚀" name="Render" />
                      <SkillPill icon="💳" name="Stripe" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              {/* What I Deliver List */}
              <SpotlightCard className="p-8">
                <Badge text="What I Deliver" color="emerald" icon="📦" />
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <div>
                      <strong className="text-white block text-sm mb-1">Production-Ready Code</strong>
                      <span className="text-xs text-slate-400">CI/CD pipelines, secure auth, optimized assets.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="mt-1 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a78bfa]" />
                    <div>
                      <strong className="text-white block text-sm mb-1">Cinematic UI/UX</strong>
                      <span className="text-xs text-slate-400">Accessible interfaces with fluid micro-interactions.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    <div>
                      <strong className="text-white block text-sm mb-1">Real-Time Systems</strong>
                      <span className="text-xs text-slate-400">WebSockets, payment flows, and complex state.</span>
                    </div>
                  </li>
                </ul>
              </SpotlightCard>

              {/* Languages */}
              <SpotlightCard className="p-8">
                <Badge text="Languages" color="amber" icon="🗣️" />
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇮🇳</span>
                      <div>
                        <div className="text-white text-sm font-bold">Tamil</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Native</div>
                      </div>
                    </div>
                    <div className="h-1.5 w-20 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-emerald-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇬🇧</span>
                      <div>
                        <div className="text-white text-sm font-bold">English</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Fluent (Pro)</div>
                      </div>
                    </div>
                    <div className="h-1.5 w-20 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-blue-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇮🇳</span>
                      <div>
                        <div className="text-white text-sm font-bold">Hindi</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Basic</div>
                      </div>
                    </div>
                    <div className="h-1.5 w-20 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[60%] bg-amber-400" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>

            </div>
          </div>

          {/* --- FOOTER: CINEMATIC TICKER --- */}
          <div className="mt-16 pt-8 border-t border-white/5 relative overflow-hidden">
             <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#07070a] to-transparent z-10" />
             <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#07070a] to-transparent z-10" />
             
             <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap gap-16 text-[10px] font-mono text-slate-600 font-bold uppercase tracking-[0.2em] select-none">
               <span>React.js v18</span> <span className="text-purple-500">//</span>
               <span>Node.js Runtime</span> <span className="text-purple-500">//</span>
               <span>MongoDB Atlas</span> <span className="text-purple-500">//</span>
               <span>Express Middleware</span> <span className="text-purple-500">//</span>
               <span>Redux Toolkit</span> <span className="text-purple-500">//</span>
               <span>Tailwind CSS</span> <span className="text-purple-500">//</span>
               <span>Clean Architecture</span> <span className="text-purple-500">//</span>
               <span>System Design</span> <span className="text-purple-500">//</span>
               <span>Workflow Discipline</span> <span className="text-purple-500">//</span>
               <span>Generosity</span> <span className="text-purple-500">//</span>
               <span>Bravery</span> <span className="text-purple-500">//</span>
               <span>Documentation Precision</span> <span className="text-purple-500">//</span>
               <span>MERN Certified</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}