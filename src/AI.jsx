import React, { useState, useEffect, useRef, useMemo } from "react";
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
  FaServer
} from "react-icons/fa";
import { 
  SiOpenai, 
  SiGithubcopilot, 
  SiMongodb, 
  SiPostman, 
  SiVercel,
  SiNodedotjs 
} from "react-icons/si";

/**
 * =====================================================================
 * AI.JSX - "THE PRO MERN STACK"
 * =====================================================================
 */

// --- DATA: PROFESSIONAL MERN AI TOOLKIT ---
const aiTools = [
  {
    id: "cursor",
    name: "Cursor (IDE)",
    role: "AI-Native Coding",
    icon: <FaCode />, // Cursor doesn't have a standard icon yet, using generic code
    color: "#373737", // Dark grey/black theme
    description: "The industry-standard AI editor. I use Cursor Composer to scaffold entire MERN features (Frontend + Backend) in one shot, and its 'Codebase Context' feature to debug across 50+ files instantly.",
    metrics: [
      { label: "Velocity", value: 99 },
      { label: "Context", value: 98 }
    ]
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    role: "Generative UI",
    icon: <SiVercel />,
    color: "#000000",
    description: "Generates production-ready React/Tailwind components from simple text prompts. I use it to build complex dashboards and landing pages in minutes, then wire them to my Node.js backend.",
    metrics: [
      { label: "UI Speed", value: 95 },
      { label: "Tailwind", value: 99 }
    ]
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    role: "Smart Autocomplete",
    icon: <SiGithubcopilot />,
    color: "#ffffff",
    description: "Essential for reducing boilerplate. It predicts my next logic steps in Express.js middleware and React hooks, allowing me to focus on system architecture rather than syntax.",
    metrics: [
      { label: "Boilerplate", value: 92 },
      { label: "Accuracy", value: 90 }
    ]
  },
  {
    id: "mongodb-vector",
    name: "MongoDB Atlas Vector",
    role: "Semantic Search",
    icon: <SiMongodb />,
    color: "#47A248",
    description: "Building AI-powered search features (RAG) directly into my MERN apps. I use Atlas Vector Search to store embeddings, enabling 'Chat with your Data' features without external vector DBs.",
    metrics: [
      { label: "RAG Setup", value: 90 },
      { label: "Scalability", value: 95 }
    ]
  },
  {
    id: "postman-ai",
    name: "Postmanbot AI",
    role: "API Testing",
    icon: <SiPostman />,
    color: "#FF6C37",
    description: "Automates test generation for my Express.js routes. It analyzes my API documentation and writes comprehensive integration tests to ensure 100% backend reliability.",
    metrics: [
      { label: "Test Cov", value: 94 },
      { label: "Debugging", value: 88 }
    ]
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    role: "Backend Intelligence",
    icon: <SiOpenai />,
    color: "#10a37f",
    description: "Direct integration of GPT-4o into Node.js backends. I build custom agents for data analysis, content summarization, and automated customer support directly within my applications.",
    metrics: [
      { label: "Logic", value: 98 },
      { label: "Integration", value: 95 }
    ]
  }
];

// --- COMPONENT: Neural Network Background ---
const NeuralNetwork = () => {
  const canvasRef = useRef(null);

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
      const count = Math.floor((w * h) / 15000); 
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? "rgba(6, 182, 212, " : "rgba(168, 85, 247, " 
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > w) p1.vx *= -1;
        if (p1.y < 0 || p1.y > h) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color + "0.5)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist / 1200})`;
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
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- COMPONENT: Arc Reactor Core ---
const ArcReactor = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center mb-16 animate-pulse-slow">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-spin-slow dashed-border" />
      <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-reverse-spin" />
      
      <div className="relative w-32 h-32 rounded-full bg-linear-to-br from-cyan-900 to-blue-900 shadow-[0_0_50px_rgba(6,182,212,0.5)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] opacity-20 animate-pulse" />
        <FaBrain className="text-5xl text-cyan-200 z-10 animate-float" />
        
        <div className="absolute top-0 left-1/2 w-full h-1 bg-cyan-400/50 rotate-45 animate-scan-fast" />
        <div className="absolute bottom-0 right-1/2 w-full h-1 bg-purple-400/50 -rotate-45 animate-scan-fast delay-75" />
      </div>

      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="absolute inset-8 animate-reverse-spin">
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_15px_#a855f7] -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
};

// --- COMPONENT: Terminal Simulator ---
const TerminalSim = () => {
  const [lines, setLines] = useState([
    "> Initializing Cursor IDE...",
    "> Generating React Component via v0...",
    "> Indexing Vector Embeddings...",
  ]);
  
  const tasks = useMemo(() => [
    " Refactoring Node.js Middleware...",
    " Generating Postman Test Suite...",
    " Optimizing MongoDB Aggregation...",
    " Streamlining Tailwind Classes...",
    " Debugging with Codebase Context...",
    " Deploying to Vercel Edge..."
  ], []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, `> ${tasks[index % tasks.length]}`];
        if (newLines.length > 6) newLines.shift(); 
        return newLines;
      });
      index++;
    }, 2000);
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="w-full max-w-md bg-[#0a0a12] border border-white/10 rounded-xl p-4 font-mono text-xs md:text-sm shadow-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
      <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 flex items-center px-3 gap-1.5 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-auto text-[10px] text-slate-500">AI AGENT -- LOGS</span>
      </div>
      <div className="mt-4 space-y-2 h-32 flex flex-col justify-end">
        {lines.map((line, i) => (
          <div key={i} className="text-cyan-400/80 animate-fade-in">
            <span className="mr-2 text-purple-500">$</span>
            {line}
          </div>
        ))}
        <div className="flex items-center text-cyan-400">
          <span className="mr-2 text-purple-500">$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent h-1 w-full animate-scan pointer-events-none opacity-20" />
    </div>
  );
};

export default function AI() {
  const [hoveredTool, setHoveredTool] = useState(null);

  return (
    <section id="ai" className="relative min-h-screen py-24 px-6 bg-[#030014] overflow-hidden text-slate-100 flex flex-col items-center">
      
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes fade-in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 10s linear infinite; }
        .animate-scan { animation: scan 2s linear infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .dashed-border {
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2322d3ee33' stroke-width='2' stroke-dasharray='10%2c 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
          border: none;
        }
      `}</style>

      <NeuralNetwork />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(3,0,20,1)_100%)] pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl w-full flex flex-col items-center">
        
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
            <FaMicrochip className="animate-pulse" /> Artificial Intelligence
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500 tracking-tighter mb-4">
            NEURAL <span className="text-cyan-400">NEXUS</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Supercharging my MERN workflow with industry-standard AI tools. 
            From <strong>Cursor's</strong> codebase awareness to <strong>v0's</strong> generative UIs, I architect solutions faster and cleaner.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full mb-24">
          <div className="flex-1 flex justify-center">
            <ArcReactor />
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="mb-4 flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <FaTerminal />
              <span>LIVE_DEV_LOGS.sh</span>
            </div>
            <TerminalSim />
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
            <FaNetworkWired className="text-2xl text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Pro Developer Toolkit</h3>
            <span className="ml-auto text-xs text-slate-500 font-mono">TOOLS: {aiTools.length} ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <div 
                key={tool.id}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 cursor-default"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                  style={{ background: `linear-gradient(135deg, ${tool.color}, transparent)` }}
                />
                
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-colors pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl" style={{ color: tool.color }}>{tool.icon}</span>
                    </div>
                    <FaFingerprint className={`text-2xl text-slate-600 transition-colors duration-300 ${hoveredTool === tool.id ? 'text-white opacity-100' : 'opacity-20'}`} />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1">{tool.name}</h4>
                  <p className="text-xs font-mono text-cyan-400 mb-4 flex items-center gap-2">
                    <FaBolt size={10} /> {tool.role}
                  </p>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6 h-20">
                    {tool.description}
                  </p>

                  <div className="space-y-3">
                    {tool.metrics.map((metric, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                          <span>{metric.label}</span>
                          <span className="text-white">{metric.value}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: hoveredTool === tool.id ? `${metric.value}%` : '0%',
                              backgroundColor: tool.color 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 w-full grid md:grid-cols-2 gap-12 items-center bg-linear-to-r from-cyan-900/10 to-transparent p-8 rounded-3xl border border-cyan-500/10">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <FaEye className="text-cyan-400" /> Human + AI Synergy
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              I leverage AI to architect robust MERN solutions. My approach involves using LLMs for high-level system design validation, edge-case prediction, and rapid prototyping of complex features.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaCode className="mt-1 text-purple-400" />
                <span className="text-sm text-slate-400">
                  <strong className="text-white">Code Efficiency:</strong> Reducing boilerplate by 40% using Cursor & Copilot.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaDatabase className="mt-1 text-yellow-400" />
                <span className="text-sm text-slate-400">
                  <strong className="text-white">Data Analysis:</strong> Using Vector Search for RAG implementations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaRobot className="mt-1 text-green-400" />
                <span className="text-sm text-slate-400">
                  <strong className="text-white">Automation:</strong> Building CI/CD pipelines verified by Postman AI.
                </span>
              </li>
            </ul>
          </div>
          <div className="relative h-64 bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center group">
             <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#22d3ee_0deg,transparent_60deg)] animate-spin-slow opacity-20" />
             <div className="absolute inset-1 bg-[#0a0a12] rounded-lg" />
             <div className="relative z-10 text-center">
                <div className="text-6xl font-black text-white/10 group-hover:text-cyan-500/20 transition-colors duration-500">
                  10x
                </div>
                <div className="text-sm font-mono text-cyan-400 tracking-widest uppercase">
                  Productivity Multiplier
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}