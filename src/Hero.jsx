import React from "react";

export default function Hero() {
  return (
    <section className="bg-black text-green-400 font-retro h-screen flex flex-col justify-center items-center border-b-2 border-green-400">
      {/* Blinking Title */}
      <h2 className="text-4xl font-bold mb-4">
        Certified MERN Full Stack Developer <span className="cursor"></span>
      </h2>

      {/* Subtitle */}
      <p className="text-green-300 text-lg mb-6">
        IIT-M Pravartak | GUVI ZenClass
      </p>

      {/* Glowing Resume Button (Google Drive link) */}
      <a
        href="https://drive.google.com/file/d/1y_UR29fGr0QTeOzSe1dnlPbfy4GSm5-p/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-400 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-pink-400 hover:shadow-pink-500 transition transform hover:scale-105"
      >
         Show Resume
      </a>

      {/* Retro Footer Prompt */}
      <p className="mt-8 text-green-300 text-sm animate-pulse">
        ▼ Scroll down to continue...
      </p>
    </section>
  );
}