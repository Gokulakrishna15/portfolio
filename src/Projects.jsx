import React from "react";

export default function Projects() {
  const projects = [
    {
      title: "🍽️ Restaurant Reservation Platform",
      description:
        "A full‑stack MERN app with real‑time availability, Stripe payments, Cloudinary uploads, and admin dashboard.",
      demo: "https://eclectic-cucurucho-a9fcf2.netlify.app/",
      github: "https://github.com/Gokulakrishna15/restaurant-reservation-platform",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "Cloudinary"],
      features: [
        "Real-time table availability",
        "Secure online payments via Stripe",
        "Image uploads with Cloudinary",
        "Admin dashboard for restaurant owners",
      ],
      impact:
        "Helps restaurants digitize reservations and streamline customer experience."
    },
    {
      title: "🔑 Password Reset System",
      description:
        "Secure MERN workflow with JWT authentication & email verification.",
      demo: "https://password-reset-frontend-prod.netlify.app/",
      github: "https://github.com/Gokulakrishna15/password-reset-frontend",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Nodemailer"],
      features: [
        "Forgot password flow with email verification",
        "JWT-based secure authentication",
        "Responsive UI with Tailwind CSS",
      ],
      impact:
        "Provides a professional, secure password recovery workflow for web apps."
    },
    {
      title: "🧾 Invoice Builder",
      description:
        "Dynamic MERN app for invoice creation & management.",
      demo: "https://sensational-macaron-af7801.netlify.app/",
      github: "https://github.com/Gokulakrishna15/invoice-builder",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      features: [
        "Create and manage invoices dynamically",
        "Download invoices as PDF",
        "Client and product management",
      ],
      impact:
        "Simplifies billing for freelancers and small businesses."
    },
    {
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
      impact:
        "Provides a clean, responsive interface for exploring movies."
    },
  ];

  return (
    <section
      id="projects"
      className="relative p-12 bg-gradient-to-br from-[#0a0f29] via-[#1a1f3b] to-[#2c2f54] text-yellow-400 font-retro border-b-2 border-orange-400 overflow-hidden"
    >
      {/* 🌇 Animated Background Glow */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#ffcc00,#ff8800,#ff4500,transparent)] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_right,#ffcc00,#ff8800,#ff4500,#ffcc00)] animate-[spin_40s_linear_infinite]"></div>

      {/* 🌆 Heading */}
      <h2 className="text-4xl font-bold mb-4 text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 animate-pulse">
        🌆 Highlighted Projects 🌆
      </h2>

      {/* ✨ Divider */}
      <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mx-auto mb-6 animate-pulse"></div>

      {/* 🧠 Intro Line */}
      <p className="text-center text-orange-200 text-lg max-w-3xl mx-auto mb-10 animate-[fadeIn_2s_ease-in]">
        Each project below reflects my passion for clean code, responsive design, and full-stack functionality. These are real-world apps built with the MERN stack and deployed for live use.
      </p>

      {/* 🧩 Projects Grid */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-orange-400 rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105 hover:rotate-1 hover:shadow-yellow-500 hover:border-red-400 animate-[fadeInUp_0.5s_ease-in-out] hover:animate-none"
            style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-300 neon-text">
              {project.title}
            </h3>
            <p className="text-orange-200 mb-4">{project.description}</p>

            {/* Tech Stack */}
            <p className="text-sm text-yellow-400 mb-2">
              <strong>Stack:</strong> {project.stack.join(", ")}
            </p>

            {/* Features */}
            <ul className="list-disc list-inside text-orange-300 text-sm mb-4">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            {/* Impact */}
            <p className="text-sm text-orange-200 italic mb-6">{project.impact}</p>

            {/* Links */}
            <div className="flex justify-center gap-6">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-black px-4 py-2 rounded-lg font-bold shadow-md hover:scale-110 hover:shadow-lg transition"
              >
                🌐 Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-black px-4 py-2 rounded-lg font-bold shadow-md hover:scale-110 hover:shadow-lg transition"
              >
                🐙 GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ⬇️ Footer Prompt */}
      <p className="mt-12 text-center text-orange-300 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to connect with me...
      </p>
    </section>
  );
}