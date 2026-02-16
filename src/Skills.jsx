import React, { useEffect, useRef, useState } from "react";

/**
 * Ultra Enhanced Skills Section
 * Replaced percentages with technical details
 */

export default function Skills() {
  const skills = [
    // Frontend
    { 
      name: "⚛️ React.js", 
      color: "var(--c-cyan)", 
      category: "Frontend", 
      details: "Component lifecycle, Custom Hooks, Context API, and Virtual DOM optimization." 
    },
    { 
      name: "🌐 HTML5", 
      color: "var(--c-orange)", 
      category: "Frontend", 
      details: "Semantic structure, WAI-ARIA accessibility standards, and SEO best practices." 
    },
    { 
      name: "🎨 CSS3", 
      color: "var(--c-blue)", 
      category: "Frontend", 
      details: "Advanced animations, Flexbox/Grid layouts, and responsive media queries." 
    },
    { 
      name: "💎 Tailwind CSS", 
      color: "var(--c-cyan-soft)", 
      category: "Frontend", 
      details: "Utility-first architecture, Design systems, and Dark mode configuration." 
    },
    { 
      name: "✨ JavaScript", 
      color: "var(--c-yellow)", 
      category: "Frontend", 
      details: "ES6+ syntax, Async/Await patterns, DOM manipulation, and functional programming." 
    },

    // Backend
    { 
      name: "🌱 Node.js", 
      color: "var(--c-pink)", 
      category: "Backend", 
      details: "Event-driven architecture, Buffer/Streams, and scalable server-side logic." 
    },
    { 
      name: "🚀 Express.js", 
      color: "var(--c-purple)", 
      category: "Backend", 
      details: "Middleware integration, RESTful API routing, and secure authentication flows." 
    },
    { 
      name: "🍃 MongoDB", 
      color: "var(--c-green)", 
      category: "Backend", 
      details: "NoSQL schema design, Aggregation pipelines, and Atlas cloud management." 
    },
    { 
      name: "🗄️ MySQL", 
      color: "var(--c-indigo)", 
      category: "Backend", 
      details: "Relational database normalization, Complex joins, and ACID transactions." 
    },

    // Tools
    { 
      name: "🐙 Git/GitHub", 
      color: "var(--c-gray)", 
      category: "Tools", 
      details: "Version control branching strategies, Merge conflict resolution, and PR workflows." 
    },
    { 
      name: "🔗 Netlify", 
      color: "var(--c-green-soft)", 
      category: "Tools", 
      details: "Continuous deployment (CI/CD), Serverless functions, and Domain management." 
    },
    { 
      name: "☁️ Render", 
      color: "var(--c-pink-soft)", 
      category: "Tools", 
      details: "Cloud hosting services, Docker containerization, and Auto-scaling infrastructure." 
    },
    { 
      name: "▲ Vercel", 
      color: "var(--c-white)", 
      category: "Tools", 
      details: "Zero-config deployments, Edge middleware, and Next.js ISR/SSR optimization." 
    },
  ];

  const categories = ["Frontend", "Backend", "Tools"];
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const parallaxRef = useRef(null);
  const particleRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const cssVars = {
    "--c-cyan": "#22d3ee",
    "--c-cyan-soft": "#7dd3fc",
    "--c-orange": "#fb923c",
    "--c-blue": "#60a5fa",
    "--c-yellow": "#facc15",
    "--c-pink": "#fb7185",
    "--c-purple": "#a78bfa",
    "--c-green": "#34d399",
    "--c-indigo": "#818cf8",
    "--c-gray": "#cbd5e1",
    "--c-green-soft": "#86efac",
    "--c-pink-soft": "#fbcfe8",
    "--c-white": "#ffffff", // Added for Vercel
  };

  const particleCount = typeof window !== "undefined" && window.innerWidth < 640 ? 30 : 60;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const r = Math.abs(Math.sin(i * 12.9898 + 78.233));
    const top = Math.round((r * 10000) % 100);
    const left = Math.round((r * 10000 * 7) % 100);
    const delay = (r * 8).toFixed(2);
    const size = 1 + Math.round((r * 4));
    return { top, left, delay, size, key: `p-${i}` };
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    const el = document.getElementById("skills");
    if (el) observer.observe(el);

    if (!prefersReducedMotion) {
      const handleMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(${dx * -10}px, ${dy * -6}px, 0)`;
        }
        if (particleRef.current) {
          particleRef.current.style.transform = `translate3d(${dx * -4}px, ${dy * -3}px, 0)`;
        }
      };
      window.addEventListener("mousemove", handleMove, { passive: true });
      return () => {
        mq.removeEventListener?.("change", onChange);
        window.removeEventListener("mousemove", handleMove);
        observer.disconnect();
      };
    }

    return () => {
      mq.removeEventListener?.("change", onChange);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const handleCardMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section
      id="skills"
      className="relative p-12 overflow-hidden"
      style={{
        color: "var(--c-cyan)",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        ...cssVars,
      }}
      aria-labelledby="skills-heading"
    >
      <style>{`
        /* Enhanced Background */
        #skills { 
          background: linear-gradient(180deg, #082038 0%, #0b1020 30%, #2b0b3a 100%); 
          border-bottom: 2px solid rgba(236,72,153,0.18); 
        }
        
        .skills-sheen {
          position: absolute; inset: -20%; pointer-events: none; mix-blend-mode: overlay;
          background: radial-gradient(800px 300px at 10% 20%, rgba(34,211,238,0.12), transparent 20%),
                      radial-gradient(600px 200px at 90% 80%, rgba(236,72,153,0.08), transparent 20%);
          filter: blur(40px); animation: sheenMove 15s linear infinite;
        }
        @keyframes sheenMove { 
          0% { transform: translateX(-8%) rotate(0deg); } 
          50% { transform: translateX(8%) rotate(5deg); } 
          100% { transform: translateX(-8%) rotate(0deg); } 
        }

        /* Morphing Blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: morphBlob 12s ease-in-out infinite, float 15s ease-in-out infinite;
        }
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }

        /* Enhanced Particles */
        .skill-particle { 
          position: absolute; 
          border-radius: 9999px; 
          filter: blur(1px); 
        }
        @keyframes floatY { 
          0% { transform: translateY(0) scale(1); opacity: 0.8; } 
          50% { transform: translateY(-20px) scale(1.3); opacity: 1; } 
          100% { transform: translateY(0) scale(1); opacity: 0.8; } 
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }

        /* Ultra Card with 3D Transform */
        .skill-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          border: 1px solid rgba(236,72,153,0.1);
          border-radius: 20px; 
          padding: 24px; 
          position: relative; 
          overflow: hidden;
          box-shadow: 0 20px 70px rgba(2,6,23,0.7); 
          transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
        
        /* Magnetic Glow Effect */
        .skill-card::before {
          content: ""; 
          position: absolute; 
          inset: -2px; 
          opacity: 0;
          background: radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(34,211,238,0.15), 
            rgba(236,72,153,0.1) 40%, 
            transparent 70%);
          border-radius: inherit;
          z-index: 0;
          transition: opacity 400ms ease;
          filter: blur(20px);
        }
        
        .skill-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: translateX(-100%) rotate(45deg);
          transition: transform 0.6s ease;
        }
        
        .skill-card:hover::after {
          transform: translateX(200%) rotate(45deg);
        }
        
        .skill-card:focus-within::before, 
        .skill-card:hover::before { 
          opacity: 1; 
        }
        
        .skill-card:focus-within, 
        .skill-card:hover { 
          transform: translateY(-12px) scale(1.03) rotateX(2deg); 
          box-shadow: 0 35px 100px rgba(2,6,23,0.8), 
                      0 0 60px rgba(34,211,238,0.15),
                      0 0 100px rgba(236,72,153,0.1); 
          border-color: rgba(34,211,238,0.3);
        }

        /* Orbiting Particles around card */
        .orbit-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        
        .orbit-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #22d3ee, #ec4899);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          animation: orbit 6s linear infinite;
          opacity: 0;
        }
        
        .skill-card:hover .orbit-particle {
          opacity: 1;
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        /* Neon Text with Glow */
        .neon-text { 
          text-shadow: 0 6px 20px rgba(124,58,237,0.08); 
          font-weight: 700; 
          transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-block;
          position: relative;
        }
        
        .neon-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          filter: blur(15px);
          opacity: 0;
          transition: opacity 400ms ease;
        }
        
        .skill-card:hover .neon-text {
          text-shadow: 0 0 25px currentColor, 0 0 50px currentColor, 0 0 75px currentColor;
          transform: translateX(3px) scale(1.05);
        }
        
        .skill-card:hover .neon-text::after {
          opacity: 0.6;
        }

        /* Reveal Animations */
        .reveal-up { 
          transform: translateY(30px); 
          opacity: 0; 
          transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 700ms; 
        }
        .reveal-up.visible { 
          transform: translateY(0); 
          opacity: 1; 
        }

        /* Category Header Animation */
        .category-header {
          position: relative;
          display: inline-block;
        }
        
        .category-header::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--c-cyan), var(--c-pink), var(--c-yellow));
          border-radius: 9999px;
          transform: scaleX(0);
          transition: transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .reveal-up.visible .category-header::after {
          transform: scaleX(1);
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { 
            animation: none !important; 
            transition: none !important; 
          }
        }

        @media (max-width: 640px) {
          .skill-card { padding: 18px; }
        }
      `}</style>

      {/* Enhanced Sheen */}
      <div className="skills-sheen" aria-hidden="true" />

      {/* Morphing Blobs */}
      <div className="blob absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10" aria-hidden="true" />
      <div className="blob absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '3s' }} aria-hidden="true" />
      <div className="blob absolute top-1/2 right-1/3 w-72 h-72 bg-purple-500/8" style={{ animationDelay: '6s' }} aria-hidden="true" />

      {/* Cursor Glow */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08), transparent)',
          filter: 'blur(60px)',
          zIndex: 1
        }}
        aria-hidden="true"
      />

      {/* Enhanced Particles */}
      <div ref={particleRef} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
        {particles.map((p, i) => (
          <div
            key={p.key}
            className="skill-particle"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: i % 3 === 0 ? 'rgba(34,211,238,0.3)' : i % 3 === 1 ? 'rgba(236,72,153,0.3)' : 'rgba(124,58,237,0.3)',
              animation: prefersReducedMotion ? "none" : `floatY ${6 + (p.size % 3)}s ease-in-out ${p.delay}s infinite, twinkle ${3 + (p.size % 2)}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Heading */}
      <div className="text-center mb-8" style={{ position: 'relative', zIndex: 10 }}>
        <h2 id="skills-heading" className="text-5xl md:text-6xl font-extrabold mb-6" style={{ 
          color: "transparent", 
          background: "linear-gradient(90deg,var(--c-cyan),var(--c-pink),var(--c-yellow))", 
          WebkitBackgroundClip: "text", 
          backgroundClip: "text",
          textShadow: '0 0 40px rgba(34,211,238,0.3)',
          position: 'relative'
        }}>
          🛠 My Skills 🛠
          <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)', filter: 'blur(40px)', zIndex: -1 }} />
        </h2>

        <div style={{ 
          width: 150, 
          height: 4, 
          margin: '0 auto 24px', 
          background: "linear-gradient(90deg,var(--c-cyan),var(--c-pink),var(--c-yellow))", 
          borderRadius: 9999,
          boxShadow: '0 0 30px rgba(34,211,238,0.5)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'inherit', filter: 'blur(10px)', borderRadius: 'inherit' }} />
        </div>

        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "rgba(125,211,252,0.95)" }}>
          I build full stack web applications with <span style={{ color: 'var(--c-cyan)', fontWeight: 700 }}>modern tooling</span>, <span style={{ color: 'var(--c-pink)', fontWeight: 700 }}>clean architecture</span>, and <span style={{ color: 'var(--c-yellow)', fontWeight: 700 }}>cinematic UI</span>.
        </p>
      </div>

      {/* Parallax Cards Container */}
      <div ref={parallaxRef} style={{ position: "relative", zIndex: 10 }}>
        <div className="space-y-16 max-w-7xl mx-auto">
          {categories.map((category, catIdx) => (
            <div key={category} className={`reveal-up ${visible ? "visible" : ""}`} style={{ transitionDelay: `${catIdx * 150}ms` }}>
              <div className="text-center mb-8">
                <h3 className="category-header text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--c-pink)" }}>
                  {category} Technologies
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, idx) => {
                    const globalIndex = catIdx * 8 + idx;
                    return (
                      <div
                        key={skill.name}
                        className="skill-card"
                        tabIndex={0}
                        role="group"
                        aria-label={`${skill.name} skill card`}
                        style={{ minHeight: 180 }}
                        onMouseMove={handleCardMouseMove}
                        onMouseEnter={() => setHoveredCard(globalIndex)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {/* Orbiting Particles */}
                        {hoveredCard === globalIndex && (
                          <div className="orbit-container">
                            <div className="orbit-particle" style={{ animationDelay: '0s' }} />
                            <div className="orbit-particle" style={{ animationDelay: '1s' }} />
                            <div className="orbit-particle" style={{ animationDelay: '2s' }} />
                            <div className="orbit-particle" style={{ animationDelay: '3s' }} />
                          </div>
                        )}

                        {/* Aurora Glow */}
                        <div style={{ 
                          position: "absolute", 
                          inset: 0, 
                          opacity: 0.08, 
                          background: "radial-gradient(circle at 15% 15%, rgba(34,211,238,0.15), transparent 30%), radial-gradient(circle at 85% 85%, rgba(236,72,153,0.12), transparent 30%)", 
                          filter: "blur(30px)", 
                          pointerEvents: "none",
                          zIndex: 0
                        }} />

                        {/* Content */}
                        <div style={{ position: "relative", zIndex: 2 }}>
                          <p className="neon-text" data-text={skill.name} style={{ color: skill.color, fontSize: 20, marginBottom: 4, fontWeight: 800 }}>
                            {skill.name}
                          </p>
                          <p style={{ color: "rgba(125,211,252,0.9)", fontSize: 13, marginBottom: 12, fontWeight: 500, letterSpacing: '0.02em', textTransform: 'uppercase', opacity: 0.8 }}>
                            Production Ready
                          </p>

                          {/* Technical Details (Replacing Progress Bar) */}
                          <div className="pt-3 border-t border-white/5">
                            <p style={{ 
                                color: "rgba(226, 232, 240, 0.85)", 
                                fontSize: 14, 
                                lineHeight: '1.6',
                                fontWeight: 400
                              }}>
                              {skill.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
