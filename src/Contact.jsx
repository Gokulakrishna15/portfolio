import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="p-8 bg-black text-green-400 font-mono border-b-2 border-green-400">
      <h2 className="text-2xl font-bold mb-4">☎ Contact Me</h2>
      <div className="space-y-2 text-green-300">
        <p>✉ Email: <a href="mailto:gokulakrishna578@gmail.com" className="hover:text-pink-400">gokulakrishna578@gmail.com</a></p>
        <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/gokulakrishna-n-e-771952388" className="hover:text-pink-400">Profile</a></p>
        <p>💻 GitHub: <a href="https://github.com/Gokulakrishna15" className="hover:text-pink-400">Profile</a></p>
        <p>📞 Phone: <a href="tel:+918220380511" className="hover:text-pink-400">+91 82203 80511</a></p>
      </div>
    </section>
  );
}