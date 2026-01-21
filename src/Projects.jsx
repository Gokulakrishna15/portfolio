import React from "react";

export default function Projects() {
  const projects = [
    {
      title: "🍽️ Restaurant Reservation Platform",
      description:
        "A full‑stack MERN app with real‑time availability, Stripe payments, Cloudinary uploads, and admin dashboard.",
      demo: "https://eclectic-cucurucho-a9fcf2.netlify.app/",
      github: "https://github.com/Gokulakrishna15/restaurant-reservation-platform",
    },
    {
      title: "🔑 Password Reset System",
      description:
        "Secure MERN workflow with JWT authentication & email verification.",
      demo: "https://password-reset-frontend-prod.netlify.app/",
      github: "https://github.com/Gokulakrishna15/password-reset-frontend",
    },
    {
      title: "🧾 Invoice Builder",
      description:
        "Dynamic MERN app for invoice creation & management.",
      demo: "https://sensational-macaron-af7801.netlify.app/",
      github: "https://github.com/Gokulakrishna15/invoice-builder",
    },
    {
      title: "🎬 Movies Search App",
      description:
        "React + Tailwind CSS app using OMDB API with pagination and filters.",
      demo: "https://tangerine-phoenix-243994.netlify.app/",
      github: "https://github.com/Gokulakrishna15/movies-search-app",
    },
  ];

  return (
    <section
      id="projects"
      className="relative p-12 bg-gradient-to-br from-[#0a0f29] via-[#1a1f3b] to-[#2c2f54] text-yellow-400 font-retro border-b-2 border-orange-400 overflow-hidden"
    >
      {/* Animated Background Glow - Evening Navy + Gold */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#ffcc00,#ff8800,#ff4500,transparent)] animate-pulse"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_right,#ffcc00,#ff8800,#ff4500,#ffcc00)] animate-spin-slow"></div>

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-6 text-center neon-text relative z-10 text-orange-400">
        <span className="animate-pulse">🌆 Highlighted Projects 🌆</span>
      </h2>

      {/* Divider Line */}
      <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mx-auto mb-10 animate-pulse"></div>

      {/* Projects Grid */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-orange-400 rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-yellow-500 hover:border-red-400"
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-300 neon-text">
              {project.title}
            </h3>
            <p className="text-orange-200 mb-6">{project.description}</p>
            <div className="flex justify-center gap-6">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition"
              >
                🌐 Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition"
              >
                🐙 GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Footer Prompt */}
      <p className="mt-12 text-center text-orange-300 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to connect with me...
      </p>
    </section>
  );
}
