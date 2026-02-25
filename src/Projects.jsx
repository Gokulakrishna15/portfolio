import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  FaUtensils,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaUsers,
  FaStar,
  FaLaptopCode,
  FaRegCheckCircle,
  FaShieldAlt,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaGithub,
  FaServer,
  FaLock,
  FaClock,
  FaChartLine,
  FaPaintBrush,
  FaBolt,
  FaFileInvoiceDollar,
  FaRegImage,
  FaTerminal,
  FaMemory,
  FaNetworkWired,
  FaCheckDouble,
  FaArrowRight,
  FaFingerprint,
  FaGlobe,
  FaUserShield,
  FaDatabase,
  FaRobot
} from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiStripe,
  SiSocketdotio,
  SiRedux,
  SiTailwindcss,
  SiJsonwebtokens,
  SiDocker,
  SiTypescript,
  SiNextdotjs,
} from "react-icons/si";

// ==========================================
// 1. DATA & CONFIG
// ==========================================

const terminalLogs = [
  { time: "10:42:01", type: "info", msg: "Server initialized on port 5000" },
  { time: "10:42:02", type: "success", msg: "MongoDB connection established" },
  { time: "10:42:05", type: "info", msg: "WebSocket Server: Listening for connections..." },
  { time: "10:43:12", type: "warn", msg: "Client connected: Socket ID x8d9s9" },
  { time: "10:43:15", type: "success", msg: "PaymentIntent created: pi_1Gq..." },
  { time: "10:43:16", type: "info", msg: "Booking confirmed: Table #4" },
];

const aiNotesLogs = [
  { time: "11:23:01", type: "info", msg: "Next.js API Route: /api/ai/summarize" },
  { time: "11:23:02", type: "success", msg: "MongoDB connection: ai-notes database" },
  { time: "11:23:03", type: "info", msg: "Clerk middleware: JWT validation active" },
  { time: "11:23:45", type: "success", msg: "AI Summary generated - Gemini 2.5 Flash" },
  { time: "11:23:46", type: "info", msg: "Note saved: user_2xxx - 'Meeting Notes'" },
  { time: "11:23:50", type: "success", msg: "AI Tags generated: ['work', 'productivity']" },
];

const restaurantData = {
  id: "restaurant",
  title: "Restaurant Reservation Ecosystem",
  emoji: "🍽️",
  tagline: "A Full-Scale MERN Platform for Real-Time Hospitality Management",
  description:
    "This is not just a booking app; it is a complete ecosystem designed to bridge the gap between hungry diners and restaurant managers. It solves the critical industry problem of 'No-Shows' using a deposit system and manages table turnover efficiently with live WebSocket updates.",
  demo: "https://eclectic-cucurucho-a9fcf2.netlify.app/",
  github: "https://github.com/Gokulakrishna15/restaurant-reservation-platform",
  version: "v2.4.0-stable",
  lastCommit: "Refactored reservation controller for atomic transactions",
  stack: [
    { name: "React 18", icon: <SiReact className="text-cyan-400" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "Socket.io", icon: <SiSocketdotio className="text-white" /> },
    { name: "Stripe", icon: <SiStripe className="text-indigo-400" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
  ],
  stats: [
    { label: "Latency", value: "< 50ms", sub: "Socket Emission" },
    { label: "Security", value: "PCI-DSS", sub: "Stripe Compliant" },
    { label: "Uptime", value: "99.99%", sub: "Cluster Mode Active" },
    { label: "Scale", value: "10k+", sub: "Concurrent Connections" },
  ],
  challenges: [
    {
      title: "Race Conditions",
      desc: "Prevented double-booking of tables by implementing MongoDB ACID transactions and optimistic locking mechanisms.",
      icon: <FaCheckDouble className="text-green-400" />
    },
    {
      title: "State Sync",
      desc: "Kept 50+ connected clients in sync using a custom Redux middleware that listens to Socket.io events.",
      icon: <FaNetworkWired className="text-blue-400" />
    },
    {
      title: "Memory Leaks",
      desc: "Identified and patched unmounted component listeners in the admin dashboard, reducing client memory usage by 40%.",
      icon: <FaMemory className="text-purple-400" />
    }
  ],
  deepDive: {
    architecture: [
      "Implemented the Publisher-Subscriber pattern using Socket.io to push real-time table availability to all connected clients instantly.",
      "Engineered a dual-layer validation system: Client-side (Yup/Formik) for UX and Server-side (Express-Validator) for data integrity.",
      "Optimized MongoDB aggregations to calculate analytics (Revenue, Peak Hours) without impacting read/write performance for bookings.",
    ],
    uiux: [
      "Glassmorphism Design System: Utilized backdrop-filter and semi-transparent layers to create a modern, depth-rich interface.",
      "Optimistic UI Updates: The interface reflects booking status immediately while syncing with the server in the background, making the app feel instant.",
      "Adaptive Dark Mode: A carefully curated color palette that reduces eye strain for restaurant staff working in low-light environments.",
    ],
  },
};

const aiNotesData = {
  id: "ai-notes",
  title: "AI Notes Platform",
  emoji: "🤖",
  tagline: "Next.js 16 • AI-Powered Productivity with Google Gemini 2.5",
  description:
    "A production-ready, full-stack note-taking application that leverages artificial intelligence to enhance productivity. Built with Next.js 16, TypeScript, and Google Gemini AI, it provides intelligent features like automatic summarization, content improvement, and smart tag generation. Demonstrates modern full-stack architecture with enterprise-grade security and real-time capabilities.",
  demo: "https://ai-notes-app-vercel.vercel.app",
  github: "https://github.com/Gokulakrishna15/ai-notes-app",
  version: "v1.0.0-production",
  lastCommit: "Complete AI Notes App with all POC features",
  stack: [
    { name: "Next.js 16", icon: <SiNextdotjs className="text-white" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "Gemini AI", icon: <FaBolt className="text-orange-400" /> },
    { name: "Clerk", icon: <FaUserShield className="text-purple-400" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-300" /> },
  ],
  stats: [
    { label: "AI Model", value: "Gemini 2.5", sub: "Latest Flash Model" },
    { label: "Type Safety", value: "100%", sub: "TypeScript Strict" },
    { label: "Response", value: "< 2s", sub: "AI Processing" },
    { label: "Auth", value: "JWT", sub: "Clerk Protected" },
  ],
  aiFeatures: [
    {
      title: "AI Summary",
      desc: "Generates concise one-sentence summaries of long notes using Google Gemini 2.5 Flash for instant content comprehension.",
      icon: <FaChartLine className="text-violet-400" />
    },
    {
      title: "AI Improve",
      desc: "Enhances grammar, clarity, and professionalism while preserving the original meaning through advanced language processing.",
      icon: <FaPaintBrush className="text-blue-400" />
    },
    {
      title: "AI Tags",
      desc: "Automatically generates 3-5 relevant tags based on note title and content for intelligent organization and search.",
      icon: <FaDatabase className="text-emerald-400" />
    }
  ],
  techStack: {
    frontend: [
      "Next.js 16 with App Router for optimal performance",
      "TypeScript strict mode for type safety",
      "shadcn/ui component library for consistent design",
    ],
    backend: [
      "Next.js API Routes for serverless architecture",
      "MongoDB Atlas with Mongoose ODM",
      "Google Gemini AI API integration",
    ]
  }
};

const oaData = {
  id: "online-assessment",
  title: "Online Assessment System",
  emoji: "📝",
  tagline: "Secure, Scalable Exam Management with RBAC",
  description:
    "A high-security platform designed to conduct remote examinations. It prioritizes academic integrity through browser-locking mechanisms and separates administrative workflows from student experiences.",
  demo: "https://effervescent-pothos-c78a1a.netlify.app/",
  github: "https://github.com/Gokulakrishna15/osback",
  roles: ["Admin", "Proctor", "Student"],
  stack: [
    { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
    { name: "JWT", icon: <SiJsonwebtokens className="text-pink-500" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-300" /> },
  ],
  securityFeatures: [
    "HttpOnly Cookies for JWT storage",
    "CSRF Protection via custom tokens",
    "Rate Limiting on Login Routes",
    "Request Validation Middleware"
  ],
  features: {
    admin: [
      "Create/Edit Exam Papers with Rich Text",
      "Assign Proctors to specific sessions",
      "View Global Analytics & Pass Rates",
      "Manage User Roles & Permissions"
    ],
    student: [
      "Real-time countdown timer (Server Synced)",
      "Auto-submission on timeout",
      "Question flagging and review system",
      "Instant Result generation (Objective)"
    ]
  }
};

const tasksData = [
  {
    id: "password-reset",
    title: "🔑 Auth & Recovery",
    desc: "A security microservice focusing on the critical 'Forgot Password' flow. Implements secure token generation, email links, and bcrypt hashing.",
    tags: ["Security", "Nodemailer", "Bcrypt"],
    demo: "https://password-reset-frontend-prod.netlify.app/",
    github: "https://github.com/Gokulakrishna15/password-reset-frontend",
    color: "cyan",
    icon: <FaLock />,
  },
  {
    id: "invoice-builder",
    title: "🧾 Invoice Generator",
    desc: "A utility tool for freelancers. Features dynamic form fields, tax calculations, and client-side PDF generation using React-PDF.",
    tags: ["React-PDF", "Forms", "Utility"],
    demo: "https://sensational-macaron-af7801.netlify.app/",
    github: "https://github.com/Gokulakrishna15/invoice-builder",
    color: "emerald",
    icon: <FaFileInvoiceDollar />,
  },
  {
    id: "movies",
    title: "🎬 Movie Discovery",
    desc: "An interface study using the OMDB API. Features debounced searching, infinite scroll pagination, and skeleton loading states.",
    tags: ["API Integration", "Debouncing", "UI"],
    demo: "https://tangerine-phoenix-243994.netlify.app/",
    github: "https://github.com/Gokulakrishna15/movies-search-app",
    color: "orange",
    icon: <FaRegImage />,
  },
];

// ==========================================
// 2. ANIMATED BACKGROUND ORBS
// ==========================================
const FloatingOrbs = ({ mouse }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="orb orb-1"
      style={{ transform: `translate(${mouse.x * 0.03}px, ${mouse.y * 0.03}px)` }}
    />
    <div
      className="orb orb-2"
      style={{ transform: `translate(${mouse.x * -0.02}px, ${mouse.y * -0.02}px)` }}
    />
    <div
      className="orb orb-3"
      style={{ transform: `translate(${mouse.x * 0.015}px, ${mouse.y * 0.01}px)` }}
    />
    <div className="grid-bg" />
  </div>
);

// ==========================================
// 3. ANIMATED COUNTER
// ==========================================
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target.replace(/[^0-9.]/g, ""));
        if (isNaN(num)) return;
        let start = 0;
        const step = num / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(num); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ==========================================
// 4. TERMINAL
// ==========================================
const TerminalUI = ({ logs, label, cwd }) => {
  const durations = useMemo(() => logs.map(() => Math.random() * 2 + 1.5), []);
  const [typedLines, setTypedLines] = useState([]);

  useEffect(() => {
    logs.forEach((_, i) => {
      setTimeout(() => setTypedLines(prev => [...prev, i]), i * 300);
    });
  }, []);

  return (
    <div className="w-full h-full bg-[#080d14] rounded-xl border border-[#1e293b] p-4 font-mono text-xs flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#1e293b]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_#27c93f]" />
        </div>
        <span className="ml-2 text-[#3d5066] text-[10px]">{label}</span>
      </div>
      <div className="grow space-y-1.5 overflow-hidden">
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex gap-3 transition-all duration-500"
            style={{
              opacity: typedLines.includes(i) ? 1 : 0,
              transform: typedLines.includes(i) ? "translateY(0)" : "translateY(8px)",
              animationDuration: `${durations[i]}s`
            }}
          >
            <span className="text-[#2d4a66] shrink-0">[{log.time}]</span>
            <span className={`shrink-0 font-bold ${
              log.type === 'info' ? 'text-[#60a5fa]' :
              log.type === 'success' ? 'text-[#34d399]' :
              log.type === 'warn' ? 'text-[#fbbf24]' : 'text-slate-300'
            }`}>{log.type.toUpperCase()}:</span>
            <span className="text-[#94a3b8]">{log.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 mt-3 pt-2 border-t border-[#0f1a24]">
          <span className="text-[#34d399]">➜</span>
          <span className="text-[#38bdf8]">{cwd}</span>
          <span className="text-[#475569]">git:(main)</span>
          <span className="cursor-blink" />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. TAB BUTTON
// ==========================================
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-lg
      ${active
        ? "text-white bg-white/5 border border-white/10"
        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
      }
    `}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
    )}
  </button>
);

// ==========================================
// 6. TECH PILL
// ==========================================
const TechPill = ({ icon, name }) => (
  <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-slate-300 text-xs font-mono hover:border-white/20 hover:text-white hover:bg-white/[0.06] transition-all duration-300 cursor-default">
    <span className="group-hover:scale-110 transition-transform duration-200">{icon}</span>
    <span>{name}</span>
  </div>
);

// ==========================================
// 7. SECTION LABEL
// ==========================================
const SectionLabel = ({ icon, text, glow }) => (
  <div className="flex items-center gap-3">
    <div className={`p-2 rounded-lg border ${glow}`}>{icon}</div>
    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{text}</span>
    <div className="h-px bg-gradient-to-r from-slate-800 to-transparent grow ml-2 hidden md:block" />
  </div>
);

// ==========================================
// 8. PARTICLE FIELD (SVG based)
// ==========================================
const ParticleField = ({ color }) => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 2 + 1,
      d: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    })), []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={`${p.x}%`}
          cy={`${p.y}%`}
          r={p.r}
          fill={color}
          opacity="0.4"
          style={{
            animation: `particle-float ${p.d}s ease-in-out ${p.delay}s infinite alternate`
          }}
        />
      ))}
    </svg>
  );
};

// ==========================================
// 9. MAIN COMPONENT
// ==========================================
export default function Projects() {
  const [activeTab, setActiveTab] = useState("overview");
  const [oaRole, setOaRole] = useState("admin");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full py-28 px-4 md:px-8 bg-[#030712] text-slate-200 overflow-hidden selection:bg-pink-500/30"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <FloatingOrbs mouse={mousePos} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <div className="text-center mb-32 space-y-6 section-reveal">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-[11px] uppercase tracking-[0.25em] font-semibold text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_#ec4899]" />
            Portfolio & Engineering
          </div>

          <div className="relative">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">Built to</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-[0_0_60px_rgba(168,85,247,0.5)]">Scale.</span>
            </h2>
            {/* Decorative lines */}
            <div className="absolute top-1/2 -left-8 w-6 h-px bg-pink-500/60 hidden md:block" />
            <div className="absolute top-1/2 -right-8 w-6 h-px bg-blue-500/60 hidden md:block" />
          </div>

          <p className="max-w-xl mx-auto text-base md:text-lg text-slate-400 font-light leading-relaxed">
            Architecting digital experiences with precision. Selected works demonstrating mastery in{" "}
            <span className="text-white font-medium">Full-Stack</span>,{" "}
            <span className="text-white font-medium">AI Integration</span>, and{" "}
            <span className="text-white font-medium">Security</span>.
          </p>

          {/* Scrolling tech marquee */}
          <div className="mt-10 overflow-hidden relative">
            <div className="flex gap-4 marquee-track py-2">
              {["MERN Stack", "TypeScript", "WebSockets", "GraphQL", "AI/ML", "Docker", "MongoDB", "Stripe API", "Next.js", "Clerk Auth", "MERN Stack", "TypeScript", "WebSockets", "GraphQL", "AI/ML", "Docker", "MongoDB", "Stripe API", "Next.js", "Clerk Auth"].map((t, i) => (
                <span key={i} className="shrink-0 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-slate-500 text-xs font-mono whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            FLAGSHIP: RESTAURANT APP
           ══════════════════════════════════════════════ */}
        <div className="mb-48 section-reveal">
          <div className="mb-8">
            <SectionLabel
              icon={<FaStar className="text-yellow-400 text-sm animate-spin-slow" />}
              text="Flagship Project · Production Grade"
              glow="bg-yellow-500/10 border-yellow-500/20"
            />
          </div>

          <div className="project-card group relative rounded-[2rem] overflow-hidden border border-white/[0.06]"
            style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #050810 100%)" }}>

            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.1), rgba(59,130,246,0.1))", border: "1px solid rgba(236,72,153,0.3)" }} />

            <ParticleField color="#ec4899" />

            <div className="grid lg:grid-cols-12 min-h-[720px]">

              {/* LEFT */}
              <div className="lg:col-span-7 p-8 md:p-14 flex flex-col relative z-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 font-mono text-xs text-pink-500/70 mb-5">
                    <FaCodeBranch />
                    <span>{restaurantData.version}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-slate-600 truncate max-w-[200px]">{restaurantData.lastCommit}</span>
                  </div>

                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-5xl">{restaurantData.emoji}</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{restaurantData.title}</h2>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6"
                    style={{ background: "linear-gradient(90deg, rgba(236,72,153,0.1), transparent)", borderLeft: "3px solid #ec4899" }}>
                    <span className="text-sm text-pink-300 font-mono">{restaurantData.tagline}</span>
                  </div>

                  <p className="text-slate-400 leading-relaxed">{restaurantData.description}</p>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2.5 mb-10 pb-8 border-b border-white/[0.06]">
                  {restaurantData.stack.map((t, i) => <TechPill key={i} {...t} />)}
                </div>

                {/* Tabs */}
                <div className="grow flex flex-col">
                  <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white/[0.02] border border-white/[0.05] w-fit">
                    {["overview", "architecture", "engineering", "ui/ux"].map(tab => (
                      <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                        {tab}
                      </TabButton>
                    ))}
                  </div>

                  <div className="grow min-h-[200px] tab-content">
                    {activeTab === "overview" && (
                      <div className="grid grid-cols-2 gap-4 animate-slide-up">
                        {restaurantData.stats.map((s, i) => (
                          <div key={i} className="stat-card group/s p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300">
                            <div className="text-2xl font-black text-white mb-1 group-hover/s:text-pink-400 transition-colors">
                              {s.value}
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{s.label}</div>
                            <div className="text-[10px] text-slate-600 mt-0.5 font-mono">{s.sub}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === "architecture" && (
                      <div className="space-y-5 animate-slide-up">
                        <div className="p-4 rounded-xl bg-[#050a12] border border-white/[0.06] font-mono text-xs text-slate-300 leading-relaxed">
                          <span className="text-pink-400">const</span> <span className="text-blue-400">socketHandler</span> = (io) ={">"} {"{"}
                          <br />&nbsp;&nbsp;io.on(<span className="text-green-400">'connection'</span>, (socket) ={">"} {"{"}
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;socket.join(<span className="text-green-400">'restaurant_id'</span>);
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-600">// Real-time push</span>
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;socket.emit(<span className="text-green-400">'table_update'</span>, payload);
                          <br />&nbsp;&nbsp;{"}"});
                          <br />{"}"};
                        </div>
                        <ul className="space-y-3">
                          {restaurantData.deepDive.architecture.map((item, i) => (
                            <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                              <FaServer className="mt-1 text-blue-500 shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeTab === "engineering" && (
                      <div className="space-y-4 animate-slide-up">
                        {restaurantData.challenges.map((c, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors">
                            <div className="text-xl mt-0.5">{c.icon}</div>
                            <div>
                              <h5 className="font-bold text-white text-sm">{c.title}</h5>
                              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === "ui/ux" && (
                      <ul className="space-y-4 animate-slide-up">
                        {restaurantData.deepDive.uiux.map((item, i) => (
                          <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                            <FaPaintBrush className="mt-1 text-pink-500 shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-white/[0.06]">
                  <a href={restaurantData.demo} target="_blank" rel="noopener noreferrer"
                    className="cta-primary group flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm">
                    <FaExternalLinkAlt className="group-hover:rotate-45 transition-transform duration-300" />
                    Launch Live Demo
                  </a>
                  <a href={restaurantData.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-7 py-3.5 rounded-xl bg-white/[0.04] text-white font-bold text-sm border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                    <FaGithub size={18} /> View Source
                  </a>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-5 bg-[#030610] border-l border-white/[0.04] flex flex-col">
                {/* Mock UI card */}
                <div className="h-1/2 flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(236,72,153,0.08), transparent 70%)" }} />
                  <div className="card-float relative z-10">
                    <div className="w-60 bg-[#0e1628]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-5 -rotate-3 hover:rotate-0 transition-transform duration-700 group/card">
                      <div className="absolute -top-1 -right-1 px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[9px] font-bold border border-green-500/30 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                        ● LIVE
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-slate-500">Table #4</span>
                        <span className="text-xs text-slate-600 font-mono">2 guests</span>
                      </div>
                      <div className="space-y-2 mb-5">
                        <div className="h-1.5 w-3/4 bg-slate-800 rounded-full">
                          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 animate-width-pulse" />
                        </div>
                        <div className="h-1.5 w-1/2 bg-slate-800 rounded-full">
                          <div className="h-full w-1/3 rounded-full bg-blue-600 animate-width-pulse delay-300" />
                        </div>
                      </div>
                      <div className="border-t border-white/5 pt-4">
                        <div className="flex justify-between text-xs font-mono text-slate-400 mb-3">
                          <span>Total Bill</span>
                          <span className="text-white font-bold">$142.50</span>
                        </div>
                        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-center text-xs font-bold text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] group-hover/card:shadow-[0_4px_30px_rgba(59,130,246,0.6)] transition-shadow">
                          Process Payment
                        </div>
                      </div>
                    </div>
                    {/* Shadow card behind */}
                    <div className="absolute inset-0 w-60 rounded-2xl border border-white/5 bg-white/[0.02] rotate-3 -z-10 translate-x-3 translate-y-3" />
                  </div>
                </div>

                {/* Terminal */}
                <div className="h-1/2 border-t border-white/[0.04] p-5">
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <FaTerminal /> Server Logs
                  </div>
                  <div className="h-[calc(100%-28px)]">
                    <TerminalUI logs={terminalLogs} label="server.js — node" cwd="~/restaurant-backend" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TIER 2: AI NOTES
           ══════════════════════════════════════════════ */}
        <div className="mb-48 section-reveal">
          <div className="mb-8">
            <SectionLabel
              icon={<FaRobot className="text-violet-400 text-sm" />}
              text="AI-Powered Platform · Production Ready"
              glow="bg-violet-500/10 border-violet-500/20"
            />
          </div>

          <div className="project-card group relative rounded-[2rem] overflow-hidden border border-white/[0.06]"
            style={{ background: "linear-gradient(135deg, #090b18 0%, #060810 100%)" }}>

            <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(99,102,241,0.08))", border: "1px solid rgba(139,92,246,0.25)" }} />

            <ParticleField color="#8b5cf6" />

            <div className="grid lg:grid-cols-12 min-h-[720px]">
              {/* LEFT */}
              <div className="lg:col-span-7 p-8 md:p-14 flex flex-col relative z-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 font-mono text-xs text-violet-500/70 mb-5">
                    <FaCodeBranch /> {aiNotesData.version}
                    <span className="text-slate-700">·</span>
                    <span className="text-slate-600 truncate max-w-[200px]">{aiNotesData.lastCommit}</span>
                  </div>

                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-5xl">{aiNotesData.emoji}</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{aiNotesData.title}</h2>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6"
                    style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.1), transparent)", borderLeft: "3px solid #8b5cf6" }}>
                    <span className="text-sm text-violet-300 font-mono">{aiNotesData.tagline}</span>
                  </div>

                  <p className="text-slate-400 leading-relaxed">{aiNotesData.description}</p>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2.5 mb-10 pb-8 border-b border-white/[0.06]">
                  {aiNotesData.stack.map((t, i) => <TechPill key={i} {...t} />)}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {aiNotesData.stats.map((s, i) => (
                    <div key={i} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group/s">
                      <div className="text-2xl font-black text-white mb-1 group-hover/s:text-violet-400 transition-colors">{s.value}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{s.label}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5 font-mono">{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* AI Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FaBolt className="text-violet-500" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">AI-Powered Features</span>
                  </div>
                  {aiNotesData.aiFeatures.map((f, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-300">
                      <div className="text-lg mt-0.5">{f.icon}</div>
                      <div>
                        <h5 className="font-bold text-white text-sm">{f.title}</h5>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech breakdown */}
                <div className="rounded-xl p-5 border border-white/[0.06] bg-white/[0.02] mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FaServer className="text-violet-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Technical Architecture</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-bold text-violet-400 mb-2 uppercase">Frontend</div>
                      <ul className="space-y-2">
                        {aiNotesData.techStack.frontend.map((item, i) => (
                          <li key={i} className="flex gap-2 text-slate-400 text-xs">
                            <FaRegCheckCircle className="mt-0.5 text-violet-500 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-blue-400 mb-2 uppercase">Backend & AI</div>
                      <ul className="space-y-2">
                        {aiNotesData.techStack.backend.map((item, i) => (
                          <li key={i} className="flex gap-2 text-slate-400 text-xs">
                            <FaRegCheckCircle className="mt-0.5 text-blue-500 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-auto pt-8 border-t border-white/[0.06]">
                  <a href={aiNotesData.demo} target="_blank" rel="noopener noreferrer"
                    className="cta-violet group flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm">
                    <FaExternalLinkAlt className="group-hover:rotate-45 transition-transform duration-300" />
                    Launch Live Demo
                  </a>
                  <a href={aiNotesData.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-7 py-3.5 rounded-xl bg-white/[0.04] text-white font-bold text-sm border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                    <FaGithub size={18} /> View Source
                  </a>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-5 bg-[#03040e] border-l border-white/[0.04] flex flex-col">
                <div className="h-1/2 flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(139,92,246,0.08), transparent 70%)" }} />
                  <div className="card-float relative z-10 w-64">
                    <div className="w-full bg-[#0e1020]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-5 hover:scale-105 transition-transform duration-500">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.6)]">
                            <FaBolt className="text-white text-xs" />
                          </div>
                          <span className="text-xs font-bold text-slate-300">AI Notes</span>
                        </div>
                        <div className="flex gap-1">
                          {[0, 75, 150].map(d => (
                            <div key={d} className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: d === 0 ? '#34d399' : d === 75 ? '#60a5fa' : '#a78bfa', animationDelay: `${d}ms` }} />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-3 rounded-lg bg-[#0a0c18] border border-white/[0.06]">
                          <div className="h-1.5 w-3/4 rounded-full bg-violet-600/30 mb-2 ai-scan" />
                          <div className="h-1.5 w-1/2 rounded-full bg-slate-800" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="px-2 py-2 rounded-lg bg-violet-600/10 border border-violet-500/20 text-center text-[9px] text-violet-300 font-bold">AI Summary</div>
                          <div className="px-2 py-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-center text-[9px] text-blue-300 font-bold">AI Improve</div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {['#work', '#productivity', '#ai'].map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-400 text-[9px] font-mono border border-emerald-500/20">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/[0.04] space-y-2">
                        {[["Clerk Auth", "text-violet-400", FaLock], ["MongoDB", "text-green-400", FaDatabase], ["Gemini AI", "text-orange-400", FaBolt]].map(([label, cls, Icon], i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                            <Icon className={cls} />
                            <span>{label}</span>
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-1/2 border-t border-white/[0.04] p-5">
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <FaTerminal /> AI Integration Logs
                  </div>
                  <div className="h-[calc(100%-28px)]">
                    <TerminalUI logs={aiNotesLogs} label="route.ts — next.js" cwd="~/ai-notes-app" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TIER 3: ONLINE ASSESSMENT
           ══════════════════════════════════════════════ */}
        <div className="mb-48 section-reveal">
          <div className="mb-8">
            <SectionLabel
              icon={<FaShieldAlt className="text-purple-400 text-sm" />}
              text="Secure Enterprise Module"
              glow="bg-purple-500/10 border-purple-500/20"
            />
          </div>

          <div className="group relative rounded-[2rem] overflow-hidden border border-white/[0.06]"
            style={{ background: "linear-gradient(135deg, #0a0b18 0%, #060710 100%)" }}>

            <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ border: "1px solid rgba(168,85,247,0.25)" }} />

            <ParticleField color="#a855f7" />

            <div className="grid lg:grid-cols-2 relative z-10">
              {/* LEFT */}
              <div className="p-10 md:p-14 flex flex-col border-r border-white/[0.04]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-[10px] uppercase tracking-[0.2em] font-bold text-purple-400 mb-6 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  EdTech Security
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{oaData.emoji}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{oaData.title}</h3>
                </div>

                <p className="text-slate-400 leading-relaxed mb-8">{oaData.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {oaData.stack.map((t, i) => <TechPill key={i} {...t} />)}
                </div>

                {/* Role switcher */}
                <div className="rounded-xl p-5 border border-white/[0.06] bg-white/[0.02] mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">View features as:</span>
                    <div className="flex bg-black/30 rounded-lg p-0.5 border border-white/[0.06]">
                      {["admin", "student"].map(r => (
                        <button key={r} onClick={() => setOaRole(r)}
                          className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all duration-300 ${oaRole === r ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]" : "text-slate-500 hover:text-slate-300"}`}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ul className="space-y-3 min-h-[120px]">
                    {oaData.features[oaRole].map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300 animate-slide-up">
                        <FaRegCheckCircle className="mt-0.5 text-purple-500 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href={oaData.demo} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors">
                    View Application
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href={oaData.github} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors">
                    <FaGithub /> Source Code
                  </a>
                </div>
              </div>

              {/* RIGHT */}
              <div className="p-10 md:p-14 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.04), transparent)" }} />
                <h4 className="text-xs font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <FaLock className="text-purple-500" /> Security Architecture
                </h4>

                <div className="grid gap-3 relative z-10 mb-8">
                  {oaData.securityFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/25 hover:bg-purple-500/5 transition-all duration-300 group/s">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center text-slate-500 group-hover/s:text-purple-400 transition-colors border border-white/[0.06]">
                        {[<FaFingerprint />, <FaShieldAlt />, <FaBolt />, <FaCodeBranch />][i]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">{feat}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-0.5">✓ Verified</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#03040e] border border-white/[0.06] font-mono text-[10px] text-slate-500 leading-relaxed relative z-10">
                  <span className="text-purple-400">const</span> verifyToken = (req, res, next) ={">"} {"{"}<br />
                  &nbsp;&nbsp;<span className="text-blue-400">const</span> token = req.cookies.access_token;<br />
                  &nbsp;&nbsp;<span className="text-pink-400">if</span> (!token) <span className="text-pink-400">return</span> next(createError(401));<br />
                  &nbsp;&nbsp;jwt.verify(token, process.env.JWT_SECRET...);<br />
                  {"}"};
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TIER 4: UTILITY CARDS
           ══════════════════════════════════════════════ */}
        <div className="section-reveal">
          <div className="mb-8">
            <SectionLabel
              icon={<FaLaptopCode className="text-blue-400 text-sm" />}
              text="Utility Modules & Interface Studies"
              glow="bg-blue-500/10 border-blue-500/20"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasksData.map((task, idx) => {
              const colors = {
                cyan: { border: "hover:border-cyan-500/30", bg: "hover:bg-cyan-500/5", text: "group-hover:text-cyan-400", tag: "text-cyan-400 border-cyan-500/20 bg-cyan-900/20", dot: "bg-cyan-500" },
                emerald: { border: "hover:border-emerald-500/30", bg: "hover:bg-emerald-500/5", text: "group-hover:text-emerald-400", tag: "text-emerald-400 border-emerald-500/20 bg-emerald-900/20", dot: "bg-emerald-500" },
                orange: { border: "hover:border-orange-500/30", bg: "hover:bg-orange-500/5", text: "group-hover:text-orange-400", tag: "text-orange-400 border-orange-500/20 bg-orange-900/20", dot: "bg-orange-500" },
              }[task.color];

              return (
                <div key={task.id}
                  className={`group relative flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 ${colors.border} ${colors.bg} transition-all duration-500 overflow-hidden cursor-default`}
                >
                  {/* Hover glow corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.dot}`} style={{ transform: "translate(50%, -50%)", opacity: 0 }} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-5">
                      <div className={`p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xl text-slate-400 ${colors.text} transition-all duration-300 group-hover:scale-110 group-hover:border-white/10`}>
                        {task.icon}
                      </div>
                      <div className="flex gap-1.5">
                        <a href={task.github} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-600 hover:text-white transition-all duration-200">
                          <FaGithub size={15} />
                        </a>
                        <a href={task.demo} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-600 hover:text-white transition-all duration-200">
                          <FaExternalLinkAlt size={13} />
                        </a>
                      </div>
                    </div>

                    <h4 className={`text-base font-bold text-white mb-2 ${colors.text} transition-colors duration-300`}>{task.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 grow">{task.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {task.tags.map((tag, i) => (
                        <span key={i} className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border font-mono ${colors.tag}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER LINK */}
        <div className="mt-28 text-center border-t border-white/[0.05] pt-14 section-reveal">
          <p className="text-slate-600 font-mono text-xs mb-5 uppercase tracking-widest">Find all my code here</p>
          <a href="https://github.com/Gokulakrishna15" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-slate-300 font-bold hover:text-white transition-colors duration-300 group">
            <FaGithub size={20} className="group-hover:scale-110 transition-transform" />
            github.com/Gokulakrishna15
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform text-slate-500" />
          </a>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&display=swap');

        /* ── ORBS ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          mix-blend-mode: screen;
          transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
          top: -100px; left: 10%;
          animation: orb-drift-1 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%);
          bottom: 10%; right: 5%;
          animation: orb-drift-2 15s ease-in-out infinite;
        }
        .orb-3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
          top: 50%; left: 50%;
          animation: orb-drift-3 18s ease-in-out infinite;
        }
        .grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, #000 60%, transparent 100%);
        }

        /* ── ANIMATIONS ── */
        @keyframes orb-drift-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(60px, 40px) scale(1.1); } }
        @keyframes orb-drift-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-40px, -60px) scale(0.9); } }
        @keyframes orb-drift-3 { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.2); } }

        @keyframes slide-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 30s linear infinite; width: max-content; }

        @keyframes card-float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .card-float { animation: card-float 5s ease-in-out infinite; }

        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }

        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink {
          display: inline-block; width: 7px; height: 13px;
          background: #38bdf8; margin-left: 4px; vertical-align: middle;
          animation: cursor-blink 1s step-end infinite;
          box-shadow: 0 0 8px rgba(56,189,248,0.8);
        }

        @keyframes width-pulse { 0%, 100% { width: 60%; } 50% { width: 90%; } }
        .animate-width-pulse { animation: width-pulse 2s ease-in-out infinite; }

        @keyframes ai-scan { 0% { opacity: 0.3; } 50% { opacity: 0.8; background: rgba(139,92,246,0.6); } 100% { opacity: 0.3; } }
        .ai-scan { animation: ai-scan 2s ease-in-out infinite; }

        @keyframes particle-float { from { transform: translateY(0px); opacity: 0.4; } to { transform: translateY(-20px); opacity: 0; } }

        @keyframes section-reveal { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .section-reveal { animation: section-reveal 0.8s ease-out forwards; }

        /* ── CTAs ── */
        .cta-primary {
          background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
          color: #000;
          box-shadow: 0 0 30px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.5);
          transition: all 0.3s;
        }
        .cta-primary:hover {
          box-shadow: 0 0 50px rgba(236,72,153,0.3), 0 4px 30px rgba(0,0,0,0.5);
          transform: scale(1.03);
        }

        .cta-violet {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: #fff;
          box-shadow: 0 0 30px rgba(139,92,246,0.3), 0 4px 20px rgba(0,0,0,0.5);
          transition: all 0.3s;
        }
        .cta-violet:hover {
          box-shadow: 0 0 50px rgba(139,92,246,0.5), 0 4px 30px rgba(0,0,0,0.5);
          transform: scale(1.03);
        }

        /* ── PROJECT CARD ── */
        .project-card {
          transition: box-shadow 0.5s;
        }
        .project-card:hover {
          box-shadow: 0 0 80px rgba(236,72,153,0.05), 0 25px 80px rgba(0,0,0,0.6);
        }

        /* ── STAT CARD ── */
        .stat-card {
          position: relative; overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at top left, rgba(236,72,153,0.05), transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .stat-card:hover::before { opacity: 1; }

        /* ── TAB CONTENT ── */
        .tab-content > * {
          animation: slide-up 0.35s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
