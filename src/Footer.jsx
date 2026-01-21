import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#2c1a29] via-black to-[#1a1f3b] text-orange-300 font-retro border-t-2 border-pink-400 p-6 text-center overflow-hidden">
      {/* Animated Background Glow - Sunset (Orange + Pink + Purple) */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#ff8800,#ff00aa,#a855f7,transparent)] animate-pulse"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_left,#ff8800,#ff00aa,#a855f7,#ff8800)] animate-spin-slow"></div>

      {/* Divider Line */}
      <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mx-auto mb-6 animate-pulse relative z-10"></div>

      {/* Signature */}
      <p className="text-orange-200 text-lg mb-4 relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-400 font-bold">Gokulakrishna N.E</span> — Certified MERN Full Stack Developer 🚀
      </p>

      {/* Quick Links */}
      <div className="flex justify-center gap-6 text-xl relative z-10">
        <a
          href="mailto:gokulakrishna578@gmail.com"
          className="hover:text-pink-400 transition"
        >
          ✉ Email
        </a>
        <a
          href="tel:+918220380511"
          className="hover:text-pink-400 transition"
        >
          📱 Phone
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
      </div>

      {/* Closing Note */}
      <p className="mt-6 text-orange-200 text-sm animate-fadeIn relative z-10">
        Built with ❤️ using React, Tailwind CSS, and Vite
      </p>
    </footer>
  );
}
