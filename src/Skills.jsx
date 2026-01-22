import React from "react";

export default function Skills() {
  const skills = [
    { name: "⚛️ React.js", color: "text-cyan-400", category: "Frontend" },
    { name: "🌐 HTML5", color: "text-orange-400", category: "Frontend" },
    { name: "🎨 CSS3", color: "text-blue-400", category: "Frontend" },
    { name: "💎 Tailwind CSS", color: "text-cyan-300", category: "Frontend" },
    { name: "✨ JavaScript", color: "text-yellow-300", category: "Frontend" },

    { name: "🌱 Node.js", color: "text-pink-400", category: "Backend" },
    { name: "🚀 Express.js", color: "text-purple-400", category: "Backend" },
    { name: "🍃 MongoDB", color: "text-green-300", category: "Backend" },
    { name: "🗄️ MySQL", color: "text-indigo-400", category: "Backend" },

    { name: "🐙 Git/GitHub", color: "text-gray-300", category: "Tools" },
    { name: "🔗 Netlify", color: "text-green-400", category: "Tools" },
    { name: "☁️ Render", color: "text-pink-400", category: "Tools" },
  ];

  const categories = ["Frontend", "Backend", "Tools"];

  return (
    <section
      id="skills"
      className="relative p-12 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-cyan-400 font-retro border-b-2 border-pink-400 overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#00ffff,#ff00ff,#ffd700,transparent)] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 opacity-10 bg-[conic-gradient(at_bottom_left,#00ffff,#ff00ff,#ffd700,#00ffff)] animate-[spin_40s_linear_infinite]"></div>

      {/* ✨ Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
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

      {/* 🛠 Heading */}
      <h2 className="text-4xl font-bold mb-4 text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-300 to-yellow-300 animate-pulse">
        🛠 My Skills 🛠
      </h2>

      {/* 💫 Divider */}
      <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 mx-auto mb-6 animate-pulse"></div>

      {/* 🧠 Intro */}
      <p className="text-center text-cyan-300 text-lg max-w-3xl mx-auto mb-10 animate-[fadeIn_2s_ease-in]">
        I specialize in building full stack web applications using modern technologies, clean code practices, and visually engaging UI/UX. 
        Over the course of my training and projects, I’ve gained strong hands-on experience with frontend frameworks, backend APIs, and deployment workflows. 
        Here’s a breakdown of the tools I use and how deeply I know them:
      </p>

      {/* 🔧 Grouped Skills */}
      <div className="relative z-10 space-y-12 max-w-6xl mx-auto">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-2xl font-bold text-center text-pink-300 mb-2">
              {category} Technologies
            </h3>
            <p className="text-center text-sm text-cyan-200 mb-6 italic">
              {category === "Frontend" &&
                "I can design responsive UIs, manage state with React, and ensure accessibility and performance."}
              {category === "Backend" &&
                "I’m confident in building REST APIs, handling authentication, and managing databases with efficiency."}
              {category === "Tools" &&
                "I use Git/GitHub for version control, and I’m comfortable deploying apps on Netlify and Render."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 border border-pink-400 rounded-lg shadow-lg p-6 text-center transform transition duration-500 hover:scale-105 hover:rotate-1 hover:shadow-cyan-500 hover:border-yellow-400 animate-[fadeInUp_0.5s_ease-in-out] hover:animate-none"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <p className={`text-lg font-bold ${skill.color} neon-text`}>
                      {skill.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* ⬇️ Footer Prompt */}
      <p className="mt-12 text-center text-cyan-300 text-sm animate-bounce relative z-10">
        ⬇️ Scroll down to explore my Projects...
      </p>
    </section>
  );
}