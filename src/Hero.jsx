import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-yellow-300 font-retro overflow-hidden border-b-2 border-yellow-400">
      
      {/* Animated Background Layers - Morning Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-sky-800 to-blue-900 animate-gradient"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#ffd700,transparent)] animate-pulse"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_top_right,#ff8800,#ffd700,#ff8800)] animate-spin-slow"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Typewriter Title */}
        <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-yellow-400 pr-2 neon-text">
          🌞 Certified MERN Full Stack Developer
        </h2>

        {/* Subtitle */}
        <p className="text-orange-300 text-xl md:text-2xl mb-8 animate-fadeIn">
          🎓 IIT-M Pravartak | 💻 GUVI ZenClass
        </p>

        {/* Glowing Resume Button */}
        <a
          href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-black px-6 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition inline-block"
        >
          📄 View My Resume
        </a>

        {/* Social Quick Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:text-pink-400 transition text-xl"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/Gokulakrishna15"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:text-pink-400 transition text-xl"
          >
            💻 GitHub
          </a>
          <a
            href="mailto:gokulakrishna578@gmail.com"
            className="text-yellow-300 hover:text-pink-400 transition text-xl"
          >
            ✉ Email
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce z-10">
        <p className="text-orange-300 text-sm">⬇️ Scroll down to continue...</p>
      </div>
    </section>
  );
}
