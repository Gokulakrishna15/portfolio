import React from "react";

export default function Skills() {
  return (
    <section id="skills" className="p-8 bg-black text-green-400 font-mono border-b-2 border-green-400">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <ul className="list-disc list-inside text-green-300">
        <li>ReactJS</li>
        <li>Node.js</li>
        <li>MongoDB</li>
        <li>Express.js</li>
        <li>MySQL</li>
        <li>Tailwind CSS</li>
      </ul>
    </section>
  );
}