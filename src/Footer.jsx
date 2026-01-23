import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#2c1a29] via-black to-[#1a1f3b] text-orange-300 font-retro border-t-2 border-pink-400 p-6 text-center overflow-hidden">
      {/* 🌇 Animated Background Glow */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#ff8800,#ff00aa,#a855f7,transparent)] animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_left,#ff8800,#ff00aa,#a855f7,#ff8800)] animate-[spin_40s_linear_infinite]" />

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

      {/* Divider Line */}
      <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mx-auto mb-6 animate-pulse relative z-10" />

      {/* Signature */}
      <p className="text-orange-200 text-lg mb-4 relative z-10 animate-[fadeIn_1s_ease-in]">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-400 font-bold">Gokulakrishna N.E</span> — Certified MERN Full Stack Developer 🚀
      </p>

      {/* Quick Contact */}
      <div className="flex justify-center flex-wrap gap-6 text-xl relative z-10 animate-[fadeIn_2s_ease-in]">
        <a
          href="mailto:gokulakrishna578@gmail.com"
          className="hover:text-pink-400 transition-transform hover:scale-110 duration-300"
        >
          ✉ gokulakrishna578@gmail.com
        </a>
        <a
          href="tel:8220380511"
          className="hover:text-pink-400 transition-transform hover:scale-110 duration-300"
        >
          📱 8220380511
        </a>
      </div>

      {/* Closing Note */}
      <p className="mt-6 text-orange-200 text-sm animate-[fadeIn_3s_ease-in] relative z-10">
        Built with ❤️ using React, Tailwind CSS, and Vite
      </p>

      {/* Hometown Signature */}
      <p className="mt-2 text-orange-300 text-xs animate-[fadeIn_4s_ease-in] relative z-10">
        Made with 💖 from Gobichettipalayam, Erode – 638452, Tamil Nadu
      </p>
    </footer>
  );
}