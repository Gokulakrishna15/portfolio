import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="relative p-12 bg-gradient-to-br from-blue-900 via-black to-purple-900 text-cyan-400 font-retro border-b-2 border-cyan-400 overflow-hidden"
    >
      {/* 🌌 Animated Background Glow */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#00ffff,#7f00ff,transparent)] animate-[pulse_12s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_top_left,#00ffff,#7f00ff,#00ccff,#00ffff)] animate-[spin_40s_linear_infinite]"></div>

      {/* 🌤 Heading */}
      <h2 className="text-4xl font-bold mb-6 text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 animate-pulse">
        🌤 About Me 🌤
      </h2>

      {/* ✨ Divider */}
      <div className="flex justify-center items-center gap-2 mb-10 animate-pulse">
        <span>💠</span>
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 rounded-full"></div>
        <span>💠</span>
      </div>

      {/* 🧾 Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto bg-gray-900 border border-cyan-400 rounded-xl shadow-lg p-10 hover:shadow-purple-500 transition duration-500 transform hover:scale-105">
        <p className="text-cyan-300 leading-relaxed text-lg mb-6 animate-[fadeIn_1s_ease-in]">
          👋 Greetings! I’m <span className="text-purple-400 font-bold">Gokulakrishna N.E</span>, a{" "}
          <span className="text-purple-400 font-bold">Certified MERN Full Stack Developer</span> trained under{" "}
          <span className="text-purple-400">IIT-M Pravartak & GUVI ZenClass</span>. I specialize in architecting scalable, interactive, and globally competitive web applications with a strong emphasis on user experience, performance, and professional presentation.
        </p>

        <p className="text-cyan-300 leading-relaxed text-lg mb-6 animate-[fadeIn_2s_ease-in]">
          My technical foundation spans{" "}
          <span className="text-purple-400">React.js, Node.js, Express.js, and MongoDB</span>, complemented by deployment expertise on{" "}
          <span className="text-purple-400">Netlify, Vercel, and Render</span>. I am deeply passionate about designing responsive interfaces, integrating micro‑interactions, and delivering solutions that meet international standards of quality and innovation.
        </p>

        <p className="text-cyan-300 leading-relaxed text-lg mb-6 animate-[fadeIn_3s_ease-in]">
          I take pride in{" "}
          <span className="text-purple-400">workflow discipline, documentation precision, and collaborative problem‑solving</span>. Whether it’s debugging complex systems, optimizing deployments, or refining UI polish, I approach every challenge with consistency, curiosity, and a commitment to excellence.
        </p>

        <p className="text-cyan-300 leading-relaxed text-lg mb-6 animate-[fadeIn_4s_ease-in]">
          As an emerging professional, I bring a growth‑oriented mindset, a solid foundation in full stack development, and a dedication to continuous learning. My ambition is to contribute to impactful teams, engineer meaningful digital products, and evolve into a developer recognized for delivering world‑class technical solutions and delightful user experiences. 🚀
        </p>

        {/* 🌐 Languages Section */}
        <div className="mt-8 p-6 bg-gray-800 border border-purple-400 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-center text-purple-300 mb-4">
            🌐 Languages
          </h3>
          <ul className="space-y-3 text-lg text-cyan-200 text-center">
            <li>🇮🇳 <span className="text-purple-400 font-bold">Tamil</span> — Mother tongue</li>
            <li>🇬🇧 <span className="text-purple-400 font-bold">English</span> — Academic & professional language (fluent)</li>
            <li>🇮🇳 <span className="text-purple-400 font-bold">Hindi</span> — Basic conversational knowledge</li>
          </ul>
        </div>
      </div>

      {/* 🌌 Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-20 animate-[bounce_10s_linear_infinite]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* ⬇️ Footer Prompt */}
      <p className="mt-12 text-center text-cyan-300 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to explore my Skills...
      </p>
    </section>
  );
}