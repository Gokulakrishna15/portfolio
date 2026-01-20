import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-green-400 font-retro p-6 text-center border-t-2 border-green-400">
      {/* Neon Glow Text */}
      <p className="text-green-300 animate-pulse">
        © 2026 Gokulakrishna N.E | Built with React + Tailwind
      </p>

      {/* Social Links */}
      <div className="mt-4 space-x-6">
        <a
          href="mailto:gokulakrishna578@gmail.com"
          className="hover:text-pink-400 transition"
        >
          ✉ Email
        </a>
        <a
          href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          💼 LinkedIn
        </a>
        <a
          href="https://github.com/Gokulakrishna15"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          💻 GitHub
        </a>
        <a
          href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          📄 Resume
        </a>
      </div>
    </footer>
  );
}