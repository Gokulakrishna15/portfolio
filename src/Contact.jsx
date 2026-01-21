import React from "react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative p-12 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#2c2f54] text-teal-300 font-retro border-b-2 border-peach-400 overflow-hidden"
    >
      {/* Animated Background Glow - Twilight Pastel */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#14b8a6,#fbbf24,#ff9ecf,transparent)] animate-pulse"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_top_right,#14b8a6,#fbbf24,#ff9ecf,#14b8a6)] animate-spin-slow"></div>

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-6 text-center neon-text relative z-10 text-peach-400">
        <span className="animate-pulse">🌸 Contact Me 🌙</span>
      </h2>

      {/* Divider Line */}
      <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-peach-400 to-pink-400 mx-auto mb-10 animate-pulse"></div>

      {/* Contact Card */}
      <div className="relative z-10 max-w-3xl mx-auto bg-gray-900 border border-peach-400 rounded-xl shadow-lg p-10 hover:shadow-teal-500 transition duration-500 transform hover:scale-105 text-center">
        <p className="text-teal-200 text-lg mb-6">
          I’d love to connect with recruiters, mentors, and fellow developers.  
          Feel free to reach out through any of the channels below 🌸
        </p>

        {/* Contact Details */}
        <div className="space-y-4 text-xl text-teal-300">
          <p>
            ✉ Email:{" "}
            <a
              href="mailto:gokulakrishna578@gmail.com"
              className="text-peach-400 hover:underline"
            >
              gokulakrishna578@gmail.com
            </a>
          </p>
          <p>
            📱 Phone:{" "}
            <a
              href="tel:+918220380511"
              className="text-peach-400 hover:underline"
            >
              +91 82203 80511
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8 text-xl">
          <a
            href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-teal-400 via-peach-400 to-pink-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/Gokulakrishna15"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-teal-400 via-peach-400 to-pink-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition"
          >
            💻 GitHub
          </a>
        </div>
      </div>

      {/* Footer Prompt */}
      <p className="mt-12 text-center text-teal-200 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to see my Footer...
      </p>
    </section>
  );
}
