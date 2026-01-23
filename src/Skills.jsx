import React, { useEffect, useRef, useState } from "react";

/**
 * Skills.jsx
 * - Upgraded, self-contained cinematic Skills section
 * - Embedded styles and animations (no external CSS required)
 * - Features: animated gradient background, parallax particle layer, interactive progress bars,
 *   animated radial highlights, tooltip micro-interactions, accessible reduced-motion support,
 *   keyboard focus states, and responsive layout.
 * - Enhanced with magnetic glow effects, neon animations, and pulsing badges
 *
 * Replace your existing Skills.jsx with this file.
 */

export default function Skills() {
  const skills = [
    { name: "⚛️ React.js", color: "var(--c-cyan)", category: "Frontend", percent: 90 },
    { name: "🌐 HTML5", color: "var(--c-orange)", category: "Frontend", percent: 95 },
    { name: "🎨 CSS3", color: "var(--c-blue)", category: "Frontend", percent: 90 },
    { name: "💎 Tailwind CSS", color: "var(--c-cyan-soft)", category: "Frontend", percent: 80 },
    { name: "✨ JavaScript", color: "var(--c-yellow)", category: "Frontend", percent: 90 },

    { name: "🌱 Node.js", color: "var(--c-pink)", category: "Backend", percent: 80 },
    { name: "🚀 Express.js", color: "var(--c-purple)", category: "Backend", percent: 80 },
    { name: "🍃 MongoDB", color: "var(--c-green)", category: "Backend", percent: 75 },
    { name: "🗄️ MySQL", color: "var(--c-indigo)", category: "Backend", percent: 75 },

    { name: "🐙 Git/GitHub", color: "var(--c-gray)", category: "Tools", percent: 90 },
    { name: "🔗 Netlify", color: "var(--c-green-soft)", category: "Tools", percent: 80 },
    { name: "☁️ Render", color: "var(--c-pink-soft)", category: "Tools", percent: 80 },
  ];

  const categories = ["Frontend", "Backend", "Tools"];
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const parallaxRef = useRef(null);
  const particleRef = useRef(null);
  const progressRefs = useRef([]);
  const [visible, setVisible] = useState(false);

  // CSS variables for colors
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
  };

  // Particle generation
  const particleCount = typeof window !== "undefined" && window.innerWidth < 640 ? 18 : 36;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const r = Math.abs(Math.sin(i * 12.9898 + 78.233));
    const top = Math.round((r * 10000) % 100);
    const left = Math.round((r * 10000 * 7) % 100);
    const delay = (r * 8).toFixed(2);
    const size = 1 + Math.round((r * 3));
    return { top, left, delay, size, key: `p-${i}` };
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);

    // reveal animations when section enters viewport
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

    // parallax mouse movement for subtle depth
    if (!prefersReducedMotion) {
      const handleMove = (e) => {
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

  // Animate progress bars when visible
  useEffect(() => {
    if (!visible || prefersReducedMotion) return;
    progressRefs.current.forEach((el, idx) => {
      if (!el) return;
      const target = Number(el.getAttribute("data-target")) || 0;
      el.style.width = "0%";
      // smooth incremental animation
      let start = 0;
      const step = () => {
        start += Math.max(1, Math.round(target / 24));
        if (start >= target) {
          el.style.width = `${target}%`;
        } else {
          el.style.width = `${start}%`;
          requestAnimationFrame(step);
        }
      };
      // stagger
      setTimeout(() => requestAnimationFrame(step), idx * 80);
    });
  }, [visible, prefersReducedMotion]);

  // Track mouse position for magnetic glow effect
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
      {/* Scoped styles */}
      <style>{`
        /* Core background and glow */
        #skills { background: linear-gradient(180deg, #082038 11%, #0b1020 30%, #2b0b3a 100%); border-bottom: 2px solid rgba(236,72,153,0.18); }
        .skills-sheen {
          position: absolute; inset: -20%; pointer-events: none; mix-blend-mode: overlay;
          background: radial-gradient(600px 200px at 10% 20%, rgba(34,211,238,0.06), transparent 10%),
                      radial-gradient(400px 140px at 90% 80%, rgba(236,72,153,0.04), transparent 10%);
          filter: blur(28px); animation: sheenMove 12s linear infinite;
        }
        @keyframes sheenMove { 0% { transform: translateX(-6%); } 50% { transform: translateX(6%); } 100% { transform: translateX(-6%); } }

        /* Particle */
        .skill-particle { position: absolute; border-radius: 9999px; background: rgba(236,72,153,0.12); filter: blur(0.6px); }
        @keyframes floatY { 0% { transform: translateY(0); opacity: 0.95 } 50% { transform: translateY(-10px); opacity: 0.6 } 100% { transform: translateY(0); opacity: 0.95 } }

        /* Card */
        .skill-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(236,72,153,0.06);
          border-radius: 14px; padding: 20px; position: relative; overflow: hidden;
          box-shadow: 0 18px 60px rgba(2,6,23,0.6); 
          transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms, border-color 260ms;
        }
        .skill-card::before {
          content: ""; position: absolute; inset: 0; opacity: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.08), transparent 60%);
          transition: opacity 300ms ease;
        }
        .skill-card:focus-within::before, .skill-card:hover::before { opacity: 1; }
        .skill-card:focus-within, .skill-card:hover { 
          transform: translateY(-8px) scale(1.02); 
          box-shadow: 0 30px 80px rgba(2,6,23,0.72), 0 0 40px rgba(34,211,238,0.06); 
          border-color: rgba(34,211,238,0.2);
        }

        /* Neon text */
        .neon-text { 
          text-shadow: 0 6px 18px rgba(124,58,237,0.06); 
          font-weight: 700; 
          transition: text-shadow 300ms ease, transform 300ms ease;
          display: inline-block;
        }
        .skill-card:hover .neon-text {
          text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
          transform: translateX(2px);
        }

        /* Progress bar container */
        .progress-track { 
          background: rgba(15,23,42,0.6); 
          height: 10px; 
          border-radius: 9999px; 
          overflow: hidden; 
          position: relative;
        }
        .progress-track::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          animation: trackPulse 3s ease-in-out infinite;
        }
        @keyframes trackPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        
        .progress-fill {
          height: 100%; border-radius: 9999px; width: 0%; 
          transition: width 900ms cubic-bezier(.2,.9,.2,1);
          box-shadow: 0 8px 30px rgba(99,102,241,0.08), inset 0 -2px 8px rgba(0,0,0,0.12);
          position: relative;
        }
        .skill-card:hover .progress-fill {
          box-shadow: 0 8px 40px rgba(99,102,241,0.15), inset 0 -2px 8px rgba(0,0,0,0.12);
        }

        /* Tooltip */
        .skill-tooltip {
          position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(6px);
          background: rgba(2,6,23,0.9); color: #f8fafc; padding: 8px 10px; border-radius: 8px; font-size: 13px;
          opacity: 0; pointer-events: none; transition: opacity 180ms ease, transform 180ms ease;
          box-shadow: 0 8px 30px rgba(2,6,23,0.6);
          white-space: nowrap;
        }
        .skill-card:focus-within .skill-tooltip, .skill-card:hover .skill-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }

        /* small shimmer on fill */
        .progress-fill::after {
          content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.0));
          mix-blend-mode: overlay; transform: translateX(-40%); animation: shimmer 2.2s linear infinite;
        }
        @keyframes shimmer { 0% { transform: translateX(-40%); } 100% { transform: translateX(140%); } }

        /* reveal animations */
        .reveal-up { transform: translateY(18px); opacity: 0; transition: transform 520ms cubic-bezier(.2,.9,.2,1), opacity 520ms; }
        .reveal-up.visible { transform: translateY(0); opacity: 1; }

        /* Skill badge animation */
        .skill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          background: linear-gradient(90deg, rgba(34,211,238,0.08), rgba(236,72,153,0.08));
          border: 1px solid rgba(34,211,238,0.15);
          position: relative;
          overflow: hidden;
        }
        .skill-badge::before {
          content: ""; position: absolute; left: -100%; top: 0; bottom: 0; width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: badgeShine 2.5s ease-in-out infinite;
        }
        @keyframes badgeShine { 0%, 100% { left: -100%; } 50% { left: 200%; } }
        
        .skill-card:hover .skill-badge {
          background: linear-gradient(90deg, rgba(34,211,238,0.12), rgba(236,72,153,0.12));
          border-color: rgba(34,211,238,0.25);
        }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .skills-sheen, .skill-particle, .progress-fill::after, .reveal-up, .skill-badge::before, .progress-track::before { 
            animation: none !important; transition: none !important; transform: none !important; opacity: 1 !important; 
          }
        }

        /* responsive tweaks */
        @media (max-width: 640px) {
          .skill-card { padding: 14px; }
        }
      `}</style>

      {/* Sheen layer */}
      <div className="skills-sheen" aria-hidden="true" />

      {/* Particles layer (parallax) */}
      <div ref={particleRef} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {particles.map((p, i) => (
          <div
            key={p.key}
            className="skill-particle"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: prefersReducedMotion ? "none" : `floatY ${6 + (p.size % 3)}s ease-in-out ${p.delay}s infinite`,
              opacity: 0.08 + (p.size % 2) * 0.06,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <h2 id="skills-heading" className="text-4xl font-extrabold text-center mb-4" style={{ color: "transparent", background: "linear-gradient(90deg,var(--c-cyan),var(--c-pink),var(--c-yellow))", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
        🛠 My Skills 🛠
      </h2>

      <div className="w-32 h-1 mx-auto mb-6" style={{ background: "linear-gradient(90deg,var(--c-cyan),var(--c-pink),var(--c-yellow))", borderRadius: 9999 }} />

      <p className="text-center text-lg max-w-3xl mx-auto mb-10" style={{ color: "rgba(125,211,252,0.9)" }}>
        I build full stack web applications with modern tooling, clean architecture, and cinematic UI. Below are the technologies I use in production projects, grouped by role.
      </p>

      {/* Parallax container for cards */}
      <div ref={parallaxRef} style={{ position: "relative", zIndex: 10 }}>
        <div className="space-y-12 max-w-6xl mx-auto">
          {categories.map((category, catIdx) => (
            <div key={category} className={`reveal-up ${visible ? "visible" : ""}`} style={{ transitionDelay: `${catIdx * 120}ms` }}>
              <h3 className="text-2xl font-bold text-center mb-2" style={{ color: "var(--c-pink)" }}>
                {category} Technologies
              </h3>
              <p className="text-center text-sm mb-6" style={{ color: "rgba(125,211,252,0.8)" }}>
                {category === "Frontend" &&
                  "Responsive UI, state management, accessibility, and performance."}
                {category === "Backend" &&
                  "REST APIs, authentication, database design, and server-side logic."}
                {category === "Tools" &&
                  "Version control, CI/CD, and deployment platforms used in production."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                        style={{ minHeight: 140 }}
                        onMouseMove={handleCardMouseMove}
                      >
                        {/* Tooltip */}
                        <div className="skill-tooltip" role="status" aria-hidden="true">
                          {skill.percent}% proficiency — used across live projects
                        </div>

                        {/* Aurora glow background */}
                        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "radial-gradient(circle at 10% 10%, rgba(34,211,238,0.06), transparent 10%), radial-gradient(circle at 90% 90%, rgba(236,72,153,0.04), transparent 10%)", filter: "blur(18px)", pointerEvents: "none" }} />

                        {/* Content */}
                        <div style={{ position: "relative", zIndex: 2 }}>
                          <p className="neon-text" style={{ color: skill.color, fontSize: 18, marginBottom: 6 }}>
                            {skill.name}
                          </p>
                          <p style={{ color: "rgba(125,211,252,0.85)", fontSize: 13, marginBottom: 12 }}>Applied in projects</p>

                          {/* Progress */}
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ flex: 1 }}>
                              <div className="progress-track" aria-hidden="true">
                                <div
                                  ref={(el) => (progressRefs.current[globalIndex] = el)}
                                  className="progress-fill"
                                  data-target={skill.percent}
                                  style={{
                                    background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.06))`,
                                    position: "relative",
                                  }}
                                />
                              </div>
                            </div>

                            <div style={{ minWidth: 48, textAlign: "right", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
                              {skill.percent}%
                            </div>
                          </div>

                          {/* Animated skill badge */}
                          <div className="skill-badge" style={{ marginTop: 12 }}>
                            <span style={{ fontSize: 11, color: "rgba(125,211,252,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2 }}>
                              Production Ready
                            </span>
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

      {/* Footer prompt */}
      <p className="mt-12 text-center text-sm" style={{ color: "rgba(125,211,252,0.85)" }}>
        ⬇️ Scroll down to explore my Projects...
      </p>
    </section>
  );
}