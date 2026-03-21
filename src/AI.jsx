import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  FaBrain, 
  FaMicrochip, 
  FaNetworkWired, 
  FaCode, 
  FaBolt, 
  FaFingerprint, 
  FaEye, 
  FaDatabase, 
  FaTerminal,
  FaRobot,
  FaServer,
  FaChevronRight,
  FaRegLightbulb,
  FaCogs,
  FaProjectDiagram,
  FaSatelliteDish,
  FaGlobe,
  FaHeartbeat,
  FaChartLine,
  FaLayerGroup,
  FaShieldAlt,
  FaSyncAlt,
  FaLaptopCode
} from "react-icons/fa";
import { 
  SiOpenai, 
  SiMongodb, 
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiVercel,
  SiDocker
} from "react-icons/si";

/**
 * =====================================================================
 * NEURAL_NEXUS_OS.JSX - FULL SCALE AI COMMAND CENTER
 * =====================================================================
 * An epic, highly interactive React dashboard visualizing the integration
 * of Large Language Models (LLMs) into the MERN stack and the global
 * impact of Artificial Intelligence.
 * * Features:
 * - 3D Mouse Tracking Cards
 * - Canvas-based Particle Physics
 * - Live Simulated Terminal/Chat
 * - Interactive Tech Stack Architecture Diagram
 * - Bento-box Grid for Global Impact Metrics
 * =====================================================================
 */

// --- 1. DATA STRUCTURES & CONTENT ---

const aiTools = [
  {
    id: "chatgpt",
    name: "ChatGPT-4o",
    role: "System Architecture",
    icon: <SiOpenai />, 
    color: "#10a37f",
    glow: "rgba(16, 163, 127, 0.5)",
    description: "My high-level sounding board for database schema design, system architecture planning, and complex debugging logic across the MERN stack.",
    capabilities: ["Schema Design", "Logic Debugging", "API Structuring"],
    metrics: [{ label: "Reasoning", value: 98 }, { label: "Versatility", value: 95 }, { label: "Speed", value: 88 }]
  },
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    role: "Deep Refactoring",
    icon: <FaBrain />,
    color: "#cc785c",
    glow: "rgba(204, 120, 92, 0.5)",
    description: "Exceptional at handling massive contexts. I feed it entire React component trees for precise refactoring, deep code reviews, and robust error handling.",
    capabilities: ["Large Context", "Code Review", "UI/UX Polish"],
    metrics: [{ label: "Context Window", value: 99 }, { label: "Nuance", value: 96 }, { label: "Safety", value: 94 }]
  },
  {
    id: "deepseek",
    name: "DeepSeek Coder",
    role: "Algorithmic Efficiency",
    icon: <FaCode />,
    color: "#4d84f5",
    glow: "rgba(77, 132, 245, 0.5)",
    description: "A highly focused coding assistant specialized in raw boilerplate, optimizing complex MongoDB aggregations, and rapid script generation.",
    capabilities: ["Boilerplate Gen", "Query Optimization", "Algorithms"],
    metrics: [{ label: "Code Gen Speed", value: 97 }, { label: "Optimization", value: 94 }, { label: "Syntax", value: 92 }]
  },
  {
    id: "gemini",
    name: "Google Gemini",
    role: "Research & Multimodal",
    icon: <FaBolt />,
    color: "#1a73e8",
    glow: "rgba(26, 115, 232, 0.5)",
    description: "Powerful for real-time web research and multimodal tasks. Synthesizes the latest npm package documentation and processes visual UI diagrams into code.",
    capabilities: ["Web Research", "Image-to-Code", "Data Parsing"],
    metrics: [{ label: "Real-time Info", value: 98 }, { label: "Multimodal", value: 95 }, { label: "Integration", value: 90 }]
  }
];

const chatSimulationLogs = [
  { sender: "user", text: "Analyze this React component for performance bottlenecks." },
  { sender: "claude", text: "Scanning 450 lines of code... I detect unnecessary re-renders in your useEffect dependency array. Implementing memoization..." },
  { sender: "user", text: "Generate a MongoDB aggregation pipeline for user analytics." },
  { sender: "deepseek", text: "Compiling optimized aggregation... Utilizing $match, $group, and $project stages for maximum query efficiency." },
  { sender: "user", text: "What's the latest Next.js caching strategy?" },
  { sender: "gemini", text: "Searching real-time docs... The latest App Router uses Data Cache and Full Route Cache. Here is the implementation guide..." }
];

const worldImpactData = [
  {
    icon: <FaHeartbeat />,
    title: "Predictive Healthcare",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    desc: "AI models diagnose diseases from medical imaging with higher accuracy than human doctors and predict patient outcomes based on historical health records."
  },
  {
    icon: <FaChartLine />,
    title: "Financial Security",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    desc: "Detecting microscopic anomalies to prevent fraud in milliseconds. AI algorithms analyze millions of transactions globally in real-time."
  },
  {
    icon: <FaGlobe />,
    title: "Hyper-Personalization",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    desc: "Platforms use machine learning algorithms to analyze behavior, predicting consumer needs, shaping media consumption, and customizing education."
  },
  {
    icon: <FaRobot />,
    title: "Mundane Automation",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    desc: "LLMs and RPA take over repetitive tasks—from drafting legal boilerplate to handling tier-1 customer support—freeing humans for creative strategy."
  }
];

const techStackLayers = [
  {
    id: "layer-1",
    name: "Development Layer",
    icon: <FaLaptopCode />,
    techs: [<SiReact />, <SiTailwindcss />],
    title: "AI-Assisted Coding & UI",
    desc: "Context-Aware IDEs read your entire codebase. You can ask them to refactor components across multiple files instantly. Tools like v0 generate complex, production-ready React interfaces from text prompts."
  },
  {
    id: "layer-2",
    name: "Application & Logic",
    icon: <FaServer />,
    techs: [<SiNodedotjs />, <SiOpenai />],
    title: "Generative Middleware",
    desc: "Instead of spending hours scaffolding REST APIs, models generate foundational boilerplate in seconds. AI acts as dynamic middleware, processing natural language inputs into structured JSON outputs."
  },
  {
    id: "layer-3",
    name: "Database Layer",
    icon: <FaDatabase />,
    techs: [<SiMongodb />],
    title: "Semantic Vector Memory",
    desc: "Traditional DBs search keywords. Modern stacks use Vector Search to store data as mathematical embeddings, allowing applications to perform 'Semantic Search' based on meaning and context (RAG)."
  },
  {
    id: "layer-4",
    name: "Infrastructure Layer",
    icon: <FaShieldAlt />,
    techs: [<SiVercel />, <SiDocker />],
    title: "Self-Healing CI/CD",
    desc: "AI monitors server loads predictively. It reads code commits, automatically writes integration tests, and scans for security vulnerabilities or inefficient routes before code ever reaches production."
  }
];

// --- 2. CUSTOM HOOKS ---

/**
 * Tracks mouse position relative to an element and calculates 
 * 3D rotation values for a holographic tilt effect.
 */
const useMouseTilt = (ref) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12; 
      const rotateY = ((x - centerX) / centerX) * 12;
      
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out"
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.5s ease-out"
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return style;
};

/**
 * Intersection Observer hook to trigger animations when elements scroll into view.
 */
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold }
    );
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [domRef, isVisible];
};

// --- 3. SUB-COMPONENTS ---

/**
 * Interactive Background Canvas
 * Renders a particle network that repels away from the user's cursor.
 */
const InteractiveNeuralNetwork = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, particles;
    let animationId;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((w * h) / 12000); 
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          color: Math.random() > 0.6 ? "rgba(6, 182, 212, " : Math.random() > 0.5 ? "rgba(168, 85, 247, " : "rgba(16, 163, 127, " 
        });
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const mouse = mouseRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        p1.x += p1.vx;
        p1.y += p1.vy;

        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 180) {
          const force = (180 - distMouse) / 180;
          p1.x -= (dxMouse / distMouse) * force * 4;
          p1.y -= (dyMouse / distMouse) * force * 4;
        }

        if (p1.x < 0 || p1.x > w) p1.vx *= -1;
        if (p1.y < 0 || p1.y > h) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color + "0.6)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - dist / 900})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    init();
    window.addEventListener("resize", init);
    animate();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen fixed" />;
};

/**
 * Animated Hero Graphic representing the "AI Brain"
 */
const QuantumCore = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center mb-16 animate-float z-20">
      <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow dashed-border z-0" />
      <div className="absolute inset-4 rounded-full border border-purple-500/30 animate-reverse-spin-slow z-0" />
      <div className="absolute inset-10 rounded-full border-t border-b border-green-500/40 animate-spin-fast z-0 opacity-50" />
      
      <div className="relative w-44 h-44 rounded-full bg-linear-to-br from-cyan-900 to-[#030014] shadow-[0_0_100px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden border border-cyan-500/50 z-10 group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.6),transparent_70%)] opacity-50 animate-pulse-fast" />
        <FaSatelliteDish className="text-7xl text-cyan-200 z-10 group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        
        <div className="absolute top-0 left-1/2 w-full h-[2px] bg-cyan-400/90 rotate-45 animate-scan-laser shadow-[0_0_15px_#22d3ee]" />
        <div className="absolute bottom-0 right-1/2 w-full h-[2px] bg-purple-400/90 -rotate-45 animate-scan-laser delay-200 shadow-[0_0_15px_#a855f7]" />
      </div>

      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute top-0 left-1/2 w-5 h-5 bg-cyan-400 rounded-full shadow-[0_0_25px_#22d3ee] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>
      </div>
      <div className="absolute inset-12 animate-reverse-spin-slow">
        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_#a855f7] -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full animate-ping delay-100" />
        </div>
      </div>
    </div>
  );
};

/**
 * Simulated Live Terminal showing AI Agent communications.
 */
const AIChatSimulator = () => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (currentIndex >= chatSimulationLogs.length) {
      const timeout = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
      }, 6000);
      return () => clearTimeout(timeout);
    }

    const currentMsg = chatSimulationLogs[currentIndex];
    
    if (currentMsg.sender === "user") {
      setMessages(prev => [...prev, currentMsg]);
      setCurrentIndex(prev => prev + 1);
      setIsTyping(true);
    } else {
      const timeout = setTimeout(() => {
        setMessages(prev => [...prev, currentMsg]);
        setCurrentIndex(prev => prev + 1);
        setIsTyping(false);
      }, 1500 + Math.random() * 1500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAgentColor = (sender) => {
    switch(sender) {
      case "claude": return "text-[#cc785c] border-[#cc785c]/40 bg-[#cc785c]/10";
      case "deepseek": return "text-[#4d84f5] border-[#4d84f5]/40 bg-[#4d84f5]/10";
      case "gemini": return "text-[#1a73e8] border-[#1a73e8]/40 bg-[#1a73e8]/10";
      default: return "text-cyan-400 border-cyan-400/40 bg-cyan-400/10";
    }
  };

  return (
    <div className="w-full max-w-lg bg-[#05050a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-0 font-mono text-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col h-80 z-20 hover:border-cyan-500/30 transition-colors duration-500">
      <div className="h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/10 shrink-0">
        <FaTerminal className="text-slate-300" />
        <span className="text-xs text-slate-100 font-bold tracking-widest">MULTI_AGENT_ROUTER.exe</span>
        <div className="ml-auto flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col animate-slide-up ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] uppercase text-slate-300 mb-1 ml-1 font-bold">{msg.sender}</span>
            <div className={`p-3.5 rounded-xl max-w-[90%] border backdrop-blur-md shadow-lg leading-relaxed text-xs md:text-sm ${msg.sender === 'user' ? 'bg-slate-800/80 border-slate-600 text-slate-100 rounded-tr-none' : `${getAgentColor(msg.sender)} rounded-tl-none`}`}>
               {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start animate-fade-in">
             <span className="text-[10px] uppercase text-slate-300 mb-1 ml-1 animate-pulse">AGENT ROUTING...</span>
             <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 rounded-tl-none flex gap-1.5 items-center h-11">
               <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-70 shadow-[0_0_15px_#22d3ee]" />
    </div>
  );
};

/**
 * 3D Holographic Tool Card for the Model Toolkit section.
 */
const ToolCard = ({ tool }) => {
  const cardRef = useRef(null);
  const tiltStyle = useMouseTilt(cardRef);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-300 z-20 cursor-crosshair h-full flex flex-col"
      style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
    >
      <div 
        className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-25' : ''}`} 
        style={{ background: `radial-gradient(circle at 50% 0%, ${tool.glow}, transparent 75%)` }}
      />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 group-hover:opacity-60 transition-opacity" />

      <div className="relative z-10 flex-1" style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start mb-6">
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 opacity-0 group-hover:opacity-40 animate-pulse transition-opacity" style={{ backgroundColor: tool.color }} />
            <span className="text-4xl relative z-10" style={{ color: tool.color }}>{tool.icon}</span>
          </div>
          <div className="flex flex-col items-end">
            <FaFingerprint className={`text-3xl transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-20 text-slate-400'}`} style={{ color: isHovered ? tool.color : undefined, filter: isHovered ? `drop-shadow(0 0 10px ${tool.color})` : 'none' }} />
            <span className="text-[9px] uppercase tracking-[0.3em] text-slate-300 mt-2 font-mono opacity-80">SYNCED</span>
          </div>
        </div>

        <h4 className="text-2xl font-black text-white mb-2 tracking-tight">{tool.name}</h4>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 mb-4 shadow-inner">
           <FaBolt size={10} style={{ color: tool.color }} className="animate-pulse" />
           <p className="text-[11px] font-mono text-slate-200 tracking-wider uppercase">{tool.role}</p>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed mb-6">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.capabilities.map((cap, idx) => (
            <span key={idx} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border bg-black/50 text-slate-200 backdrop-blur-md" style={{ borderColor: `${tool.color}50` }}>
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-3 mt-auto pt-5 border-t border-white/10" style={{ transform: "translateZ(25px)" }}>
        {tool.metrics.map((metric, i) => (
          <div key={i} className="group/metric">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-300 mb-1.5 font-mono">
              <span className="group-hover/metric:text-white transition-colors">{metric.label}</span>
              <span className="text-white group-hover/metric:scale-110 transition-transform font-bold">{metric.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/80 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full rounded-full transition-all duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1) relative overflow-hidden"
                style={{ 
                  width: isHovered ? `${metric.value}%` : '0%',
                  backgroundColor: tool.color,
                  boxShadow: isHovered ? `0 0 15px ${tool.color}` : 'none'
                }}
              >
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Bento Box Grid displaying AI's Macro Impact on the world.
 */
const WorldImpactGrid = () => {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto mt-40 relative z-20">
      <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          <FaGlobe className="animate-spin-slow" /> Global Paradigm Shift
        </div>
        <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
          AI IN THE <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">MODERN WORLD</span>
        </h3>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg">
          Beyond the code editor, Artificial Intelligence is fundamentally acting as a massive multiplier for human capability across every major industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {worldImpactData.map((item, idx) => (
          <div 
            key={idx} 
            className={`glass-card p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-700 group flex flex-col sm:flex-row gap-6 items-start ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div className={`p-5 rounded-2xl ${item.bg} border ${item.border} ${item.color} text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shrink-0`}>
              {item.icon}
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
              <p className="text-slate-200 leading-relaxed text-sm">{item.desc}</p>
              
              {/* Decorative data stream line */}
              <div className="mt-6 h-[2px] w-full bg-slate-800 rounded-full overflow-hidden relative">
                 <div className={`absolute top-0 bottom-0 left-0 w-1/3 ${item.bg.replace('/10', '/50')} animate-scan-line-horizontal`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Interactive Layered Architecture Diagram mapping AI to the MERN stack.
 */
const TechStackArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState(techStackLayers[0].id);
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto mt-40 relative z-20 bg-[#05050a]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
          AI IN MODERN <span className="text-cyan-400">TECH STACKS</span>
        </h3>
        <p className="text-slate-200 uppercase tracking-widest font-mono text-sm">The Evolution of the Software Development Life Cycle</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Interactive Layers Map */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 perspective-1000">
          {techStackLayers.map((layer, idx) => {
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 flex items-center gap-6 group relative overflow-hidden
                  ${isActive 
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-[1.02]' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
              >
                {/* Selection indicator line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500 ${isActive ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-transparent'}`} />
                
                <div className={`p-4 rounded-xl border transition-all duration-500 ${isActive ? 'bg-cyan-900/50 border-cyan-400/50 text-cyan-300' : 'bg-black/40 border-white/10 text-slate-400 group-hover:text-slate-200'}`}>
                  <span className="text-2xl">{layer.icon}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className={`text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {layer.name}
                  </h4>
                  <p className={`text-sm mt-1 transition-colors ${isActive ? 'text-cyan-200/70 font-mono' : 'text-slate-400'}`}>
                    Layer 0{idx + 1} System
                  </p>
                </div>

                <div className={`flex gap-3 text-2xl transition-all duration-500 ${isActive ? 'opacity-100 text-white' : 'opacity-30 text-slate-400'}`}>
                  {layer.techs.map((t, i) => <span key={i}>{t}</span>)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Panel */}
        <div className="w-full lg:w-1/2 bg-black/60 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
           {/* Grid background */}
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0zOS0xdjM4SDFWMWgzOHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-50 z-0 pointer-events-none" />
           
           {techStackLayers.map((layer) => (
             <div 
                key={`detail-${layer.id}`}
                className={`absolute inset-8 md:inset-12 flex flex-col justify-center transition-all duration-700 ease-in-out z-10
                  ${activeLayer === layer.id 
                    ? 'opacity-100 translate-x-0 pointer-events-auto' 
                    : 'opacity-0 translate-x-12 pointer-events-none'
                  }`}
             >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest w-fit mb-6">
                  <FaSyncAlt className="animate-spin" /> Active Integration
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  {layer.title}
                </h3>
                
                <p className="text-slate-200 text-lg leading-relaxed mb-8">
                  {layer.desc}
                </p>

                {/* Decorative terminal representation */}
                <div className="w-full h-12 bg-black/80 rounded-lg border border-white/10 flex items-center px-4 font-mono text-xs text-slate-300 overflow-hidden relative">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/50 animate-pulse" />
                   <span className="text-green-400 mr-2">root@nexus:~#</span> 
                   <span className="text-slate-200 typing-animation block whitespace-nowrap overflow-hidden border-r-2 border-slate-300 pr-1">
                      systemctl status ai-agent-{layer.id.split('-')[1]}
                   </span>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

// --- 4. MAIN LAYOUT EXPORT ---

export default function NeuralNexusOS() {
  return (
    <section id="ai-os" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#030014] overflow-hidden text-slate-100 flex flex-col items-center selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      
      {/* =========================================
          MASSIVE CUSTOM CSS INJECTION ENGINE
          ========================================= */}
      <style>{`
        /* Core Physics & Floats */
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin-slow { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes spin-fast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        /* Laser, Scanners & Data Streams */
        @keyframes scan-laser { 0% { top: -10%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
        @keyframes scan-line-horizontal { 0% { left: -33%; } 100% { left: 100%; } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        
        /* Entrance & State Transitions */
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-fast { 0%, 100% { opacity: 0.3; transform: scale(0.95); } 50% { opacity: 0.7; transform: scale(1.05); } }
        
        /* Typographic Effects */
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: rgba(203, 213, 225, 1); } }

        /* Utility Class Bindings */
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .animate-reverse-spin-slow { animation: reverse-spin-slow 20s linear infinite; }
        .animate-spin-fast { animation: spin-fast 5s linear infinite; }
        .animate-scan-laser { animation: scan-laser 3.5s ease-in-out infinite; }
        .animate-scan-line-horizontal { animation: scan-line-horizontal 2.5s linear infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-pulse-fast { animation: pulse-fast 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2.5s infinite; }
        
        /* Specialized Complex Animations */
        .typing-animation {
          animation: typing 2s steps(40, end), blink-caret .75s step-end infinite;
          width: fit-content;
        }
        
        /* UI Material Effects */
        .glass-card {
          background: rgba(10, 10, 15, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        /* Advanced SVG Borders */
        .dashed-border {
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='1000' ry='1000' stroke='%2322d3ee55' stroke-width='2' stroke-dasharray='10%2c 25' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
          border: none;
        }

        /* 3D Perspective Utilities */
        .perspective-1000 { perspective: 1000px; }

        /* Clean Scrollbars for sub-components */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- BACKGROUND INFRASTRUCTURE --- */}
      <InteractiveNeuralNetwork />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(17,24,39,0)_0%,rgba(3,0,20,1)_70%)] pointer-events-none z-10 fixed" />

      <div className="relative z-20 max-w-7xl w-full flex flex-col items-center">
        
        {/* =========================================
            SECTION 1: HERO & TERMINAL
            ========================================= */}
        <div className="text-center mb-16 pt-10 animate-slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Neural OS Online
          </div>
          
          <h2 className="text-6xl md:text-[5.5rem] font-black text-transparent bg-clip-text bg-linear-to-b from-white via-slate-200 to-slate-600 tracking-tighter mb-8 drop-shadow-2xl leading-none">
            HUMAN <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">+</span> AI SYNERGY
          </h2>
          
          <p className="text-slate-200 max-w-3xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
            I orchestrate a swarm of specialized LLMs to build software. By combining the architectural reasoning of <strong className="text-white">ChatGPT</strong>, the massive context depth of <strong className="text-white">Claude</strong>, and the raw algorithmic speed of <strong className="text-white">DeepSeek</strong>, I deliver full-stack applications at 10x velocity.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-16 w-full mb-32 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-cyan-900/10 blur-[150px] rounded-[100%] pointer-events-none" />
           <div className="flex-1 flex justify-center w-full">
             <QuantumCore />
           </div>
           <div className="flex-1 w-full flex justify-center xl:justify-start">
             <AIChatSimulator />
           </div>
        </div>

        {/* =========================================
            SECTION 2: MULTI-AGENT TOOLKIT
            ========================================= */}
        <div className="w-full relative z-20 mt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
            <div>
               <div className="flex items-center gap-4 mb-3">
                 <FaNetworkWired className="text-4xl text-purple-400 animate-pulse" />
                 <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Active Model Roster</h3>
               </div>
               <p className="text-slate-200 text-sm md:text-base max-w-2xl">Real-time telemetry and capability breakdown of the integrated language models powering my local development environment.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-4 py-2 rounded-lg border border-cyan-500/30">
                 <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                 API STATUS: OK
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {aiTools.map((tool) => (
              <div key={tool.id} className="h-[480px]">
                 <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            SECTION 3: MACRO IMPACT (THE MODERN WORLD)
            ========================================= */}
        <WorldImpactGrid />

        {/* =========================================
            SECTION 4: MICRO IMPACT (TECH STACKS)
            ========================================= */}
        <TechStackArchitecture />

        {/* =========================================
            SECTION 5: FOOTER CTA & CONCLUSION
            ========================================= */}
        <div className="mt-48 mb-24 w-full relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-600 via-purple-600 to-cyan-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-50 transition duration-1000 animate-shimmer bg-[length:200%_auto]" />
          
          <div className="relative bg-[#05050a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl">
             
             {/* Abstract Background Tech Graphics */}
             <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-10 opacity-[0.03] pointer-events-none gap-8 text-[12rem] overflow-hidden">
                <SiReact className="animate-spin-slow" />
                <SiNodedotjs className="animate-float delay-150" />
             </div>

             <div className="z-10 max-w-3xl">
               <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                 Ready to architect the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">future?</span>
               </h3>
               <p className="text-slate-100 text-lg md:text-xl mb-10 leading-relaxed font-normal">
                 The most successful developers today aren't replacing themselves with AI; they are pairing with it. Combining traditional engineering mastery with modern AI orchestration means faster delivery, fewer bugs, and infinitely scalable architectures.
               </p>
               <button className="flex items-center gap-4 px-10 py-5 bg-white text-black font-black text-lg rounded-full hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300">
                 Initialize Project <FaChevronRight className="text-sm" />
               </button>
             </div>
             
             <div className="z-10 relative w-56 h-56 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl shrink-0 hidden md:flex">
                <div className="absolute inset-3 rounded-full border border-cyan-500/40 animate-spin-slow dashed-border" />
                <div className="absolute inset-8 rounded-full border border-purple-500/20 animate-reverse-spin-slow" />
                <FaRegLightbulb className="text-7xl text-cyan-300 animate-pulse-fast drop-shadow-[0_0_25px_rgba(34,211,238,1)]" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
