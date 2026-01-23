import React from "react";
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

// Project Data - Centralized for easy editing
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
  // Helper to get the main feature project
  const restaurantProject = projects.find((p) => p.id === "restaurant");
  // Helper to get the rest
  const otherProjects = projects.filter((p) => p.id !== "restaurant");

  return (
    <section
      id="projects"
      className="relative p-6 md:p-12 bg-gradient-to-br from-[#071029] via-[#0b1224] to-[#0f1724] text-slate-100 overflow-hidden"
    >
      {/* Cinematic Background Layers */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#0ea5a4,#7c3aed,transparent)] animate-[pulse_12s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_right,#ffb86b,#ff6b6b,#ffb86b,transparent)] animate-[spin_40s_linear_infinite] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 animate-pulse">
          🌆 Highlighted Projects
        </h2>

        <p className="text-center text-slate-300 max-w-3xl mx-auto mb-16">
          A collection of full-stack MERN applications. The **Restaurant Platform** is my flagship project, demonstrating complex real-time logic, payments, and user management.
        </p>

        {/* =========================================
            FEATURED PROJECT (RESTAURANT)
           ========================================= */}
        <article className="relative grid lg:grid-cols-12 gap-8 items-start mb-20">
          {/* LEFT: Details & Actions (Span 8) */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-slate-900/50 backdrop-blur-md p-6 md:p-8 shadow-2xl border border-slate-700/50 transform transition duration-700 hover:border-pink-500/30">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-pink-300 mb-3">
                    {restaurantProject.title}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    {restaurantProject.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {restaurantProject.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-900/20 text-pink-100 text-sm font-medium border border-pink-500/20"
                      >
                        {/* Icons based on tech name */}
                        {tech === "React.js" && <SiReact className="text-cyan-300" />}
                        {tech === "Node.js" && <SiNodedotjs className="text-green-500" />}
                        {tech === "Express.js" && <SiExpress className="text-gray-300" />}
                        {tech === "MongoDB" && <SiMongodb className="text-green-400" />}
                        {tech === "Stripe" && <SiStripe className="text-indigo-400" />}
                        {tech === "Cloudinary" && <SiCloudinary className="text-blue-300" />}
                        {tech === "Socket.io" && <SiSocketdotio className="text-white" />}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {restaurantProject.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700"
                      >
                        <div className="text-pink-400 text-xl">{h.icon}</div>
                        <div className="text-sm font-medium text-slate-200">
                          {h.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bullet Points */}
                  <div className="mb-8">
                    <h4 className="text-pink-200 font-semibold mb-3">
                      Core Capabilities
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-sm">
                      {restaurantProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={restaurantProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold shadow-lg hover:scale-105 hover:shadow-orange-500/50 transition-all duration-300"
                    >
                      🌐 Live Demo
                    </a>
                    <a
                      href={restaurantProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 bg-slate-800 text-white font-medium hover:bg-slate-700 transition-all duration-300"
                    >
                      🐙 GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Preview & Stats (Span 4) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Visual Card */}
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-900 to-purple-900 p-1 relative border border-pink-500/30">
              <div className="bg-slate-900/80 p-6 rounded-xl h-full backdrop-blur-sm">
                <div className="w-full h-40 mb-4 rounded-lg bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center shadow-inner">
                  <FaUtensils className="text-white text-6xl animate-bounce" />
                </div>
                
                {/* Mock UI Elements */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-xs text-pink-200 uppercase tracking-wider">Status</span>
                    <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">User Rating</span>
                    <span className="text-yellow-400 flex items-center gap-1 text-sm font-bold">
                      <FaStar /> 4.8/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Bookings</span>
                    <span className="text-white text-sm font-bold">Real-time</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-xs font-mono text-pink-300 bg-pink-900/50 px-2 py-1 rounded">
                    MERN • Socket.io • Stripe
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Feature Cards */}
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
               <h4 className="text-pink-200 font-semibold mb-3 text-sm flex items-center gap-2">
                 <FaRegCheckCircle /> Production Ready
               </h4>
               <p className="text-xs text-slate-400">
                 Deployed with CI/CD pipelines. Images optimized via Cloudinary. Secure payment gateways implemented.
               </p>
            </div>
          </aside>
        </article>

        {/* =========================================
            SECONDARY PROJECTS GRID
           ========================================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group bg-[#0b1224]/80 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                   <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:from-yellow-600 group-hover:to-orange-600 transition-colors duration-500">
                      <FaRegImage className="text-slate-300 group-hover:text-white text-xl" />
                   </div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-yellow-300 transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack (Small) */}
                <div className="mb-4 flex flex-wrap gap-2">
                   {project.stack.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        {s}
                      </span>
                   ))}
                   {project.stack.length > 3 && (
                      <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        +{project.stack.length - 3}
                      </span>
                   )}
                </div>

                {/* Features List */}
                <ul className="text-xs text-slate-300 space-y-2 mb-6 border-t border-slate-800 pt-4">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
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
                    className="flex-1 text-center py-2 rounded-md bg-slate-700 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 hover:text-black text-white text-sm font-semibold transition-all"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-md border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white text-sm transition-all"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm mb-4 animate-bounce">
            ⬇️ Scroll down to connect with me...
          </p>
        </div>
      </div>

      {/* Floating Particles (Decorative) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 4 + 2}s infinite`,
            }}
          />
        ))}
      </div>
    </section>
  );
}