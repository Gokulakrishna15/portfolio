import React, { useState, useRef } from "react";
import { 
  FaShieldAlt, FaNetworkWired, FaServer, FaDatabase, FaCode, 
  FaFingerprint, FaExternalLinkAlt, FaQuoteLeft 
} from "react-icons/fa";
import { 
  SiHtml5, SiCss3, SiTailwindcss, SiJavascript, 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, 
  SiJsonwebtokens, SiPostman, SiGooglecloud 
} from "react-icons/si";

// ✅ IMAGES
import fullstackImg from "./assets/guvi.png";
import nodejsImg from "./assets/nodejs.png";
import databaseImg from "./assets/database.png";
import reactImg from "./assets/reactjs.png";
import advJsImg from "./assets/advanced-js.png";
import htmlCssImg from "./assets/html-css.png";
import jsBasicsImg from "./assets/js-basics.png";

/**
 * ------------------------------------------------------------------
 * DATA: PROFESSIONAL GRADE DESCRIPTIONS
 * ------------------------------------------------------------------
 */
const certifications = [
  {
    id: "fullstack",
    title: "Certified Full Stack Architect (MERN) with AI Integration",
    issuer: "IIT-M Pravartak & GUVI",
    image: fullstackImg,
    credentialId: "85g5k22r1t7",
    date: "August 2025",
    theme: "from-blue-500 to-cyan-500",
    icon: <FaNetworkWired />,
    description: "A definitive specialization in end-to-end web architecture. Orchestrated the seamless integration of scalable frontend interfaces with robust, event-driven backend systems. Leveraged AI-driven tools for code optimization, automated testing workflows, and predictive analytics integration.",
    competencies: [
      { name: "System Architecture", val: 95 },
      { name: "API Design", val: 90 },
      { name: "Database Normalization", val: 85 }
    ],
    tech: [<SiReact key="react" />, <SiNodedotjs key="node" />, <SiMongodb key="mongo" />, <SiExpress key="ex" />, <SiGooglecloud key="gcp" />]
  },
  {
    id: "nodejs",
    title: "Backend Engineering & Microservices Architecture",
    issuer: "GUVI",
    image: nodejsImg,
    credentialId: "3uuG8R6Bfsp5YfpJ",
    date: "August 2025",
    theme: "from-green-500 to-emerald-500",
    icon: <FaServer />,
    description: "Advanced server-side engineering focusing on the Node.js event loop and non-blocking I/O. Engineered RESTful APIs capable of handling high-concurrency requests, implemented JWT-based stateless authentication, and designed microservices for horizontal scalability.",
    competencies: [
      { name: "Event-Driven Logic", val: 92 },
      { name: "Security Protocols", val: 88 },
      { name: "Middleware Config", val: 90 }
    ],
    tech: [<SiNodedotjs key="node" />, <SiExpress key="ex" />, <SiJsonwebtokens key="jwt" />, <SiPostman key="post" />]
  },
  {
    id: "database",
    title: "NoSQL Database Management & Data Modeling",
    issuer: "GUVI",
    image: databaseImg,
    credentialId: "4lgk4YLqmkW38NEj",
    date: "August 2025",
    theme: "from-green-600 to-teal-600",
    icon: <FaDatabase />,
    description: "Specialized proficiency in MongoDB schema design and aggregation frameworks. Mastered the art of indexing strategies for query optimization, ensuring ACID compliance where necessary, and managing distributed data clusters for high availability.",
    competencies: [
      { name: "Data Aggregation", val: 94 },
      { name: "Indexing Strategy", val: 85 },
      { name: "Schema Design", val: 90 }
    ],
    tech: [<SiMongodb key="mongo" />, <FaDatabase key="db" />, <FaServer key="serv" />]
  },
  {
    id: "react",
    title: "Modern Frontend Development & SPA Architecture",
    issuer: "GUVI",
    image: reactImg,
    credentialId: "kzgxvR1f941HxGDp",
    date: "August 2025",
    theme: "from-cyan-400 to-blue-600",
    icon: <FaCode />,
    description: "Mastery of the React ecosystem, emphasizing component reusability and state management patterns. Proficient in React Hooks, Context API, and optimization techniques (Lazy Loading, Memoization) to deliver high-performance Single Page Applications.",
    competencies: [
      { name: "Component Lifecycle", val: 96 },
      { name: "State Management", val: 92 },
      { name: "Virtual DOM", val: 88 }
    ],
    tech: [<SiReact key="react" />, <SiTailwindcss key="tail" />, <SiJavascript key="js" />]
  },
  {
    id: "adv-js",
    title: "Advanced JavaScript: Algorithms & Performance",
    issuer: "GUVI",
    image: advJsImg,
    credentialId: "1ski3zEMKiO25ufj",
    date: "August 2025",
    theme: "from-yellow-400 to-orange-500",
    icon: <SiJavascript />,
    description: "Deep dive into the ECMAScript specifications. Covered complex concepts including lexical scoping, closures, prototypal inheritance chains, and the asynchronous nature of the JS engine (Promises, Async/Await queues).",
    competencies: [
      { name: "Asynchronous Patterns", val: 90 },
      { name: "Memory Management", val: 85 },
      { name: "ES6+ Standards", val: 95 }
    ],
    tech: [<SiJavascript key="js" />, <FaCode key="code" />]
  },
  {
    id: "html-css",
    title: "Responsive Interface Design & Accessibility",
    issuer: "GUVI",
    image: htmlCssImg,
    credentialId: "IYswVwEySvk9GcdU",
    date: "August 2025",
    theme: "from-orange-500 to-red-500",
    icon: <SiHtml5 />,
    description: "Engineering semantic, accessible, and responsive user interfaces. Expert utilization of modern CSS layouts (Flexbox, Grid), pre-processors, and mobile-first design methodologies to ensure cross-platform consistency.",
    competencies: [
      { name: "Semantic Markup", val: 98 },
      { name: "CSS Architecture", val: 92 },
      { name: "Responsive Logic", val: 95 }
    ],
    tech: [<SiHtml5 key="html" />, <SiCss3 key="css" />, <SiTailwindcss key="tail" />]
  },
  {
    id: "js-basics",
    title: "Computational Logic & DOM Manipulation",
    issuer: "GUVI",
    image: jsBasicsImg,
    credentialId: "RxxOeKt0v3IIUeF3",
    date: "August 2025",
    theme: "from-yellow-500 to-yellow-300",
    icon: <FaCode />,
    description: "Foundational algorithmic problem solving. Established core competencies in data structures, control flow logic, DOM tree traversal, and handling browser events for interactive web experiences.",
    competencies: [
      { name: "Algorithmic Logic", val: 90 },
      { name: "DOM Tree", val: 95 },
      { name: "Event Handling", val: 92 }
    ],
    tech: [<SiJavascript key="js" />]
  }
];

/**
 * ------------------------------------------------------------------
 * COMPONENT: 3D HOLO CARD (PHYSICS ENGINE)
 * ------------------------------------------------------------------
 */
const HoloCard = ({ children }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <div 
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
    >
      <div 
        ref={cardRef}
        className="w-full h-full transition-transform duration-200 ease-out transform-style-3d relative"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * ------------------------------------------------------------------
 * MAIN COMPONENT
 * ------------------------------------------------------------------
 */
export default function Certifications() {
  const [activeCert, setActiveCert] = useState(certifications[0]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // --- Logic: Handle Selection with "Verification" Effect ---
  const handleSelect = (cert) => {
    if (activeCert.id === cert.id) return;
    setLoading(true);
    setVerifying(true);
    
    setTimeout(() => {
      setActiveCert(cert);
      setLoading(false);
      // Keep verification running a bit longer for effect
      setTimeout(() => setVerifying(false), 800);
    }, 400);
  };

  return (
    <section id="certifications" className="relative py-24 px-4 md:px-8 bg-[#030014] overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* --- CSS ENGINE --- */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        
        @keyframes scan-vertical {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        .cyber-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-move 20s linear infinite;
        }
        
        .hologram-container {
          background: rgba(10, 10, 20, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .text-glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .skill-bar-fill {
          transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      {/* --- AMBIENT LIGHTING --- */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none opacity-20 bg-linear-to-br ${activeCert.theme}`} />
      <div className="cyber-grid absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
              <FaShieldAlt /> Authenticated
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              CREDENTIALS <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">.LOG</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-slate-500 text-sm font-mono">SYSTEM ID: GOKUL-DEV-2026</p>
            <p className="text-slate-500 text-sm font-mono">STATUS: ONLINE</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-full">
          
          {/* --- LEFT COLUMN: NAVIGATION LIST --- */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-187.5 overflow-y-auto pr-2 custom-scrollbar">
            {certifications.map((cert) => (
              <button
                key={cert.id}
                onClick={() => handleSelect(cert)}
                className={`group relative p-4 rounded-xl text-left transition-all duration-300 border overflow-hidden ${
                  activeCert.id === cert.id 
                    ? "bg-white/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]" 
                    : "bg-[#0a0a12]/50 border-white/5 hover:bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Active Indicator Line */}
                {activeCert.id === cert.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
                )}

                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl bg-black/50 border border-white/10 transition-colors ${activeCert.id === cert.id ? "text-cyan-400 border-cyan-500/30" : "text-slate-500"}`}>
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold transition-colors ${activeCert.id === cert.id ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                      {cert.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wide">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* --- RIGHT COLUMN: HOLOGRAPHIC PREVIEW --- */}
          <div className="lg:col-span-8 sticky top-10">
            <HoloCard>
              <div className={`hologram-container rounded-3xl relative overflow-hidden transition-all duration-500 ${loading ? "opacity-50 blur-sm scale-95" : "opacity-100 blur-0 scale-100"}`}>
                
                {/* Blockchain Verification Overlay */}
                {verifying && (
                  <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded text-green-400 text-xs font-mono animate-pulse">
                    <FaFingerprint /> VERIFYING BLOCKCHAIN ID...
                  </div>
                )}

                {/* Top Bar */}
                <div className="h-14 bg-white/5 border-b border-white/5 flex items-center px-6 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="font-mono text-xs text-slate-500">
                    ID: {activeCert.credentialId}
                  </div>
                </div>

                <div className="grid md:grid-cols-2">
                  
                  {/* --- IMAGE VIEWER --- */}
                  <div className="p-6 bg-black/40 border-r border-white/5 relative group">
                    {/* Scanning Laser */}
                    <div className="absolute left-0 right-0 h-1 bg-cyan-500/50 shadow-[0_0_20px_#06b6d4] z-20 animate-[scan-vertical_3s_linear_infinite]" />
                    
                    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-4/3">
                      <img 
                        src={activeCert.image} 
                        alt="Certificate" 
                        className="w-full h-full object-contain bg-[#050505]"
                      />
                      
                      {/* Hover Overlay */}
                      <a 
                        href={activeCert.image} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                      >
                        <FaExternalLinkAlt className="text-3xl text-cyan-400 mb-2" />
                        <span className="text-white font-bold tracking-widest text-sm">VIEW ORIGINAL</span>
                      </a>
                    </div>

                    {/* Tech Stack Icons Below Image */}
                    <div className="mt-6 flex justify-center gap-4">
                      {activeCert.tech.map((icon, i) => (
                        <div key={i} className="text-2xl text-slate-500 hover:text-cyan-400 transition-all hover:scale-110 hover:-translate-y-1">
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --- DETAILS & METRICS --- */}
                  <div className="p-8 flex flex-col relative">
                    
                    {/* Background Icon Watermark */}
                    <div className="absolute top-10 right-10 text-9xl opacity-[0.03] text-white pointer-events-none rotate-12">
                      {activeCert.icon}
                    </div>

                    <div className="mb-6 relative z-10">
                      <h3 className="text-2xl font-bold text-white leading-tight mb-2 text-glow">
                        {activeCert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-cyan-400 font-bold">ISSUER:</span>
                        <span className="text-slate-300">{activeCert.issuer}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed mb-8 relative z-10">
                      <FaQuoteLeft className="inline mr-2 text-cyan-500/50" />
                      {activeCert.description}
                    </p>

                    {/* Proficiency Bars */}
                    <div className="mt-auto space-y-4 relative z-10">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Technical Proficiency</h4>
                      {activeCert.competencies.map((skill, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-mono">{skill.name}</span>
                            <span className="text-cyan-400">{skill.val}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-linear-to-r ${activeCert.theme} skill-bar-fill`}
                              style={{ width: loading ? "0%" : `${skill.val}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </HoloCard>
          </div>

        </div>
      </div>
    </section>
  );
}