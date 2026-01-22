import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-yellow-100 font-retro overflow-hidden border-b-2 border-yellow-300">
      
      {/* 🌄 Sunrise Gradient Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3c72] via-[#2a5298] to-[#f6d365] transition-all duration-1000 ease-in-out"></div>

      {/* ☀️ Sun Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,#fcd34d,transparent)] opacity-20 blur-3xl"></div>

      {/* 🌬️ Floating Dust Particles */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-100 rounded-full opacity-20 animate-[bounce_10s_linear_infinite]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* 🌞 Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-orange-300 to-pink-400 animate-pulse">
          🌅 Certified MERN Full Stack Developer
        </h2>

        <p className="text-orange-200 text-xl md:text-2xl mb-8 animate-[fadeIn_2s_ease-in]">
          🎓 IIT-M Pravartak | 💻 GUVI ZenClass
        </p>

        <a
          href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black px-6 py-3 rounded-lg font-bold shadow-md hover:scale-105 hover:rotate-1 hover:shadow-yellow-300 transition-transform duration-300 inline-block"
        >
          📄 View My Resume
        </a>

        {/* 🌐 Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-100 hover:text-pink-300 transition text-xl underline underline-offset-4 decoration-pink-300"
          >
            🌇 LinkedIn
          </a>
          <a
            href="https://github.com/Gokulakrishna15"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-100 hover:text-pink-300 transition text-xl underline underline-offset-4 decoration-pink-300"
          >
            🌄 GitHub
          </a>
          <a
            href="mailto:gokulakrishna578@gmail.com"
            className="text-yellow-100 hover:text-pink-300 transition text-xl underline underline-offset-4 decoration-pink-300"
          >
            🌤️ gokulakrishna578@gmail.com
          </a>
        </div>
      </div>

      {/* ⬇️ Scroll Indicator */}
      <div className="absolute bottom-10 z-10 flex flex-col items-center animate-bounce">
        <p className="text-orange-200 text-sm mb-1">🌞 Scroll down to continue...</p>
        <div className="w-5 h-5 border-b-2 border-r-2 border-orange-200 rotate-45"></div>
      </div>
    </section>
  );
}