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
  FaShoppingCart,
  FaCreditCard,
  FaDatabase,
  FaRobot
} from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiStripe,
  SiSocketdotio,
  SiRedux,
  SiTailwindcss,
  SiCloudinary,
  SiJsonwebtokens,
  SiDocker,
  SiNestjs,
  SiGraphql,
  SiPrisma,
  SiNextdotjs,
  SiTypescript,
  SiApollographql
} from "react-icons/si";

// ==========================================
// 1. EXTENSIVE MOCK DATA & CONFIG
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

const graphqlLogs = [
  { time: "14:22:01", type: "info", msg: "GraphQL server ready at port 4000" },
  { time: "14:22:03", type: "success", msg: "Prisma Client initialized successfully" },
  { time: "14:22:05", type: "info", msg: "RBAC middleware: Validating user roles..." },
  { time: "14:23:42", type: "success", msg: "Query: fetchRestaurants - Role: MEMBER" },
  { time: "14:23:45", type: "warn", msg: "Mutation blocked: Unauthorized role MEMBER" },
  { time: "14:23:50", type: "success", msg: "Order created: ID ord_x9k2l - User: ADMIN" },
];

const restaurantData = {
  id: "restaurant",
  title: "🍽️ Restaurant Reservation Ecosystem",
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
  title: "🤖 AI Notes - Intelligent Note-Taking Platform",
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
      "Tailwind CSS 4 for modern styling",
      "Real-time search and filtering"
    ],
    backend: [
      "Next.js API Routes for serverless architecture",
      "MongoDB Atlas with Mongoose ODM",
      "Google Gemini AI API integration",
      "User-specific data isolation",
      "Comprehensive error handling"
    ]
  }
};

const oaData = {
  id: "online-assessment",
  title: "📝 Online Assessment System",
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

const sloozeData = {
  id: "slooze-challenge",
  title: "🍕 Slooze Food Ordering Platform",
  tagline: "Enterprise-Grade RBAC with GraphQL & Relational Access Control",
  description:
    "A sophisticated full-stack food ordering application implementing advanced role-based access control (RBAC) with geographical restrictions. Built with modern technologies to demonstrate enterprise-level architecture patterns and security best practices.",
  demo: "https://github.com/Gokulakrishna15/slooze-challenge",
  github: "https://github.com/Gokulakrishna15/slooze-challenge",
  version: "v1.0.0-production",
  lastCommit: "Final Submission",
  stack: [
    { name: "NestJS", icon: <SiNestjs className="text-red-500" /> },
    { name: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
    { name: "Prisma", icon: <SiPrisma className="text-blue-300" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
    { name: "Apollo", icon: <SiApollographql className="text-purple-400" /> },
  ],
  roles: [
    {
      name: "Admin",
      color: "red",
      permissions: ["View Restaurants", "Create Orders", "Checkout & Pay", "Cancel Orders", "Manage Payment Methods"],
      icon: <FaUserShield />
    },
    {
      name: "Manager",
      color: "blue",
      permissions: ["View Restaurants", "Create Orders", "Checkout & Pay", "Cancel Orders"],
      icon: <FaUsers />
    },
    {
      name: "Member",
      color: "green",
      permissions: ["View Restaurants", "Create Orders"],
      icon: <FaShoppingCart />
    }
  ],
  features: {
    rbac: [
      "Role-based access control for all operations",
      "Country-based restrictions (India/America)",
      "Hierarchical permission inheritance",
      "Dynamic authorization middleware"
    ],
    backend: [
      "Type-safe GraphQL API with NestJS",
      "Prisma ORM for database management",
      "Custom decorators for role validation",
      "Comprehensive error handling"
    ],
    frontend: [
      "Server-side rendering with Next.js",
      "Apollo Client for GraphQL state management",
      "Type-safe operations with generated types",
      "Responsive Tailwind UI components"
    ]
  },
  techHighlights: [
    {
      title: "GraphQL Architecture",
      desc: "Leveraged GraphQL's type system to create a strongly-typed API with automatic schema validation and introspection.",
      icon: <SiGraphql className="text-pink-400" />
    },
    {
      title: "RBAC Implementation",
      desc: "Designed a flexible role-based access control system using NestJS guards and decorators for declarative authorization.",
      icon: <FaUserShield className="text-blue-400" />
    },
    {
      title: "Type Safety",
      desc: "End-to-end type safety from database schema to frontend components using Prisma, TypeScript, and GraphQL code generation.",
      icon: <SiTypescript className="text-cyan-400" />
    }
  ],
  countries: ["India 🇮🇳", "America 🇺🇸"]
};

const tasksData = [
  {
    id: "password-reset",
    title: "🔑 Auth & Recovery",
    desc: "A security microservice focusing on the critical 'Forgot Password' flow. Implements secure token generation, email links, and bcrypt hashing.",
    tags: ["Security", "Nodemailer", "Bcrypt"],
    demo: "https://password-reset-frontend-prod.netlify.app/",
    github: "https://github.com/Gokulakrishna15/password-reset-frontend",
    icon: <FaLock className="text-cyan-400" />
  },
  {
    id: "invoice-builder",
    title: "🧾 Invoice Generator",
    desc: "A utility tool for freelancers. Features dynamic form fields, tax calculations, and client-side PDF generation using React-PDF.",
    tags: ["React-PDF", "Forms", "Utility"],
    demo: "https://sensational-macaron-af7801.netlify.app/",
    github: "https://github.com/Gokulakrishna15/invoice-builder",
    icon: <FaFileInvoiceDollar className="text-green-400" />
  },
  {
    id: "movies",
    title: "🎬 Movie Discovery",
    desc: "An interface study using the OMDB API. Features debounced searching, infinite scroll pagination, and skeleton loading states.",
    tags: ["API Integration", "Debouncing", "UI"],
    demo: "https://tangerine-phoenix-243994.netlify.app/",
    github: "https://github.com/Gokulakrishna15/movies-search-app",
    icon: <FaRegImage className="text-orange-400" />
  },
];

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================

const SectionBadge = ({ children, color = "blue" }) => (
  <span
    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.2em] font-bold backdrop-blur-md shadow-lg transition-transform hover:scale-105 cursor-default
    ${
      color === "pink"
        ? "bg-pink-900/30 border-pink-500/50 text-pink-300 shadow-pink-900/20"
        : color === "purple"
        ? "bg-purple-900/30 border-purple-500/50 text-purple-300 shadow-purple-900/20"
        : color === "violet"
        ? "bg-violet-900/30 border-violet-500/50 text-violet-300 shadow-violet-900/20"
        : color === "emerald"
        ? "bg-emerald-900/30 border-emerald-500/50 text-emerald-300 shadow-emerald-900/20"
        : "bg-blue-900/30 border-blue-500/50 text-blue-300 shadow-blue-900/20"
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
      color === "pink" ? "bg-pink-400" : color === "purple" ? "bg-purple-400" : color === "violet" ? "bg-violet-400" : color === "emerald" ? "bg-emerald-400" : "bg-blue-400"
    }`} />
    {children}
  </span>
);

const TechPill = ({ icon, name }) => (
  <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-300 text-xs font-mono hover:border-slate-500 hover:text-white transition-all cursor-default">
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span>{name}</span>
  </div>
);

// Fixed: Uses useMemo to prevent "Impure Function" error with Math.random
const Terminal = () => {
  const durations = useMemo(() => terminalLogs.map(() => Math.random() * 2 + 1), []);

  return (
    <div className="w-full h-full bg-[#0d1117] rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
      <div className="flex gap-2 mb-3 pb-2 border-b border-slate-800">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="ml-2 text-slate-500">server.js — node</span>
      </div>
      <div className="grow space-y-1 opacity-80">
        {terminalLogs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-pulse" style={{ animationDuration: `${durations[i]}s` }}>
            <span className="text-slate-500">[{log.time}]</span>
            <span className={
              log.type === 'info' ? 'text-blue-400' : 
              log.type === 'success' ? 'text-green-400' : 
              log.type === 'warn' ? 'text-yellow-400' : 'text-slate-300'
            }>
              {log.type.toUpperCase()}:
            </span>
            <span className="text-slate-300">{log.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <span className="text-green-500">➜</span>
          <span className="text-cyan-400">~/restaurant-backend</span>
          <span className="text-slate-400 git-branch">git:(main)</span>
          <span className="animate-blink block w-2 h-4 bg-slate-400 ml-1" />
        </div>
      </div>
    </div>
  );
};

// Fixed: Uses useMemo to prevent "Impure Function" error with Math.random
const AINotesTerminal = () => {
  const durations = useMemo(() => aiNotesLogs.map(() => Math.random() * 2 + 1), []);

  return (
    <div className="w-full h-full bg-[#0d1117] rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
      <div className="flex gap-2 mb-3 pb-2 border-b border-slate-800">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="ml-2 text-slate-500">route.ts — next.js</span>
      </div>
      <div className="grow space-y-1 opacity-80">
        {aiNotesLogs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-pulse" style={{ animationDuration: `${durations[i]}s` }}>
            <span className="text-slate-500">[{log.time}]</span>
            <span className={
              log.type === 'info' ? 'text-blue-400' : 
              log.type === 'success' ? 'text-green-400' : 
              log.type === 'warn' ? 'text-yellow-400' : 'text-slate-300'
            }>
              {log.type.toUpperCase()}:
            </span>
            <span className="text-slate-300">{log.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <span className="text-green-500">➜</span>
          <span className="text-cyan-400">~/ai-notes-app</span>
          <span className="text-slate-400 git-branch">git:(main)</span>
          <span className="animate-blink block w-2 h-4 bg-slate-400 ml-1" />
        </div>
      </div>
    </div>
  );
};

// Fixed: Uses useMemo to prevent "Impure Function" error with Math.random
const GraphQLTerminal = () => {
  const durations = useMemo(() => graphqlLogs.map(() => Math.random() * 2 + 1), []);

  return (
    <div className="w-full h-full bg-[#0d1117] rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
      <div className="flex gap-2 mb-3 pb-2 border-b border-slate-800">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="ml-2 text-slate-500">main.ts — nestjs</span>
      </div>
      <div className="grow space-y-1 opacity-80">
        {graphqlLogs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-pulse" style={{ animationDuration: `${durations[i]}s` }}>
            <span className="text-slate-500">[{log.time}]</span>
            <span className={
              log.type === 'info' ? 'text-blue-400' : 
              log.type === 'success' ? 'text-green-400' : 
              log.type === 'warn' ? 'text-yellow-400' : 'text-slate-300'
            }>
              {log.type.toUpperCase()}:
            </span>
            <span className="text-slate-300">{log.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <span className="text-green-500">➜</span>
          <span className="text-cyan-400">~/slooze-backend</span>
          <span className="text-slate-400 git-branch">git:(main)</span>
          <span className="animate-blink block w-2 h-4 bg-slate-400 ml-1" />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300
      ${active ? "text-white" : "text-slate-500 hover:text-slate-300"}
    `}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500" />
    )}
  </button>
);

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export default function Projects() {
  const [activeTab, setActiveTab] = useState("overview"); 
  const [oaRole, setOaRole] = useState("admin"); 
  const [sloozeRole, setSloozeRole] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="projects"
      ref={containerRef}
      className="relative w-full py-24 px-4 md:px-8 bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-pink-500/30"
    >
      
      {/* --- DYNAMIC BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div 
            className="absolute top-0 left-1/4 w-200 h-200 bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen transition-transform duration-1000 ease-out"
            style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
         />
         <div 
            className="absolute bottom-0 right-1/4 w-150 h-150 bg-purple-600/5 rounded-full blur-[100px] mix-blend-screen transition-transform duration-1000 ease-out"
            style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)` }}
         />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-28 space-y-8 animate-fade-in-up">
          <SectionBadge color="blue">Portfolio & Engineering</SectionBadge>
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tighter">
              Built to Scale.
            </h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-20 -z-10" />
          </div>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed">
            Architecting digital experiences with precision. Below are selected works demonstrating mastery in <span className="text-white font-semibold">Full-Stack Development</span>, <span className="text-white font-semibold">AI Integration</span>, and <span className="text-white font-semibold">Security</span>.
          </p>
        </div>

        {/* =======================================================
            TIER 1: THE FLAGSHIP (RESTAURANT APP)
           ======================================================= */}
        <div className="mb-40">
          <div className="flex items-center gap-3 mb-6 px-2">
             <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <FaStar className="text-yellow-400 text-lg animate-pulse" />
             </div>
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Flagship Project • Production Grade
             </h3>
          </div>

          <div className="group relative rounded-[2.5rem] bg-[#0f172a] p-px shadow-2xl hover:shadow-pink-900/20 transition-all duration-500">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-30 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
            
            <div className="relative rounded-[2.4rem] bg-[#020617] overflow-hidden border border-slate-800">
              <div className="grid lg:grid-cols-12 min-h-212.5">
                
                {/* LEFT PANEL */}
                <div className="lg:col-span-7 p-8 md:p-14 flex flex-col border-r border-slate-800/50 relative bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.05),transparent_40%)]">
                  <div className="mb-10">
                    <div className="flex items-center gap-3 text-pink-500 font-mono text-xs mb-4">
                       <FaCodeBranch /> {restaurantData.version}
                       <span className="w-1 h-1 rounded-full bg-slate-600" />
                       <span className="text-slate-500 truncate max-w-50">{restaurantData.lastCommit}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                      {restaurantData.title}
                    </h2>
                    <p className="text-xl text-pink-400 font-medium mb-6 font-mono border-l-4 border-pink-500 pl-4">
                      {restaurantData.tagline}
                    </p>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      {restaurantData.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-slate-800">
                    {restaurantData.stack.map((tech, i) => (
                      <TechPill key={i} {...tech} />
                    ))}
                  </div>

                  {/* TABS */}
                  <div className="grow flex flex-col">
                    <div className="flex gap-8 mb-8 border-b border-slate-800">
                      {["overview", "architecture", "engineering", "ui/ux"].map((tab) => (
                        <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                          {tab}
                        </TabButton>
                      ))}
                    </div>

                    <div className="grow min-h-50 animate-fade-in">
                      {activeTab === "overview" && (
                        <div className="grid grid-cols-2 gap-6">
                          {restaurantData.stats.map((stat, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-colors group/stat">
                              <div className="text-3xl font-black text-white mb-2 group-hover/stat:text-pink-400 transition-colors">{stat.value}</div>
                              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">{stat.label}</div>
                              <div className="text-xs text-slate-500 mt-1 font-mono">{stat.sub}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "architecture" && (
                        <div className="space-y-6">
                           <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 font-mono text-xs text-slate-300">
                              <span className="text-pink-400">const</span> <span className="text-blue-400">socketHandler</span> = (io) ={">"} {'{'} <br/>
                              &nbsp;&nbsp;io.on(<span className="text-green-400">'connection'</span>, (socket) ={">"} {'{'} <br/>
                              &nbsp;&nbsp;&nbsp;&nbsp;socket.join(<span className="text-green-400">'restaurant_id'</span>); <br/>
                              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Real-time updates push</span> <br/>
                              &nbsp;&nbsp;&nbsp;&nbsp;socket.emit(<span className="text-green-400">'table_update'</span>, payload); <br/>
                              &nbsp;&nbsp;{'}'}); <br/>
                              {'}'}
                           </div>
                           <ul className="space-y-3">
                             {restaurantData.deepDive.architecture.map((item, i) => (
                               <li key={i} className="flex gap-3 text-slate-400 text-sm">
                                 <FaServer className="mt-1 text-blue-500 shrink-0" /> {item}
                               </li>
                             ))}
                           </ul>
                        </div>
                      )}

                      {activeTab === "engineering" && (
                         <div className="space-y-4">
                            <h4 className="text-sm font-bold text-white uppercase mb-2">Technical Hurdles Solved</h4>
                            {restaurantData.challenges.map((c, i) => (
                               <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                                  <div className="text-xl mt-1">{c.icon}</div>
                                  <div>
                                     <h5 className="font-bold text-white text-sm">{c.title}</h5>
                                     <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      )}

                      {activeTab === "ui/ux" && (
                        <ul className="space-y-4">
                          {restaurantData.deepDive.uiux.map((item, i) => (
                            <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed p-3 rounded-lg hover:bg-slate-900/50 transition-colors">
                              <FaPaintBrush className="mt-1 text-pink-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-slate-800/50">
                    <a 
                      href={restaurantData.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold shadow-2xl shadow-white/10 hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
                    >
                      <FaExternalLinkAlt className="group-hover:rotate-45 transition-transform" /> 
                      Launch Live Demo
                    </a>
                    
                    <a 
                      href={restaurantData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all"
                    >
                      <FaGithub size={20} /> 
                      View Source Code
                    </a>
                  </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-5 relative bg-[#050912] flex flex-col">
                   <div className="h-1/2 relative overflow-hidden flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_70%)]" />
                      
                      <div className="relative w-64 h-80 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl p-5 transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-20 group/card">
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-xs font-bold text-slate-500">Table #4</span>
                            <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold">OCCUPIED</span>
                         </div>
                         <div className="space-y-3 mb-6">
                            <div className="h-2 w-3/4 bg-slate-800 rounded-full animate-pulse"></div>
                            <div className="h-2 w-1/2 bg-slate-800 rounded-full animate-pulse delay-75"></div>
                         </div>
                         <div className="absolute bottom-5 left-5 right-5">
                            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                               <span>Total Bill</span>
                               <span className="text-white">$142.50</span>
                            </div>
                            <div className="w-full h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-bold text-white group-hover/card:bg-blue-500 transition-colors">
                               Process Payment
                            </div>
                         </div>
                      </div>
                      <div className="absolute w-60 h-72 bg-slate-800/50 rounded-2xl border border-slate-700/50 z-10 transform translate-x-12 translate-y-4 rotate-6" />
                   </div>
                   <div className="h-1/2 border-t border-slate-800 p-6 bg-[#02040a]">
                      <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                         <FaTerminal /> Server Logs
                      </div>
                      <Terminal />
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            TIER 2: AI INTELLIGENCE (AI NOTES) - NEW!
           ======================================================= */}
        <div className="mb-40">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                  <FaRobot className="text-violet-400 text-lg animate-pulse" />
               </div>
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  AI-Powered Platform • Production Ready
               </h3>
            </div>
            <div className="h-px bg-slate-800 grow ml-6 max-w-md hidden md:block"></div>
          </div>

          <div className="group relative rounded-[2.5rem] bg-[#0f172a] p-px shadow-2xl hover:shadow-violet-900/20 transition-all duration-500">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 opacity-30 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
            
            <div className="relative rounded-[2.4rem] bg-[#020617] overflow-hidden border border-slate-800">
              <div className="grid lg:grid-cols-12 min-h-212.5">
                
                {/* LEFT PANEL */}
                <div className="lg:col-span-7 p-8 md:p-14 flex flex-col border-r border-slate-800/50 relative bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.05),transparent_40%)]">
                  <div className="mb-10">
                    <div className="flex items-center gap-3 text-violet-500 font-mono text-xs mb-4">
                       <FaCodeBranch /> {aiNotesData.version}
                       <span className="w-1 h-1 rounded-full bg-slate-600" />
                       <span className="text-slate-500 truncate max-w-50">{aiNotesData.lastCommit}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                      {aiNotesData.title}
                    </h2>
                    <p className="text-xl text-violet-400 font-medium mb-6 font-mono border-l-4 border-violet-500 pl-4">
                      {aiNotesData.tagline}
                    </p>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      {aiNotesData.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-slate-800">
                    {aiNotesData.stack.map((tech, i) => (
                      <TechPill key={i} {...tech} />
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-12">
                    {aiNotesData.stats.map((stat, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-colors group/stat">
                        <div className="text-3xl font-black text-white mb-2 group-hover/stat:text-violet-400 transition-colors">{stat.value}</div>
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">{stat.label}</div>
                        <div className="text-xs text-slate-500 mt-1 font-mono">{stat.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* AI Features */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                      <FaBolt className="text-violet-500" /> AI-Powered Features
                    </h4>
                    {aiNotesData.aiFeatures.map((feature, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-violet-500/30 transition-colors">
                        <div className="text-xl mt-1">{feature.icon}</div>
                        <div>
                          <h5 className="font-bold text-white text-sm">{feature.title}</h5>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Implementation Details */}
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 mb-8">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <FaServer className="text-violet-500" /> Technical Architecture
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-violet-400 mb-2 uppercase">Frontend & UI</div>
                        <ul className="space-y-2">
                          {aiNotesData.techStack.frontend.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex gap-2 text-slate-400 text-xs">
                              <FaRegCheckCircle className="mt-0.5 text-violet-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-400 mb-2 uppercase">Backend & AI</div>
                        <ul className="space-y-2">
                          {aiNotesData.techStack.backend.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex gap-2 text-slate-400 text-xs">
                              <FaRegCheckCircle className="mt-0.5 text-blue-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t border-slate-800/50">
                    <a 
                      href={aiNotesData.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold shadow-2xl shadow-violet-500/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <FaExternalLinkAlt className="group-hover:rotate-45 transition-transform" /> 
                      Launch Live Demo
                    </a>
                    
                    <a 
                      href={aiNotesData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold border border-slate-700 hover:border-violet-500 hover:bg-slate-800 transition-all"
                    >
                      <FaGithub size={20} /> 
                      View Source Code
                    </a>
                  </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-5 relative bg-[#050912] flex flex-col">
                  {/* Visual Demo Card */}
                  <div className="h-1/2 relative overflow-hidden flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
                    
                    <div className="relative w-72 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500 z-20">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
                            <FaBolt className="text-white text-sm" />
                          </div>
                          <span className="text-xs font-bold text-slate-300">AI Notes</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
                          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150" />
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="h-2 w-3/4 bg-violet-600/30 rounded mb-2" />
                          <div className="h-2 w-1/2 bg-slate-800 rounded" />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 px-3 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-[10px] text-violet-300 font-bold text-center">
                            AI Summary
                          </div>
                          <div className="flex-1 px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-[10px] text-blue-300 font-bold text-center">
                            AI Improve
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['#work', '#productivity', '#ai'].map((tag, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-emerald-900/30 text-emerald-400 text-[9px] font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <div className="text-[10px] text-slate-500 mb-3 uppercase font-bold">Active Features</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <FaLock className="text-violet-500" />
                            <span>Clerk Auth</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <FaDatabase className="text-green-500" />
                            <span>MongoDB</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <FaBolt className="text-orange-500" />
                            <span>Gemini AI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="h-1/2 border-t border-slate-800 p-6 bg-[#02040a]">
                    <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <FaTerminal /> AI Integration Logs
                    </div>
                    <AINotesTerminal />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            TIER 3: THE SPOTLIGHT (ONLINE ASSESSMENT)
           ======================================================= */}
        <div className="mb-40">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
               <FaShieldAlt className="text-purple-500 text-xl" />
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Secure Enterprise Module
               </h3>
            </div>
            <div className="h-px bg-slate-800 grow ml-6 max-w-md hidden md:block"></div>
          </div>

          <div className="relative rounded-3xl bg-[#0b0f19] border border-slate-800 overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
             <div className="absolute top-0 right-0 w-125 h-125 bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-10 md:p-14 flex flex-col justify-center relative z-10">
                   <SectionBadge color="purple">EdTech Security</SectionBadge>
                   <h3 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4 leading-tight">
                      {oaData.title}
                   </h3>
                   <p className="text-slate-400 leading-relaxed mb-8">
                      {oaData.description}
                   </p>

                   <div className="flex gap-4 mb-8">
                      {oaData.stack.map((t, i) => (
                         <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg">
                            {t.icon} {t.name}
                         </div>
                      ))}
                   </div>

                   <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 mb-8">
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-xs font-bold text-slate-500 uppercase">View Features As:</span>
                         <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                            {["admin", "student"].map(r => (
                               <button 
                                  key={r}
                                  onClick={() => setOaRole(r)}
                                  className={`px-3 py-1 rounded-md text-xs font-bold capitalize transition-all ${oaRole === r ? "bg-purple-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
                               >
                                  {r}
                               </button>
                            ))}
                         </div>
                      </div>
                      <ul className="space-y-3 min-h-30">
                         {oaData.features[oaRole].map((f, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300 animate-fade-in">
                               <FaRegCheckCircle className="mt-1 text-purple-500" />
                               {f}
                            </li>
                         ))}
                      </ul>
                   </div>

                   <div className="flex gap-4">
                      <a href={oaData.demo} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white border-b-2 border-purple-500 pb-1 hover:text-purple-400 transition-colors">
                         View Application &rarr;
                      </a>
                   </div>
                </div>

                <div className="bg-[#05070e] border-l border-slate-800 p-10 md:p-14 relative overflow-hidden flex flex-col justify-center">
                   <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%] animate-shine pointer-events-none" />
                   
                   <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                      <FaLock className="text-purple-500" /> Security Architecture
                   </h4>
                   
                   <div className="grid gap-4">
                      {oaData.securityFeatures.map((feat, i) => (
                         <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition-colors flex items-center gap-4 group/sec">
                            <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center text-slate-500 group-hover/sec:text-purple-400 group-hover/sec:scale-110 transition-all">
                               {i === 0 ? <FaFingerprint /> : i === 1 ? <FaShieldAlt /> : i === 2 ? <FaBolt /> : <FaCodeBranch />}
                            </div>
                            <div>
                               <div className="text-sm font-bold text-slate-200">{feat}</div>
                               <div className="text-xs text-slate-500 font-mono">Verified</div>
                            </div>
                         </div>
                      ))}
                   </div>

                   <div className="mt-8 p-4 rounded-lg bg-[#020408] border border-slate-800 font-mono text-[10px] text-slate-400 opacity-70 overflow-hidden">
                      <span className="text-purple-400">const</span> verifyToken = (req, res, next) ={">"} {'{'} <br/>
                      &nbsp;&nbsp;<span className="text-blue-400">const</span> token = req.cookies.access_token; <br/>
                      &nbsp;&nbsp;<span className="text-pink-400">if</span> (!token) <span className="text-pink-400">return</span> next(createError(401, <span className="text-green-400">"Not Auth"</span>)); <br/>
                      &nbsp;&nbsp;jwt.verify(token, process.env.JWT_SECRET... <br/>
                      {'}'}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* =======================================================
            TIER 4: THE ENTERPRISE (SLOOZE CHALLENGE)
           ======================================================= */}
        <div className="mb-40">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <FaDatabase className="text-emerald-400 text-lg" />
               </div>
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Enterprise Architecture • GraphQL + RBAC
               </h3>
            </div>
            <div className="h-px bg-slate-800 grow ml-6 max-w-md hidden md:block"></div>
          </div>

          <div className="group relative rounded-[2.5rem] bg-[#0f172a] p-px shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-30 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
            
            <div className="relative rounded-[2.4rem] bg-[#020617] overflow-hidden border border-slate-800">
              <div className="grid lg:grid-cols-12 min-h-212.5">
                
                {/* LEFT PANEL */}
                <div className="lg:col-span-7 p-8 md:p-14 flex flex-col border-r border-slate-800/50 relative bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.05),transparent_40%)]">
                  <div className="mb-10">
                    <div className="flex items-center gap-3 text-emerald-500 font-mono text-xs mb-4">
                       <FaCodeBranch /> {sloozeData.version}
                       <span className="w-1 h-1 rounded-full bg-slate-600" />
                       <span className="text-slate-500 truncate max-w-50">{sloozeData.lastCommit}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                      {sloozeData.title}
                    </h2>
                    <p className="text-xl text-emerald-400 font-medium mb-6 font-mono border-l-4 border-emerald-500 pl-4">
                      {sloozeData.tagline}
                    </p>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      {sloozeData.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-slate-800">
                    {sloozeData.stack.map((tech, i) => (
                      <TechPill key={i} {...tech} />
                    ))}
                  </div>

                  {/* Role Permissions Showcase */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <FaUserShield className="text-emerald-500" /> Role-Based Permissions
                    </h4>
                    
                    <div className="flex gap-2 mb-6">
                      {sloozeData.roles.map((role, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSloozeRole(idx)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            sloozeRole === idx
                              ? role.color === 'red'
                                ? 'bg-red-600 text-white'
                                : role.color === 'blue'
                                ? 'bg-blue-600 text-white'
                                : 'bg-green-600 text-white'
                              : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {role.icon}
                          {role.name}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                      <ul className="space-y-3 min-h-35">
                        {sloozeData.roles[sloozeRole].permissions.map((perm, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-300 animate-fade-in">
                            <FaRegCheckCircle className={`mt-1 ${
                              sloozeData.roles[sloozeRole].color === 'red'
                                ? 'text-red-500'
                                : sloozeData.roles[sloozeRole].color === 'blue'
                                ? 'text-blue-500'
                                : 'text-green-500'
                            }`} />
                            {perm}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technical Highlights */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-sm font-bold text-white uppercase">Technical Innovations</h4>
                    {sloozeData.techHighlights.map((highlight, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                        <div className="text-xl mt-1">{highlight.icon}</div>
                        <div>
                          <h5 className="font-bold text-white text-sm">{highlight.title}</h5>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{highlight.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t border-slate-800/50">
                    <a 
                      href={sloozeData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold shadow-2xl shadow-white/10 hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
                    >
                      <FaGithub size={20} /> 
                      View Full Source Code
                    </a>
                  </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-5 relative bg-[#050912] flex flex-col">
                  <div className="h-1/2 relative overflow-hidden flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
                    
                    {/* Permission Matrix Card */}
                    <div className="relative w-72 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl p-6 z-20">
                      <div className="flex items-center justify-between mb-6">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Access Matrix</h5>
                        <FaGlobe className="text-emerald-400" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          {sloozeData.countries.map((country, i) => (
                            <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                              <div className="text-lg mb-1">{country.split(' ')[1]}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{country.split(' ')[0]}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-4 border-t border-slate-800">
                          <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold">Active Features</div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              Country Restrictions
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                              RBAC Enforcement
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                              GraphQL Auth Guards
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-1/2 border-t border-slate-800 p-6 bg-[#02040a]">
                    <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <FaTerminal /> GraphQL Server Logs
                    </div>
                    <GraphQLTerminal />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            TIER 5: THE LAB (TASKS)
           ======================================================= */}
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <FaLaptopCode className="text-blue-500 text-xl" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Utility Modules & Interface Studies
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasksData.map((task) => (
              <div 
                key={task.id} 
                className="group flex flex-col bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 hover:bg-slate-900 hover:border-slate-600 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-2xl text-slate-300 group-hover:scale-110 group-hover:bg-blue-900/20 group-hover:text-blue-400 transition-all">
                      {task.icon}
                    </div>
                    <div className="flex gap-2">
                        <a href={task.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-colors">
                           <FaGithub size={18} />
                        </a>
                        <a href={task.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-colors">
                           <FaExternalLinkAlt size={16} />
                        </a>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {task.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 grow">
                    {task.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {task.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase text-slate-500 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center border-t border-slate-800 pt-16">
            <p className="text-slate-500 font-mono text-sm mb-4">Looking for the code?</p>
            <a 
               href="https://github.com/Gokulakrishna15" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-white font-bold hover:text-pink-500 transition-colors"
            >
               <FaGithub /> github.com/Gokulakrishna15 <FaArrowRight className="text-xs" />
            </a>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        
        @keyframes shine { from { background-position: 200% center; } to { background-position: -200% center; } }
        .animate-shine { animation: shine 8s linear infinite; }
      `}</style>
    </section>
  );
}
