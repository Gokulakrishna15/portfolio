import React from "react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="p-8 bg-black text-green-400 font-mono border-b-2 border-green-400"
    >
      <h2 className="text-2xl font-bold mb-6 animate-pulse">Highlighted Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Restaurant Reservation Platform */}
        <div className="p-4 border border-green-400 rounded-lg shadow-lg hover:shadow-pink-500 transition transform hover:-translate-y-1 hover:scale-105">
          <h3 className="font-semibold text-lg">🍽 Restaurant Reservation Platform</h3>
          <p className="text-green-300 mt-2">
            Full-stack MERN app with real-time availability, Stripe payments, Cloudinary uploads, and admin dashboard.
          </p>
          <div className="mt-3 space-x-4">
            <a href="https://eclectic-cucurucho-a9fcf2.netlify.app/" className="hover:text-pink-400 underline">
              Live Demo
            </a>
            <a href="https://github.com/Gokulakrishna15/restaurant-reservation-platform" className="hover:text-pink-400 underline">
              GitHub
            </a>
          </div>
        </div>

        {/* Password Reset System */}
        <div className="p-4 border border-green-400 rounded-lg shadow-lg hover:shadow-pink-500 transition transform hover:-translate-y-1 hover:scale-105">
          <h3 className="font-semibold text-lg">🔑 Password Reset System</h3>
          <p className="text-green-300 mt-2">
            Secure MERN workflow with JWT authentication & email verification.
          </p>
          <div className="mt-3 space-x-4">
            <a href="https://password-reset-frontend-prod.netlify.app/" className="hover:text-pink-400 underline">
              Live Demo
            </a>
            <a href="https://github.com/Gokulakrishna15/password-reset-frontend" className="hover:text-pink-400 underline">
              GitHub
            </a>
          </div>
        </div>

        {/* Invoice Builder */}
        <div className="p-4 border border-green-400 rounded-lg shadow-lg hover:shadow-pink-500 transition transform hover:-translate-y-1 hover:scale-105">
          <h3 className="font-semibold text-lg">🧾 Invoice Builder</h3>
          <p className="text-green-300 mt-2">
            Dynamic MERN app for invoice creation & management.
          </p>
          <div className="mt-3 space-x-4">
            <a href="https://sensational-macaron-af7801.netlify.app/" className="hover:text-pink-400 underline">
              Live Demo
            </a>
            <a href="https://github.com/Gokulakrishna15/invoice-builder" className="hover:text-pink-400 underline">
              GitHub
            </a>
          </div>
        </div>

        {/* Movies Search App */}
        <div className="p-4 border border-green-400 rounded-lg shadow-lg hover:shadow-pink-500 transition transform hover:-translate-y-1 hover:scale-105">
          <h3 className="font-semibold text-lg">🎬 Movies Search App</h3>
          <p className="text-green-300 mt-2">
            React + Tailwind CSS app using OMDB API with pagination and filters.
          </p>
          <div className="mt-3 space-x-4">
            <a href="https://tangerine-phoenix-243994.netlify.app/" className="hover:text-pink-400 underline">
              Live Demo
            </a>
            <a href="https://github.com/Gokulakrishna15/movies-search-app" className="hover:text-pink-400 underline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}