import React, { useState, useEffect } from "react";
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaCheckCircle,
  FaClock,
  FaCopy
} from "react-icons/fa";

export default function Contact() {
  const [toast, setToast] = useState(null);

  // Auto-hide toast notification
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setToast({ type: "success", text: `${label} copied to clipboard!` });
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-20 px-6 flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#2c2f54] overflow-hidden"
    >
      {/* --- BACKGROUND ANIMATIONS --- */}
      <style>{`
        /* Floating Animation */
        @keyframes float { 
          0% { transform: translateY(0px); } 
          50% { transform: translateY(-10px); } 
          100% { transform: translateY(0px); } 
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
        /* Glass Card Styling */
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(244, 114, 182, 0.2); /* Pink-400 low opacity */
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: rgba(15, 23, 42, 0.8);
          transform: translateY(-5px);
          border-color: rgba(20, 184, 166, 0.5); /* Teal-500 hover */
          box-shadow: 0 10px 40px -10px rgba(20, 184, 166, 0.2);
        }
      `}</style>

      {/* 🌌 Animated Background Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#14b8a6,#fbbf24,#ff9ecf,transparent)] animate-[pulse_10s_ease-in-out_infinite] pointer-events-none"></div>
      
      {/* ✨ Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-pink-300 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animation: `float ${Math.random() * 5 + 5}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center">
        
        {/* 🌸 HEADER SECTION */}
        <div className="mb-16 animate-[fadeInDown_1s_ease-out]">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 font-bold tracking-wider text-xs uppercase mb-6 shadow-lg">
            🌸 Get in Touch
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Let's create something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-pink-300 to-yellow-300 animate-pulse">
              extraordinary.
            </span>
          </h2>
          <p className="text-teal-100/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Whether you have a groundbreaking idea, need a full-stack developer, or just want to say hi—my inbox is always open.
          </p>
          
          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 via-pink-400 to-yellow-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* 📬 CONTACT DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16 px-4">
          
          {/* Card 1: Email */}
          <div 
            className="glass-card p-8 rounded-2xl flex flex-col items-center group cursor-pointer" 
            onClick={() => copyToClipboard("gokulakrishna578@gmail.com", "Email")}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <FaEnvelope />
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Chat with me</h4>
            <p className="text-teal-200/70 text-sm mb-4">My Gmail ID.</p>
            <span className="text-pink-300 font-mono text-sm group-hover:underline break-all">
              gokulakrishna578@gmail.com
            </span>
            <div className="mt-4 text-xs text-teal-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <FaCopy /> Click to copy
            </div>
          </div>

          {/* Card 2: Phone */}
          <div 
            className="glass-card p-8 rounded-2xl flex flex-col items-center group cursor-pointer" 
            onClick={() => copyToClipboard("+918220380511", "Phone")}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <FaPhoneAlt />
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Phone</h4>
            <p className="text-teal-200/70 text-sm mb-4">Available 24/7 for calls.</p>
            <span className="text-pink-300 font-mono text-sm group-hover:underline">
              +91 82203 80511
            </span>
            <div className="mt-4 text-xs text-teal-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <FaCopy /> Click to copy
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <FaMapMarkerAlt />
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Location</h4>
            <p className="text-teal-200/70 text-sm mb-4">Based in my hometown.</p>
            <span className="text-pink-300 text-sm px-4">
              Gobichettipalayam, Erode – 638452, Tamil Nadu
            </span>
          </div>
        </div>

        {/* 🌐 FOOTER: FAST RESPONSE & SOCIAL */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full animate-[fadeInUp_1s_ease-out_0.2s]">
          
          {/* Fast Response Badge */}
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-slate-900/50 border border-teal-500/30 backdrop-blur-sm">
            <FaClock className="text-green-400 text-xl animate-pulse" />
            <div className="text-left">
              <p className="text-teal-100 text-sm font-bold">Fast Response</p>
              <p className="text-[10px] text-teal-300/60 uppercase tracking-wide">Within 24 Hours</p>
            </div>
          </div>

          <div className="w-px h-10 bg-teal-500/30 hidden md:block"></div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-semibold shadow-lg border border-transparent hover:border-pink-400 hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <FaLinkedin className="text-blue-400 text-xl" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Gokulakrishna15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-semibold shadow-lg border border-transparent hover:border-yellow-400 hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <FaGithub className="text-white text-xl" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Footer Scroll Prompt */}
        <p className="mt-16 text-teal-200/50 text-sm animate-bounce">
          ⬇️ Scroll down to see my Footer...
        </p>

      </div>

      {/* 🍞 Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 right-10 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-[slideInUp_0.3s_ease-out] bg-gradient-to-r from-teal-500 to-emerald-600 text-white border border-white/10">
          <FaCheckCircle />
          <span className="font-semibold text-sm">{toast.text}</span>
        </div>
      )}
    </section>
  );
}