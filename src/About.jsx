import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="relative p-12 bg-gradient-to-br from-blue-900 via-black to-purple-900 text-cyan-400 font-retro border-b-2 border-cyan-400 overflow-hidden"
    >
      {/* Animated Background Glow - Midday Purple + Cyan */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,#00ffff,#7f00ff,transparent)] animate-pulse"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_top_left,#00ffff,#7f00ff,#00ccff,#00ffff)] animate-spin-slow"></div>

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-6 text-center neon-text relative z-10 text-cyan-400">
        <span className="animate-pulse">🌤 About Me 🌤</span>
      </h2>

      {/* Divider Line */}
      <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mx-auto mb-10 animate-pulse"></div>

      {/* Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto bg-gray-900 border border-cyan-400 rounded-xl shadow-lg p-10 hover:shadow-purple-500 transition duration-500 transform hover:scale-105">
        <p className="text-cyan-300 leading-relaxed text-lg mb-6">
          👋 Hello! My name is{" "}
          <span className="text-purple-400 font-bold">Gokulakrishna N.E</span>, a{" "}
          <span className="text-purple-400 font-bold">Certified MERN Full Stack Developer</span>{" "}
          trained at <span className="text-purple-400">IIT-M Pravartak & GUVI ZenClass</span>.  
          As a fresher, I bring energy, curiosity, and a strong drive to build scalable web applications 
          with clean, recruiter‑friendly design.
        </p>

        <p className="text-cyan-300 leading-relaxed text-lg mb-6">
          My technical focus is on{" "}
          <span className="text-purple-400">React.js, Node.js, Express.js, MongoDB</span>, 
          along with deployment workflows using{" "}
          <span className="text-purple-400">Netlify, Vercel, and Render</span>.  
          I love experimenting with retro UI/UX themes, interactive micro‑interactions, and 
          ensuring every project feels polished and professional.
        </p>

        <p className="text-cyan-300 leading-relaxed text-lg">
          Beyond coding, I value{" "}
          <span className="text-purple-400">collaboration, documentation, and workflow hygiene</span>.  
          My goal is to grow into a developer who not only writes efficient code but also 
          crafts experiences that delight users and impress recruiters. 🚀
        </p>
      </div>

      {/* Animated Footer Prompt */}
      <p className="mt-12 text-center text-cyan-300 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to explore my Skills...
      </p>
    </section>
  );
}
