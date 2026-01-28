import React, { useState, useEffect, useRef } from "react";
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaCheckCircle, 
  FaCopy,
  FaPaperPlane,
  FaNetworkWired,
  FaUserAstronaut
} from "react-icons/fa";

/**
 * =====================================================================
 * CONTACT.JSX - "THE HOLOGRAPHIC COMMAND CENTER"
 * =====================================================================
 */

// --- UTILITY: Particle Class for Background ---
class Star {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random();
    this.speed = Math.random() * 0.2 + 0.05;
  }
  update(height) {
    this.y -= this.speed;
    if (this.y < 0) this.y = height;
    this.opacity = Math.abs(Math.sin(Date.now() * 0.001 * this.speed * 100));
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- COMPONENT: Starfield Background ---
const Starfield = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const stars = Array.from({ length: 150 }, () => new Star(canvas.width, canvas.height));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.update(canvas.height);
        star.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-50" />;
};

// --- COMPONENT: 3D Holographic Globe (CSS Only) ---
const HolographicGlobe = () => {
  return (
    <div className="relative w-64 h-64 my-12 perspective-1000 group cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 w-full h-full rounded-full animate-spin-slow transform-style-3d border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
        {/* Latitudes */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`lat-${i}`} 
            className="absolute inset-0 rounded-full border border-cyan-500/30"
            style={{ transform: `rotateX(${i * 36}deg)` }}
          />
        ))}
        {/* Longitudes */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`long-${i}`} 
            className="absolute inset-0 rounded-full border border-purple-500/30"
            style={{ transform: `rotateY(${i * 36}deg)` }}
          />
        ))}
        {/* Core Glow */}
        <div className="absolute inset-4 rounded-full bg-linear-to-br from-cyan-500/20 to-transparent blur-xl animate-pulse" />
      </div>
    </div>
  );
};

// --- COMPONENT: 3D Tilt Card ---
const TiltCard = ({ icon: Icon, title, value, onClick }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      className="relative group p-1 rounded-2xl bg-linear-to-br from-white/10 to-white/5 cursor-pointer"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <div className="relative h-full bg-[#0a0a0f] rounded-xl p-8 border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-4 group-active:scale-[0.98] transition-transform">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-20 opacity-20" />

        {/* Icon Orb - Icon is used here */}
        <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-colors duration-300">
          <Icon className="text-2xl text-slate-300 group-hover:text-cyan-400 transition-colors" />
          <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-0 group-hover:opacity-20" />
        </div>

        {/* Text Content */}
        <div className="text-center z-10">
          <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-2">{title}</h3>
          <p className="text-lg font-medium text-white group-hover:text-cyan-200 transition-colors break-all">
            {value}
          </p>
        </div>

        {/* Copy Prompt */}
        <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-xs text-cyan-400 font-mono">
          <FaCopy /> <span>CLICK TO COPY</span>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [toast, setToast] = useState(null);
  const [ripples, setRipples] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  // Toast Timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Copy Logic
  const handleCopy = (text, label, e) => {
    navigator.clipboard.writeText(text);
    setToast({ type: "success", text: `${label} Protocol Initiated` });
    
    // Create Ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);
  };

  // Form Submission Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setToast({ type: "success", text: "Transmission Sent Successfully" });
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-[#030014]">
      
      {/* --- GLOBAL STYLES --- */}
      <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .perspective-1000 { perspective: 1000px; }
        .bg-size-20 { background-size: 20px 20px; }
        @keyframes spin-slow { from { transform: rotateY(0deg) rotateX(20deg); } to { transform: rotateY(360deg) rotateX(20deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.4);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
        
        .input-group:focus-within label {
          color: #2dd4bf;
          transform: translateY(-24px) scale(0.9);
        }
        .input-group label {
          transition: all 0.3s ease;
        }
      `}</style>

      {/* --- BACKGROUND LAYERS --- */}
      <Starfield />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15),transparent)] pointer-events-none" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-20 -left-25 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 -right-25 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Transmission Open</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-slate-400 tracking-tight">
            Establish Uplink
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to collaborate on the next generation of digital experiences? 
            Use the form below or connect via secure channels.
          </p>
        </div>

        {/* 3D Hologram */}
        <HolographicGlobe />

        {/* Layout Grid: Cards Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full mb-20">
          
          {/* Left Column: Tilt Cards */}
          <div className="flex flex-col gap-6">
            <TiltCard 
              icon={FaEnvelope} 
              title="Encrypted Mail" 
              value="gokulakrishna578@gmail.com" 
              onClick={(e) => handleCopy("gokulakrishna578@gmail.com", "Email Address", e)}
            />
            
            <TiltCard 
              icon={FaMapMarkerAlt} 
              title="Base of Operations" 
              value="Erode, Tamil Nadu, IN" 
              onClick={(e) => handleCopy("Gobichettipalayam, Erode, Tamil Nadu", "Coordinates", e)}
            />

            {/* Social Links Box */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h4 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-4">Social Frequencies</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#0077b5] text-white font-bold flex justify-center items-center gap-2 hover:bg-[#006097] transition-all"
                >
                  <FaLinkedin className="text-xl" /> LinkedIn
                </a>
                <a 
                  href="https://github.com/Gokulakrishna15" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#24292e] text-white font-bold flex justify-center items-center gap-2 hover:bg-[#1b1f23] transition-all"
                >
                  <FaGithub className="text-xl" /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <FaUserAstronaut className="text-teal-400 text-2xl" />
              <h3 className="text-2xl font-bold text-white">Direct Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              {/* Name Input */}
              <div className="input-group relative">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0a0a12] text-white px-5 py-4 rounded-xl border border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all peer"
                  placeholder=" "
                />
                <label className="absolute left-5 top-4 text-slate-500 text-sm font-medium pointer-events-none peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-teal-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base">
                  Name / Alias
                </label>
              </div>

              {/* Email Input */}
              <div className="input-group relative">
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0a0a12] text-white px-5 py-4 rounded-xl border border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all peer"
                  placeholder=" "
                />
                <label className="absolute left-5 top-4 text-slate-500 text-sm font-medium pointer-events-none peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-teal-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base">
                  Email Frequency
                </label>
              </div>

              {/* Message Input */}
              <div className="input-group relative">
                <textarea 
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[#0a0a12] text-white px-5 py-4 rounded-xl border border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all resize-none peer"
                  placeholder=" "
                />
                <label className="absolute left-5 top-4 text-slate-500 text-sm font-medium pointer-events-none peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-teal-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base">
                  Transmission Content
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-xl bg-linear-to-r from-teal-600 to-blue-600 text-white font-bold text-lg relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  {status === "submitting" ? (
                    <>
                      <FaNetworkWired className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Initialize Send
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Success Overlay */}
            {status === "success" && (
              <div className="absolute inset-0 bg-[#0a0a12]/95 backdrop-blur-md flex flex-col items-center justify-center text-center z-20 animate-[fadeIn_0.5s_ease-out] rounded-3xl">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <FaCheckCircle className="text-4xl text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Transmission Sent</h4>
                <p className="text-slate-400 text-sm">I will respond to your frequency shortly.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* --- TOAST NOTIFICATION --- */}
      <div className={`fixed bottom-10 right-10 z-50 transition-all duration-500 transform ${toast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="flex items-center gap-4 px-6 py-4 bg-[#0a0a0f] border border-cyan-500/50 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20">
            <FaCheckCircle className="text-cyan-400" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">System Alert</h4>
            <p className="text-cyan-400 text-xs font-mono">{toast?.text}</p>
          </div>
        </div>
      </div>

      {/* Global Ripples Container */}
      {ripples.map(ripple => (
        <div 
          key={ripple.id}
          className="ripple-effect fixed z-50"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 200,
            height: 200,
            marginLeft: -100,
            marginTop: -100
          }}
        />
      ))}

    </section>
  );
}