import React, { useEffect, useRef, useState } from "react";

/**
 * About.jsx
 * - Single-file, production-ready About section with cinematic UI/UX
 * - Self-contained styles (scoped via <style> tag) so you can paste directly into src/About.jsx
 * - Features: layered parallax, glass card, neon headings, typewriter intro, animated skill chips,
 *   reduced-motion support, accessible focus states, and subtle particle depth
 * - Enhanced with magnetic effects, gradient animations, and advanced micro-interactions
 *
 * Replace your existing About.jsx with this file.
 */

export default function About() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [typedIntro, setTypedIntro] = useState("");
  const introFull =
    "👋 Hi — I'm Gokulakrishna N.E, a Certified MERN Full Stack Developer focused on scalable, accessible, and cinematic web experiences.";
  const parallaxRef = useRef(null);
  const cardRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Typewriter intro (respects reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedIntro(introFull);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      setTypedIntro(introFull.slice(0, i + 1));
      i++;
      if (i >= introFull.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [prefersReducedMotion]);

  // Parallax subtle movement for background layers and card tilt
  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${dx * -8}px, ${dy * -6}px, 0)`;
      }
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(900px) rotateX(${(-dy * 4).toFixed(
          2
        )}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
      }
      
      // Update cursor position for gradient tracking
      setCursorPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  const languages = [
    { code: "Tamil", flag: "🇮🇳", note: "Mother tongue" },
    { code: "English", flag: "🇬🇧", note: "Fluent (academic & professional)" },
    { code: "Hindi", flag: "🇮🇳", note: "Basic conversational" },
  ];

  const skills = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Git/GitHub",
    "Netlify / Render",
  ];

  return (
    <section
      id="about"
      className="relative p-12 overflow-hidden"
      aria-labelledby="about-heading"
      style={{
        '--cursor-x': `${cursorPos.x}%`,
        '--cursor-y': `${cursorPos.y}%`,
      }}
    >
      {/* Scoped styles for cinematic effects */}
      <style>{`
        /* Background layers */
        .about-sky {
          background: radial-gradient(circle at 10% 20%, rgba(0,255,255,0.06), transparent 8%),
                      radial-gradient(circle at 90% 80%, rgba(127,0,255,0.06), transparent 8%),
                      linear-gradient(180deg, #082038 11%, #0b1224 40%, #2c2f54 100%);
          transition: transform 300ms ease;
          position: relative;
        }
        
        .about-sky::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(34,211,238,0.03), transparent 40%);
          opacity: 0;
          transition: opacity 400ms ease;
        }
        
        #about:hover .about-sky::before {
          opacity: 1;
        }

        .glow-orb {
          width: 420px;
          height: 420px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(0,255,255,0.12) 0%, rgba(127,0,255,0.06) 30%, transparent 60%);
          filter: blur(36px);
          opacity: 0.22;
          will-change: transform, opacity;
          animation: orbPulse 8s ease-in-out infinite;
        }
        
        @keyframes orbPulse {
          0%, 100% { transform: scale(1) translate3d(0,0,0); opacity: 0.22; }
          50% { transform: scale(1.1) translate3d(10px, -10px, 0); opacity: 0.28; }
        }

        .neon-heading {
          background: linear-gradient(90deg, #7dd3fc 0%, #c084fc 50%, #7dd3fc 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 8px 30px rgba(124,58,237,0.06);
          animation: neonPulse 2.6s ease-in-out infinite, gradientShift 4s ease infinite;
        }
        
        @keyframes neonPulse {
          0% { text-shadow: 0 6px 18px rgba(124,58,237,0.04); transform: translateY(0); }
          50% { text-shadow: 0 18px 48px rgba(124,58,237,0.14); transform: translateY(-2px); }
          100% { text-shadow: 0 6px 18px rgba(124,58,237,0.04); transform: translateY(0); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          backdrop-filter: blur(8px) saturate(120%);
          -webkit-backdrop-filter: blur(8px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 14px;
          box-shadow: 0 18px 60px rgba(2,6,23,0.6);
          transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms, border-color 260ms;
          position: relative;
          overflow: hidden;
        }
        
        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(125,211,252,0.05), transparent 50%);
          opacity: 0;
          transition: opacity 400ms ease;
        }
        
        .glass-card:hover {
          box-shadow: 0 30px 80px rgba(2,6,23,0.75), 0 0 60px rgba(34,211,238,0.08);
          border-color: rgba(34,211,238,0.15);
        }
        
        .glass-card:hover::before {
          opacity: 1;
        }

        .skill-chip {
          background: linear-gradient(135deg, rgba(125,211,252,0.08), rgba(192,132,252,0.06));
          border: 1px solid rgba(125,211,252,0.1);
          padding: 8px 14px;
          border-radius: 9999px;
          font-weight: 600;
          color: #c7f9ff;
          box-shadow: 0 6px 18px rgba(2,6,23,0.45);
          transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms ease, background 220ms ease, border-color 220ms ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .skill-chip::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 400ms ease;
        }
        
        .skill-chip:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 22px 60px rgba(2,6,23,0.6), 0 0 30px rgba(125,211,252,0.15);
          background: linear-gradient(135deg, rgba(125,211,252,0.12), rgba(192,132,252,0.1));
          border-color: rgba(125,211,252,0.2);
        }
        
        .skill-chip:hover::before {
          left: 100%;
        }

        /* particles */
        .about-particle {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(0,255,255,0.12);
          filter: blur(0.6px);
          animation: floatY 8s ease-in-out infinite;
          position: absolute;
        }
        
        @keyframes floatY {
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(0) scale(1); opacity: 0.9; }
        }
        
        .divider-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #22d3ee, #a78bfa, #22d3ee, transparent);
          background-size: 200% auto;
          animation: dividerFlow 3s linear infinite;
        }
        
        @keyframes dividerFlow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        .info-box {
          background: linear-gradient(135deg, rgba(15,23,42,0.7), rgba(30,27,75,0.6));
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 12px;
          padding: 16px;
          transition: transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease;
          position: relative;
          overflow: hidden;
        }
        
        .info-box::after {
          content: "";
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(125,211,252,0.08), transparent 70%);
          opacity: 0;
          transition: opacity 300ms ease;
        }
        
        .info-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(2,6,23,0.6), 0 0 30px rgba(167,139,250,0.1);
          border-color: rgba(167,139,250,0.3);
        }
        
        .info-box:hover::after {
          opacity: 1;
        }
        
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: transform 200ms cubic-bezier(.2,.9,.2,1), box-shadow 200ms ease;
        }
        
        .cta-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transform: translate(-50%, -50%);
          transition: width 600ms ease, height 600ms ease;
        }
        
        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .cta-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
        
        .language-item {
          transition: transform 200ms ease, color 200ms ease;
          cursor: default;
        }
        
        .language-item:hover {
          transform: translateX(4px);
          color: #7dd3fc !important;
        }
        
        .typewriter-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #c084fc;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        /* Animated text reveal */
        .text-reveal {
          opacity: 0;
          transform: translateY(10px);
          animation: textReveal 0.8s ease forwards;
        }
        
        @keyframes textReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Staggered animation delays */
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        
        /* Floating labels */
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: linear-gradient(135deg, rgba(34,211,238,0.1), rgba(167,139,250,0.1));
          border: 1px solid rgba(125,211,252,0.2);
          border-radius: 20px;
          font-size: 0.85em;
          font-weight: 600;
          color: #7dd3fc;
          margin-bottom: 12px;
          animation: labelFloat 3s ease-in-out infinite;
        }
        
        @keyframes labelFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        /* Enhanced list items with slide-in */
        .feature-item {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideInLeft 0.6s ease forwards;
        }
        
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Glow pulse effect */
        .glow-pulse {
          position: relative;
        }
        
        .glow-pulse::after {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #22d3ee, #a78bfa, #22d3ee);
          background-size: 300% 300%;
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          filter: blur(8px);
          animation: glowPulseAnim 3s ease infinite;
        }
        
        @keyframes glowPulseAnim {
          0%, 100% { opacity: 0; background-position: 0% 50%; }
          50% { opacity: 0.4; background-position: 100% 50%; }
        }
        
        /* Magnetic button effect */
        .magnetic-btn {
          transition: transform 200ms cubic-bezier(.2,.9,.2,1);
        }
        
        .magnetic-btn:hover {
          animation: magneticShake 0.5s ease;
        }
        
        @keyframes magneticShake {
          0%, 100% { transform: translateY(-2px) scale(1.02); }
          25% { transform: translateY(-2px) scale(1.02) rotate(1deg); }
          75% { transform: translateY(-2px) scale(1.02) rotate(-1deg); }
        }
        
        /* Paragraph highlight effect */
        .highlight-text {
          position: relative;
          transition: color 300ms ease;
        }
        
        .highlight-text::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #22d3ee, #a78bfa);
          transition: width 300ms ease;
        }
        
        .highlight-text:hover {
          color: #7dd3fc !important;
        }
        
        .highlight-text:hover::after {
          width: 100%;
        }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .neon-heading, .glass-card, .skill-chip, .about-particle, .glow-orb, 
          .divider-line, .typewriter-cursor, .skill-chip::before, .cta-button::before { 
            animation: none !important; 
            transition: none !important; 
            transform: none !important; 
          }
        }
      `}</style>

      {/* Background layers */}
      <div className="absolute inset-0 about-sky" aria-hidden="true" />
      <div
        ref={parallaxRef}
        className="absolute -left-24 -top-24 glow-orb pointer-events-none"
        aria-hidden="true"
        style={{ transform: "translate3d(0,0,0)" }}
      />

      {/* Heading */}
      <h2
        id="about-heading"
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 relative z-10 neon-heading"
      >
        🌤 About Me
      </h2>

      {/* Divider */}
      <div className="flex justify-center items-center gap-3 mb-10 relative z-10">
        <span className="text-cyan-200 text-2xl">💠</span>
        <div className="w-36 divider-line rounded-full" />
        <span className="text-cyan-200 text-2xl">💠</span>
      </div>

      {/* Main glass card */}
      <div
        ref={cardRef}
        className="relative z-20 max-w-4xl mx-auto glass-card p-10"
        role="region"
        aria-labelledby="about-heading"
      >
        {/* Animated intro (typewriter) */}
        <p className="text-cyan-200 leading-relaxed text-lg mb-6" aria-live="polite">
          <span style={{ fontWeight: 700, color: "#c4b5fd" }}>
            {typedIntro}
            {!prefersReducedMotion && typedIntro.length < introFull.length && (
              <span className="typewriter-cursor" />
            )}
          </span>
        </p>

        {/* Core paragraphs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="section-label">
              <span>👨‍💻</span>
              <span>Professional Background</span>
            </div>
            
            <p className="text-cyan-300 leading-relaxed text-base mb-4 text-reveal delay-1">
              I specialize in architecting scalable, interactive, and globally competitive web applications with a strong emphasis on{" "}
              <span className="highlight-text" style={{ color: "#c084fc", fontWeight: 700 }}>UX, performance, and accessibility</span>. My training at{" "}
              <span className="highlight-text" style={{ color: "#c084fc", fontWeight: 700 }}>IIT‑M Pravartak</span> and{" "}
              <span className="highlight-text" style={{ color: "#c084fc", fontWeight: 700 }}>GUVI ZenClass</span> shaped my approach to clean architecture and production readiness.
            </p>

            <p className="text-cyan-300 leading-relaxed text-base mb-4 text-reveal delay-2">
              I enjoy turning complex requirements into simple, maintainable code. I focus on micro‑interactions, testable APIs, and deployment pipelines that keep teams shipping confidently.
            </p>

            <div className="mt-4">
              <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
                <span>⚡</span> Core Technologies
              </h4>
              <div className="flex flex-wrap gap-3" role="list">
                {skills.map((s, idx) => (
                  <span 
                    key={s} 
                    className="skill-chip" 
                    role="listitem" 
                    tabIndex={0}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="section-label">
              <span>🎯</span>
              <span>Approach & Values</span>
            </div>
            
            <p className="text-cyan-300 leading-relaxed text-base mb-4 text-reveal delay-3">
              I take pride in <span className="highlight-text" style={{ color: "#c084fc", fontWeight: 700 }}>workflow discipline</span>, documentation precision, and collaborative problem solving. I bring a growth mindset and a drive to deliver delightful user experiences.
            </p>

            <div className="mt-4 info-box glow-pulse">
              <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
                <span>🚀</span> What I deliver
              </h4>
              <ul className="list-none text-cyan-200 space-y-2">
                <li className="feature-item delay-1 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Production-ready MERN applications with CI/CD</span>
                </li>
                <li className="feature-item delay-2 flex items-start gap-2">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Accessible, responsive UI with micro-interactions</span>
                </li>
                <li className="feature-item delay-3 flex items-start gap-2">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Real-time features (WebSockets), secure auth, and payment flows</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
                <span>🌍</span> Languages
              </h4>
              <ul className="space-y-2 text-cyan-200">
                {languages.map((l, idx) => (
                  <li key={l.code} className="language-item text-reveal" style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
                    <span style={{ marginRight: 8, fontSize: '1.2em' }}>{l.flag}</span>
                    <strong style={{ color: "#c084fc" }}>{l.code}</strong> — <span style={{ color: "#9be7ff" }}>{l.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <a
            href="https://bejewelled-starship-6040f2.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold shadow-lg relative z-10"
          >
            <span className="relative z-10">🌐 View Portfolio</span>
          </a>

          <a
            href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-3 px-6 py-3 rounded-lg border-2 border-purple-400 text-cyan-100 hover:bg-purple-900/30 relative z-10"
          >
            <span className="relative z-10">📄 Download Resume</span>
          </a>

          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
            }}
            className="cta-button px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold shadow-lg relative z-10"
          >
            <span className="relative z-10">📩 Contact Me</span>
          </button>
        </div>
      </div>

      {/* Floating particles for depth */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {[...Array(24)].map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const delay = Math.random() * 8;
          return (
            <div
              key={i}
              className="about-particle"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                opacity: 0.08 + Math.random() * 0.12,
              }}
            />
          );
        })}
      </div>

      {/* Footer prompt */}
      <p className="mt-12 text-center text-cyan-200 text-sm relative z-10" style={{ animation: 'bounce 2s ease-in-out infinite' }} aria-hidden="true">
        ⬇️ Scroll down to explore my Skills...
      </p>
    </section>
  );
}