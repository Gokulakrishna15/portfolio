import React from "react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative p-12 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#2c2f54] text-teal-300 font-retro border-b-2 border-pink-400 overflow-hidden"
    >
      {/* 🌌 Animated Background Glow */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#14b8a6,#fbbf24,#ff9ecf,transparent)] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_top_right,#14b8a6,#fbbf24,#ff9ecf,#14b8a6)] animate-[spin_40s_linear_infinite]"></div>

      {/* ✨ Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-20 animate-[bounce_12s_linear_infinite]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* 🌸 Heading */}
      <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-pink-300 to-yellow-300 animate-pulse relative z-10">
        🌸 Contact Me 🌙
      </h2>

      {/* Divider */}
      <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-pink-400 to-yellow-400 mx-auto mb-10 animate-pulse"></div>

      {/* 💌 Contact Card */}
      <div className="relative z-10 max-w-3xl mx-auto bg-gray-900 border border-pink-400 rounded-xl shadow-lg p-10 hover:shadow-teal-500 transition duration-500 transform hover:scale-105 text-center">
        <p className="text-teal-200 text-lg mb-6">
          I’d love to connect with recruiters, mentors, and fellow developers.  
          Whether it’s a job opportunity, collaboration, or just a friendly hello — I’m always open to meaningful conversations 🌟
        </p>

        {/* 📬 Contact Info */}
        <div className="space-y-4 text-xl text-teal-300">
          <p>
            ✉ Email:{" "}
            <a
              href="mailto:gokulakrishna578@gmail.com"
              className="text-pink-300 hover:underline"
              aria-label="Email Gokulakrishna"
            >
              gokulakrishna578@gmail.com
            </a>
          </p>
          <p>
            📱 Phone:{" "}
            <a
              href="tel:+918220380511"
              className="text-pink-300 hover:underline"
              aria-label="Call Gokulakrishna"
            >
              +91 82203 80511
            </a>
          </p>
          <p>
            📍 Location:{" "}
            <span className="text-pink-300">
              Gobichettipalayam, Erode – 638452, Tamil Nadu
            </span>
          </p>
        </div>

        {/* 🌐 Social Links */}
        <div className="flex justify-center gap-6 mt-8 text-xl">
          <a
            href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="bg-gradient-to-r from-teal-400 via-pink-300 to-yellow-300 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-110 hover:shadow-yellow-400 transition-transform duration-300"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/Gokulakrishna15"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="bg-gradient-to-r from-teal-400 via-pink-300 to-yellow-300 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-110 hover:shadow-yellow-400 transition-transform duration-300"
          >
            💻 GitHub
          </a>
        </div>
      </div>

      {/* ⬇️ Footer Prompt */}
      <p className="mt-12 text-center text-teal-200 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to see my Footer...
      </p>
    </section>
  );
}