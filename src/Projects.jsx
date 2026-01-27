import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaUtensils,
  FaRegImage,
  FaRegCheckCircle,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import {
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiStripe,
  SiCloudinary,
  SiSocketdotio,
  SiJsonwebtokens,
} from "react-icons/si";

// Project Data
const projects = [
  {
    id: "restaurant",
    title: "🍽️ Restaurant Reservation Platform",
    description:
      "A production-ready MERN platform for discovering, booking, and reviewing restaurants. Features real-time availability, reservation management, owner dashboards, and Stripe payments.",
    demo: "https://eclectic-cucurucho-a9fcf2.netlify.app/",
    github: "https://github.com/Gokulakrishna15/restaurant-reservation-platform",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Cloudinary",
      "Socket.io",
    ],
    features: [
      "Real-time table availability (WebSockets)",
      "Reservation management: create, modify, cancel",
      "User reviews with photos & owner responses",
      "Advanced search (cuisine, price, location)",
      "Admin dashboard with analytics",
      "Stripe payment integration for deposits",
    ],
    impact:
      "Helps restaurants digitize reservations, reduce no-shows, and streamline customer experience.",
    highlights: [
      { icon: <FaCalendarAlt />, label: "Real-time bookings" },
      { icon: <FaUsers />, label: "User reviews system" },
      { icon: <FaMoneyCheckAlt />, label: "Stripe payments" },
    ],
  },
  {
    id: "password-reset",
    title: "🔑 Password Reset System",
    description:
      "Secure MERN workflow with JWT authentication & email verification.",
    demo: "https://password-reset-frontend-prod.netlify.app/",
    github: "https://github.com/Gokulakrishna15/password-reset-frontend",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: [
      "Forgot password flow with email verification",
      "JWT-based secure authentication",
      "Responsive UI with Tailwind CSS",
    ],
    impact: "Provides a professional, secure password recovery workflow.",
  },
  {
    id: "invoice-builder",
    title: "🧾 Invoice Builder",
    description: "Dynamic MERN app for invoice creation & management.",
    demo: "https://sensational-macaron-af7801.netlify.app/",
    github: "https://github.com/Gokulakrishna15/invoice-builder",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Create and manage invoices dynamically",
      "Download invoices as PDF",
      "Client and product management",
    ],
    impact: "Simplifies billing for freelancers and small businesses.",
  },
  {
    id: "movies",
    title: "🎬 Movies Search App",
    description:
      "React + Tailwind CSS app using OMDB API with pagination and filters.",
    demo: "https://tangerine-phoenix-243994.netlify.app/",
    github: "https://github.com/Gokulakrishna15/movies-search-app",
    stack: ["React.js", "Tailwind CSS", "OMDB API"],
    features: [
      "Search movies by title",
      "Pagination for large results",
      "Filter by year and type",
    ],
    impact: "Provides a clean, responsive interface for exploring movies.",
  },
];

export default function Projects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particles, setParticles] = useState([]);

  // FIX: Generate random particles in useEffect to ensure purity
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParticles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        size: Math.random() * 8 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 2,
        color: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#ec4899" : "#8b5cf6"
      }));
      setParticles(newParticles);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const restaurantProject = projects.find((p) => p.id === "restaurant");
  const otherProjects = projects.filter((p) => p.id !== "restaurant");

  return (
    <section
      id="projects"
      // FIX: bg-gradient-to-br -> bg-linear-to-br
      className="relative p-6 md:p-12 bg-linear-to-br from-[#071029] via-[#0b1224] to-[#0f1724] text-slate-100 overflow-hidden"
    >
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse3d {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.1); filter: brightness(1.3); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 0 0 60px rgba(236, 72, 153, 0.4); }
        }
        
        @keyframes cardHover {
          0% { transform: translateY(0) rotateX(0deg); }
          100% { transform: translateY(-10px) rotateX(5deg); }
        }
        
        .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        
        .project-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        
        .project-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #fbbf24, #ec4899, #8b5cf6, #fbbf24);
          background-size: 300% 300%;
          border-radius: inherit;
          opacity: 0;
          z-index: -1;
          filter: blur(15px);
          transition: opacity 0.4s ease;
          animation: gradientShift 4s ease infinite;
          pointer-events: none;
        }
        
        .project-card:hover::before {
          opacity: 0.6;
        }
        
        .project-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: translateX(-100%) rotate(45deg);
          pointer-events: none;
        }
        
        .project-card:hover::after {
          animation: shimmer 1s ease;
        }
        
        .feature-badge {
          position: relative;
          overflow: hidden;
        }
        
        .feature-badge::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        
        .feature-badge:hover::before {
          left: 100%;
        }
        
        .tech-badge {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .tech-badge:hover {
          transform: translateY(-5px) scale(1.1);
        }
        
        .btn-primary {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #fbbf24, #f59e0b, #fbbf24);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        
        .btn-primary::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
          pointer-events: none;
        }
        
        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: morphBlob 12s ease-in-out infinite, float 15s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .orbit-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #fbbf24, #ec4899);
          border-radius: 50%;
          animation: orbit 10s linear infinite;
        }
        
        .status-online {
          animation: pulse3d 2s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#0ea5a4,#7c3aed,transparent)] animate-[pulse_12s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_right,#ffb86b,#ff6b6b,#ffb86b,transparent)] animate-[spin_40s_linear_infinite] pointer-events-none" />

      {/* Morphing Blobs */}
      <div className="blob absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 opacity-20" />
      <div
        className="blob absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-500 opacity-15"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="blob absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 opacity-10"
        style={{ animationDelay: "4s" }}
      />

      {/* Cursor Glow */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background:
            "radial-gradient(circle, rgba(251, 191, 36, 0.1), transparent)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Heading */}
        <div className="text-center mb-16 animate-slideInUp">
          <div className="inline-block mb-4">
            {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
            <span className="px-6 py-2 rounded-full bg-linear-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/30 text-yellow-300 font-bold tracking-wider text-xs uppercase backdrop-blur-sm">
              ✨ Portfolio Showcase
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 relative inline-block">
            <span
              // FIX: bg-gradient-to-r -> bg-linear-to-r
              className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-orange-400 to-red-400"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradientShift 5s ease infinite",
              }}
            >
              🌆 Highlighted Projects
            </span>
            {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
            <div className="absolute -inset-6 bg-linear-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 blur-3xl -z-10 animate-pulse" />
          </h2>

          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            A collection of full-stack MERN applications. The{" "}
            <span className="text-pink-400 font-bold">
              Restaurant Platform
            </span>{" "}
            is my flagship project, demonstrating complex real-time logic,
            payments, and user management.
          </p>

          {/* Animated Divider */}
          <div className="relative w-40 h-1 mx-auto mt-8">
            {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full" />
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full blur-lg animate-pulse" />
          </div>
        </div>

        {/* FEATURED PROJECT */}
        <article className="relative grid lg:grid-cols-12 gap-8 items-start mb-20">
          {/* LEFT: Details */}
          <div className="lg:col-span-8 animate-slideInLeft">
            <div className="project-card rounded-3xl bg-slate-900/60 backdrop-blur-xl p-6 md:p-8 shadow-2xl border border-slate-700/50 hover:border-pink-500/50">
              <div className="flex flex-col gap-6">
                <div>
                  {/* Title with Glow */}
                  <div className="relative inline-block mb-4">
                    <h3 className="text-3xl md:text-5xl font-bold text-pink-300">
                      {restaurantProject.title}
                    </h3>
                    <div className="absolute -inset-3 bg-pink-500/20 blur-2xl -z-10 animate-pulse" />
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    {restaurantProject.description}
                  </p>

                  {/* Enhanced Tech Stack */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {restaurantProject.stack.map((tech, i) => (
                      <span
                        key={i}
                        // FIX: bg-gradient-to-r -> bg-linear-to-r
                        className="tech-badge inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-pink-900/30 to-purple-900/30 text-pink-100 text-sm font-medium border border-pink-500/30 backdrop-blur-sm shadow-lg"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {tech === "React.js" && (
                          <SiReact className="text-cyan-300 text-lg" />
                        )}
                        {tech === "Node.js" && (
                          <SiNodedotjs className="text-green-500 text-lg" />
                        )}
                        {tech === "Express.js" && (
                          <SiExpress className="text-gray-300 text-lg" />
                        )}
                        {tech === "MongoDB" && (
                          <SiMongodb className="text-green-400 text-lg" />
                        )}
                        {tech === "Stripe" && (
                          <SiStripe className="text-indigo-400 text-lg" />
                        )}
                        {tech === "Cloudinary" && (
                          <SiCloudinary className="text-blue-300 text-lg" />
                        )}
                        {tech === "Socket.io" && (
                          <SiSocketdotio className="text-white text-lg" />
                        )}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>

                  {/* Highlights Grid with Animations */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {restaurantProject.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        // FIX: bg-gradient-to-r -> bg-linear-to-r
                        className="feature-badge flex items-center gap-3 bg-linear-to-r from-slate-800/50 to-slate-700/50 p-4 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
                        style={{ animationDelay: `${idx * 150}ms` }}
                      >
                        <div className="text-pink-400 text-2xl group-hover:scale-125 transition-transform duration-300">
                          {h.icon}
                        </div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-yellow-300 transition-colors">
                          {h.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features with Enhanced Styling */}
                  <div className="mb-8 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
                    <h4 className="text-pink-200 font-semibold mb-4 text-lg flex items-center gap-2">
                      <span className="text-2xl">⚡</span> Core Capabilities
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                      {restaurantProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <span className="text-pink-500 mt-1 text-lg group-hover:scale-125 transition-transform">
                            ✓
                          </span>
                          <span className="group-hover:text-white transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={restaurantProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-3 px-8 py-4 rounded-xl text-black font-bold shadow-2xl hover:scale-110 transition-all duration-300 relative z-10"
                    >
                      <span className="text-xl">🌐</span>
                      <span className="relative z-10">Live Demo</span>
                    </a>
                    <a
                      href={restaurantProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-slate-600 bg-slate-800/50 backdrop-blur-sm text-white font-bold hover:bg-slate-700 hover:border-yellow-500 hover:scale-105 transition-all duration-300 relative z-10"
                    >
                      <span className="text-xl">🐙</span>
                      <span>GitHub Repo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Preview */}
          <aside className="lg:col-span-4 flex flex-col gap-6 animate-slideInRight">
            {/* Visual Card with Orbiting Particles */}
            {/* FIX: bg-gradient-to-br -> bg-linear-to-br */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-pink-900 to-purple-900 p-1 border border-pink-500/40">
              {/* Orbiting Particles */}
              <div className="absolute top-1/2 left-1/2 w-1 h-1">
                <div
                  className="orbit-particle"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="orbit-particle"
                  style={{ animationDelay: "2.5s" }}
                />
                <div
                  className="orbit-particle"
                  style={{ animationDelay: "5s" }}
                />
                <div
                  className="orbit-particle"
                  style={{ animationDelay: "7.5s" }}
                />
              </div>

              <div className="bg-slate-900/90 p-6 rounded-xl h-full backdrop-blur-sm relative">
                {/* FIX: bg-gradient-to-br -> bg-linear-to-br */}
                <div className="w-full h-48 mb-6 rounded-xl bg-linear-to-br from-pink-600 via-purple-600 to-purple-700 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                  <FaUtensils
                    className="text-white text-7xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                    style={{ animation: "float 6s ease-in-out infinite" }}
                  />
                  {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Enhanced Stats */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-xs text-pink-200 uppercase tracking-wider font-bold">
                      Status
                    </span>
                    <span className="status-online text-xs text-green-400 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                    <span className="text-sm text-slate-300 font-medium">
                      User Rating
                    </span>
                    <span className="text-yellow-400 flex items-center gap-2 text-sm font-bold">
                      <FaStar className="animate-pulse" /> 4.8/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                    <span className="text-sm text-slate-300 font-medium">
                      Bookings
                    </span>
                    <span className="text-white text-sm font-bold">
                      Real-time
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-xs font-mono text-pink-300 bg-pink-900/50 px-4 py-2 rounded-lg border border-pink-500/30 inline-block">
                    MERN • Socket.io • Stripe
                  </span>
                </div>
              </div>
            </div>

            {/* Production Badge */}
            {/* FIX: bg-gradient-to-r -> bg-linear-to-r */}
            <div className="p-6 rounded-2xl bg-linear-to-r from-slate-800/60 to-slate-700/60 border border-slate-600 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <h4 className="text-green-400 font-semibold mb-3 text-sm flex items-center gap-2">
                <FaRegCheckCircle className="text-lg" /> Production Ready
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deployed with CI/CD pipelines. Images optimized via Cloudinary.
                Secure payment gateways implemented.
              </p>
            </div>
          </aside>
        </article>

        {/* SECONDARY PROJECTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, idx) => (
            <div
              key={project.id}
              className="project-card group bg-[#0b1224]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-slate-600"
              style={{
                animation: `slideInUp 0.8s ease-out ${idx * 0.15}s both`,
              }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col h-full">
                {/* Icon with Glow */}
                <div className="mb-4">
                  {/* FIX: bg-gradient-to-br -> bg-linear-to-br */}
                  <div className="relative w-14 h-14 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:from-yellow-600 group-hover:to-orange-600 transition-all duration-500 group-hover:scale-110">
                    <FaRegImage className="text-slate-300 group-hover:text-white text-2xl relative z-10" />
                    {hoveredCard === project.id && (
                      <div className="absolute inset-0 bg-yellow-500/30 rounded-xl blur-xl" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-yellow-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm mb-4 flex-grow group-hover:text-slate-300 transition-colors">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((s, i) => (
                    <span
                      key={i}
                      className="text-xs text-slate-400 bg-slate-900/70 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-yellow-500/50 transition-colors backdrop-blur-sm"
                    >
                      {s}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="text-xs text-slate-400 bg-slate-900/70 px-3 py-1.5 rounded-lg border border-slate-800">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="text-xs text-slate-300 space-y-2 mb-6 border-t border-slate-800 pt-4">
                  {project.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 group/item hover:text-yellow-300 transition-colors"
                    >
                      <span className="text-yellow-500 group-hover/item:scale-125 transition-transform">
                        •
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    // FIX: hover:bg-gradient-to-r -> hover:bg-linear-to-r
                    className="flex-1 text-center py-3 rounded-xl bg-slate-700 hover:bg-linear-to-r hover:from-yellow-500 hover:to-orange-500 hover:text-black text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-10"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-xl border-2 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white text-sm transition-all duration-300 hover:scale-105 relative z-10"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm animate-bounce flex items-center justify-center gap-2">
            <span className="text-lg">⬇️</span>
            Scroll down to connect with me...
          </p>
        </div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle absolute"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}