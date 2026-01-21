import React from "react";

export default function Skills() {
  const skills = [
    { name: "⚛️ React.js", color: "text-cyan-400" },
    { name: "🌱 Node.js", color: "text-pink-400" },
    { name: "🚀 Express.js", color: "text-purple-400" },
    { name: "🍃 MongoDB", color: "text-green-300" },
    { name: "✨ JavaScript", color: "text-yellow-300" },
    { name: "🌐 HTML5", color: "text-orange-400" },
    { name: "🎨 CSS3", color: "text-blue-400" },
    { name: "💎 Tailwind CSS", color: "text-cyan-300" },
    { name: "🗄️ MySQL", color: "text-indigo-400" },
    { name: "🐙 Git/GitHub", color: "text-gray-300" },
    { name: "🔗 Netlify", color: "text-green-400" },
    { name: "⚡ Vercel", color: "text-white" },
    { name: "☁️ Render", color: "text-pink-400" },
  ];

  return (
    <section
      id="skills"
      className="relative p-12 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-400 font-retro border-b-2 border-pink-400 overflow-hidden"
    >
      {/* Animated Background Glow - Afternoon Burst */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#00ffff,#ff00ff,#ffd700,transparent)] animate-pulse"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_left,#00ffff,#ff00ff,#ffd700,#00ffff)] animate-spin-slow"></div>

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-6 text-center neon-text relative z-10 text-pink-400">
        <span className="animate-pulse">🛠 My Skills 🛠</span>
      </h2>

      {/* Divider Line */}
      <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 mx-auto mb-10 animate-pulse"></div>

      {/* Skills Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-pink-400 rounded-lg shadow-lg p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-cyan-500 hover:border-yellow-400"
          >
            <p className={`text-lg font-bold ${skill.color} neon-text`}>
              {skill.name}
            </p>
          </div>
        ))}
      </div>

      {/* Animated Footer Prompt */}
      <p className="mt-12 text-center text-cyan-300 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to explore my Projects...
      </p>
    </section>
  );
}
