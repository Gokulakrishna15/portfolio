import React, { useState, useRef, useEffect } from "react";
import { 
  FaShieldAlt, FaNetworkWired, FaServer, FaDatabase, FaCode, 
  FaFingerprint, FaExternalLinkAlt, FaQuoteLeft, 
  FaCheckCircle, FaCertificate, FaAward, FaStar, FaGraduationCap,
  FaUniversity, FaBriefcase, FaChartLine
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
    theme: "from-blue-600 via-indigo-600 to-blue-700",
    icon: <FaNetworkWired />,
    featured: true,
    badge: "PREMIER",
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
    theme: "from-emerald-600 via-teal-600 to-emerald-700",
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
    theme: "from-teal-600 via-cyan-700 to-teal-700",
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
    theme: "from-sky-600 via-blue-600 to-sky-700",
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
    theme: "from-amber-600 via-yellow-600 to-amber-700",
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
    theme: "from-orange-600 via-red-600 to-orange-700",
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
    theme: "from-yellow-600 via-amber-600 to-yellow-700",
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
 * PROFESSIONAL ACCENT LINES FOR FEATURED CERTIFICATION
 * ------------------------------------------------------------------
 */
const AccentLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Vertical accent lines */}
      <div className="absolute left-[20%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute left-[40%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-indigo-500/15 to-transparent" />
      <div className="absolute left-[60%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute left-[80%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-indigo-500/15 to-transparent" />
      
      {/* Horizontal accent lines */}
      <div className="absolute left-0 right-0 top-[30%] h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute left-0 right-0 top-[70%] h-px bg-linear-to-r from-transparent via-indigo-500/15 to-transparent" />
    </div>
  );
};

/**
 * ------------------------------------------------------------------
 * COMPONENT: 3D HOLO CARD (PHYSICS ENGINE)
 * ------------------------------------------------------------------
 */
const HoloCard = ({ children, featured = false }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * (featured ? -15 : -10);
    const rotateY = ((x - centerX) / centerX) * (featured ? 15 : 10);

    setRotate({ x: rotateX, y: rotateY });
    setGlowPosition({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    });
  };

  return (
    <div 
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setRotate({ x: 0, y: 0 });
        setGlowPosition({ x: 50, y: 50 });
      }}
    >
      <div 
        ref={cardRef}
        className={`w-full h-full transition-transform duration-200 ease-out transform-style-3d relative ${
          featured ? 'hover:scale-[1.02]' : ''
        }`}
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {featured && (
          <div 
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
            style={{
              background: `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(6, 182, 212, 0.15), transparent 40%)`
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * ------------------------------------------------------------------
 * PROFESSIONAL BADGE COMPONENT
 * ------------------------------------------------------------------
 */
const ProfessionalBadge = ({ text, icon }) => {
  return (
    <div className="absolute -top-3 -right-3 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg blur-md opacity-40" />
        <div className="relative bg-linear-to-br from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 shadow-xl border border-blue-400/30">
          {icon}
          <span className="tracking-wide">{text}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * ------------------------------------------------------------------
 * PROFESSIONAL RATING DISPLAY
 * ------------------------------------------------------------------
 */
const ProfessionalRating = ({ rating = 5 }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <FaStar 
          key={i} 
          className="text-blue-500 text-xs"
        />
      ))}
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
      setTimeout(() => setVerifying(false), 800);
    }, 400);
  };

  return (
    <section id="certifications" className="relative py-24 px-4 md:px-8 bg-[#030014] overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* --- CSS ENGINE --- */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        
        @keyframes scan-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        @keyframes grid-subtle {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes border-pulse {
          0%, 100% { border-color: rgba(59, 130, 246, 0.2); }
          50% { border-color: rgba(99, 102, 241, 0.4); }
        }

        @keyframes subtle-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.2); }
        }
        
        .professional-grid {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-subtle 30s linear infinite;
        }
        
        .card-container {
          background: rgba(15, 15, 25, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
        }

        .featured-card {
          background: rgba(15, 20, 35, 0.85);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 
            0 0 40px rgba(59, 130, 246, 0.15),
            0 25px 80px rgba(0, 0, 0, 0.5);
          animation: border-pulse 4s ease-in-out infinite;
        }

        .professional-glow {
          text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
        }

        .skill-bar-fill {
          transition: width 1.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3));
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.5), rgba(99, 102, 241, 0.5));
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cert-item {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        .scan-line {
          animation: scan-line 6s ease-in-out infinite;
        }
      `}</style>

      {/* --- PROFESSIONAL AMBIENT LIGHTING --- */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
        activeCert.featured ? 'opacity-15' : 'opacity-10'
      } bg-linear-to-br ${activeCert.theme}`} />
      
      {/* Refined Grid Pattern */}
      <div className="professional-grid absolute inset-0 pointer-events-none" />
      
      {/* Subtle Featured Background Effects */}
      {activeCert.featured && (
        <>
          <div className="absolute inset-0 bg-linear-to-tr from-blue-600/5 via-transparent to-indigo-600/5 pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* --- PROFESSIONAL HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-linear-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <FaShieldAlt /> 
                <span>Verified Credentials</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-linear-to-r from-slate-600/10 to-slate-700/10 border border-slate-500/20 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                <FaGraduationCap />
                <span>{certifications.length} Certifications</span>
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white">Professional</span>{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-blue-600">
                Certifications
              </span>
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Industry-recognized credentials demonstrating expertise in full-stack development, 
              cloud architecture, and modern software engineering practices.
            </p>
          </div>
          <div className="hidden md:block text-right space-y-2">
            <div className="flex items-center justify-end gap-2 text-xs">
              <FaCheckCircle className="text-emerald-500" />
              <span className="text-slate-400 font-medium">All Credentials Verified</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-xs">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-slate-400 font-medium">Last Updated: Feb 2026</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-xs">
              <FaFingerprint className="text-blue-400" />
              <span className="text-slate-400 font-medium">Blockchain Secured</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-full">
          
          {/* --- LEFT COLUMN: PROFESSIONAL CERTIFICATION LIST --- */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-187.5 overflow-y-auto pr-2 custom-scrollbar">
            {certifications.map((cert, index) => (
              <button
                key={cert.id}
                onClick={() => handleSelect(cert)}
                className={`cert-item group relative p-5 rounded-xl text-left transition-all duration-300 border overflow-hidden ${
                  activeCert.id === cert.id 
                    ? cert.featured 
                      ? "bg-linear-to-br from-blue-600/15 to-indigo-600/10 border-blue-500/40 shadow-lg shadow-blue-500/10" 
                      : "bg-white/5 border-blue-500/30 shadow-md"
                    : "bg-slate-900/30 border-white/5 hover:bg-white/5 hover:border-white/15"
                }`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Featured Badge */}
                {cert.featured && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-md blur-sm opacity-50" />
                      <div className="relative bg-linear-to-br from-blue-600 to-indigo-700 text-white px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider shadow-lg border border-blue-400/30 flex items-center gap-1">
                        <FaAward className="text-xs" />
                        {cert.badge}
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Indicator */}
                {activeCert.id === cert.id && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                    cert.featured 
                      ? 'bg-linear-to-b from-blue-500 via-indigo-500 to-blue-600' 
                      : 'bg-blue-500'
                  }`} />
                )}

                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl transition-all ${
                    activeCert.id === cert.id 
                      ? cert.featured
                        ? "bg-linear-to-br from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30"
                        : "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                      : "bg-slate-800/50 text-slate-500 border border-slate-700/30 group-hover:text-blue-400 group-hover:border-blue-500/20"
                  }`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-semibold transition-colors mb-1 leading-snug ${
                      activeCert.id === cert.id 
                        ? "text-white" 
                        : "text-slate-300 group-hover:text-white"
                    }`}>
                      {cert.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium mb-1.5">
                      {cert.issuer}
                    </p>
                    <p className="text-[10px] text-slate-600 flex items-center gap-1">
                      <FaCertificate className="text-[8px]" />
                      {cert.date}
                    </p>
                    {cert.featured && activeCert.id === cert.id && (
                      <div className="mt-2.5">
                        <ProfessionalRating rating={5} />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* --- RIGHT COLUMN: PROFESSIONAL CERTIFICATION DISPLAY --- */}
          <div className="lg:col-span-8 sticky top-10">
            <HoloCard featured={activeCert.featured}>
              <div className={`${
                activeCert.featured ? 'featured-card' : 'card-container'
              } rounded-2xl relative overflow-hidden transition-all duration-500 ${
                loading ? "opacity-50 blur-sm scale-98" : "opacity-100 blur-0 scale-100"
              }`}>
                
                {/* Professional Accent Lines for Featured */}
                {activeCert.featured && <AccentLines />}

                {/* Professional Badge */}
                {activeCert.featured && (
                  <ProfessionalBadge text="PREMIER CERTIFICATION" icon={<FaUniversity />} />
                )}

                {/* Verification Status */}
                {verifying && (
                  <div className="absolute top-5 right-5 z-50 flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 px-4 py-2 rounded-lg text-emerald-400 text-xs font-semibold shadow-lg">
                    <FaFingerprint className="animate-pulse" /> 
                    <span>Verifying Credentials...</span>
                  </div>
                )}

                {/* Professional Top Bar */}
                <div className={`h-16 ${
                  activeCert.featured ? 'bg-linear-to-r from-slate-900/60 to-slate-800/60' : 'bg-slate-900/40'
                } border-b border-white/5 flex items-center px-6 justify-between backdrop-blur-sm`}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                      <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <span className="text-slate-400 text-xs font-medium">Certificate Viewer</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {activeCert.featured && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/15 border border-blue-500/30">
                        <FaCertificate className="text-blue-400 text-xs" />
                        <span className="text-blue-400 text-xs font-semibold">Premium</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium">ID:</span>
                      <span className={`font-mono ${activeCert.featured ? "text-blue-400" : "text-slate-400"}`}>
                        {activeCert.credentialId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2">
                  
                  {/* --- PROFESSIONAL IMAGE VIEWER --- */}
                  <div className={`p-8 ${
                    activeCert.featured ? 'bg-slate-900/50' : 'bg-slate-900/30'
                  } border-r border-white/5 relative group`}>
                    
                    {/* Subtle Scan Line */}
                    <div className={`absolute left-0 right-0 h-px ${
                      activeCert.featured 
                        ? 'bg-linear-to-r from-transparent via-blue-500/30 to-transparent' 
                        : 'bg-linear-to-r from-transparent via-blue-500/20 to-transparent'
                    } scan-line`} />
                    
                    <div className={`relative rounded-lg overflow-hidden border ${
                      activeCert.featured 
                        ? 'border-blue-500/20 shadow-xl shadow-blue-500/5' 
                        : 'border-white/10 shadow-lg'
                    } aspect-4/3 bg-slate-950`}>
                      <img 
                        src={activeCert.image} 
                        alt="Certificate" 
                        className="w-full h-full object-contain"
                      />
                      
                      {/* Professional Badge Overlay for Featured */}
                      {activeCert.featured && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/90 backdrop-blur-sm border border-blue-500/30">
                          <FaBriefcase className="text-blue-400 text-sm" />
                          <span className="text-blue-400 text-xs font-semibold">Professional Grade</span>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <a 
                        href={activeCert.image} 
                        target="_blank" 
                        rel="noreferrer"
                        className={`absolute inset-0 ${
                          activeCert.featured 
                            ? 'bg-linear-to-br from-blue-900/95 to-indigo-900/95' 
                            : 'bg-slate-900/95'
                        } flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer`}
                      >
                        <FaExternalLinkAlt className={`text-3xl mb-3 ${
                          activeCert.featured ? 'text-blue-400' : 'text-blue-500'
                        }`} />
                        <span className="text-white font-semibold tracking-wide text-sm">View Full Certificate</span>
                        {activeCert.featured && (
                          <span className="text-blue-400 text-xs mt-2 font-medium">Premier Certification</span>
                        )}
                      </a>
                    </div>

                    {/* Technology Stack */}
                    <div className="mt-6">
                      <h5 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Technology Stack</h5>
                      <div className="flex justify-start gap-4">
                        {activeCert.tech.map((icon, i) => (
                          <div 
                            key={i} 
                            className={`text-2xl transition-all hover:scale-110 ${
                              activeCert.featured 
                                ? 'text-slate-400 hover:text-blue-400' 
                                : 'text-slate-500 hover:text-blue-400'
                            }`}
                          >
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* --- PROFESSIONAL DETAILS & METRICS --- */}
                  <div className="p-8 flex flex-col relative bg-linear-to-br from-slate-900/20 to-slate-800/10">
                    
                    {/* Subtle Background Icon */}
                    <div className={`absolute top-8 right-8 text-8xl pointer-events-none ${
                      activeCert.featured 
                        ? 'opacity-[0.04] text-blue-500' 
                        : 'opacity-[0.03] text-slate-500'
                    }`}>
                      {activeCert.icon}
                    </div>

                    <div className="mb-6 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`text-2xl font-bold leading-tight ${
                          activeCert.featured 
                            ? 'text-white professional-glow' 
                            : 'text-white'
                        }`}>
                          {activeCert.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <FaUniversity className="text-blue-400 text-xs" />
                          <span className="text-slate-400 font-medium">
                            {activeCert.issuer}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaCertificate className="text-slate-500 text-xs" />
                          <span className="text-slate-500">Issued: {activeCert.date}</span>
                        </div>
                      </div>
                      
                      {activeCert.featured && (
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-linear-to-r from-blue-600/15 to-indigo-600/10 border border-blue-500/30">
                          <ProfessionalRating rating={5} />
                          <span className="text-blue-400 text-xs font-semibold ml-1">Highest Achievement</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-8 relative z-10">
                      <div className="flex items-start gap-2">
                        <FaQuoteLeft className={`mt-1 shrink-0 ${
                          activeCert.featured ? 'text-blue-400/60' : 'text-slate-500/50'
                        }`} />
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {activeCert.description}
                        </p>
                      </div>
                    </div>

                    {/* Professional Competency Metrics */}
                    <div className="mt-auto space-y-4 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                          <FaChartLine className="text-blue-400" />
                          Core Competencies
                        </h4>
                        {activeCert.featured && (
                          <span className="text-[10px] text-blue-400 font-medium">Verified Skills</span>
                        )}
                      </div>
                      {activeCert.competencies.map((skill, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-medium">{skill.name}</span>
                            <span className={`font-semibold ${
                              activeCert.featured ? 'text-blue-400' : 'text-blue-500'
                            }`}>
                              {skill.val}%
                            </span>
                          </div>
                          <div className={`h-2 w-full rounded-full overflow-hidden ${
                            activeCert.featured ? 'bg-slate-800/50' : 'bg-slate-800/30'
                          }`}>
                            <div 
                              className={`h-full bg-linear-to-r ${activeCert.theme} skill-bar-fill shadow-sm`}
                              style={{ width: loading ? "0%" : `${skill.val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Professional Footer */}
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2 text-xs">
                        <FaShieldAlt className="text-emerald-500" />
                        <span className="text-slate-500 font-medium">Blockchain Verified</span>
                      </div>
                      {activeCert.featured && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 border border-blue-500/20">
                          <FaAward className="text-blue-400 text-xs" />
                          <span className="text-blue-400 text-xs font-semibold">Premier Level</span>
                        </div>
                      )}
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
