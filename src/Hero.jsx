import React, { useState, useEffect } from "react";

export default function Hero() {
  // Typewriter effect
  const titles = [
    "🌞 Certified MERN Full Stack Developer",
    "💻 ReactJS Enthusiast",
    "⚡ Node.js Explorer",
    "🏡 From Gobichettipalayam 🌅"
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (index >= titles.length) setIndex(0);
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (forward ? 1 : -1));
    }, 120);

    if (forward && subIndex === titles[index].length + 1) {
      setForward(false);
      clearTimeout(timeout);
      setTimeout(() => {}, 2000);
    } else if (!forward && subIndex === 0) {
      setForward(true);
      setIndex((prev) => (prev + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [subIndex, index, forward]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const typewriterText = `${titles[index].substring(0, subIndex)}${blink ? " ✨" : " "}`;

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-yellow-100 font-retro overflow-hidden">
      
      {/* 🌄 Sunrise Gradient Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff512f] via-[#f09819] to-[#f6d365] animate-[gradientShift_15s_ease-in-out_infinite]"></div>

      {/* ☀️ Sun Glow */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,#fcd34d,transparent)] opacity-30 blur-3xl animate-pulse"></div>

      {/* 🌬️ Floating Particles */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* ⛰️ Parallax Hills */}
      <svg
        className="absolute bottom-0 w-full h-40 text-orange-900 opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          d="M0,160L60,170C120,180,240,200,360,192C480,184,600,148,720,122.7C840,97,960,83,1080,106.7C1200,130,1320,190,1380,220L1440,250L1440,320L0,320Z"
        ></path>
      </svg>

      {/* 🌞 Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-orange-300 to-pink-400 animate-pulse">
          🌅 Gokulakrishna NE 🌟
        </h1>

        {/* ⌨️ Typewriter Titles */}
        <p className="text-orange-100 text-xl md:text-2xl mb-8">{typewriterText}</p>

        <a
          href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black px-6 py-3 rounded-lg font-bold shadow-md hover:scale-105 hover:shadow-yellow-300 transition-transform duration-300 inline-block"
        >
          📄 View My Resume 📂
        </a>

        {/* 🌐 Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition text-xl underline underline-offset-4 decoration-pink-300"
          >
            🌇 LinkedIn 🔗
          </a>
          <a
            href="https://github.com/Gokulakrishna15"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition text-xl underline underline-offset-4 decoration-pink-300"
          >
            🌄 GitHub 💻
          </a>
          <a
            href="mailto:gokulakrishna578@gmail.com"
            className="hover:text-pink-300 transition text-xl underline underline-offset-4 decoration-pink-300"
          >
            🌤️ Email 📧
          </a>
        </div>
      </div>

      {/* ⬇️ Scroll Indicator */}
      <div className="absolute bottom-10 z-10 flex flex-col items-center animate-bounce">
        <p className="text-orange-200 text-sm mb-1">⬇️ Scroll down to continue 🌞</p>
        <div className="w-5 h-5 border-b-2 border-r-2 border-orange-200 rotate-45"></div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        @keyframes gradientShift {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
          100% { filter: hue-rotate(0deg); }
        }
      `}</style>
    </section>
  );
}