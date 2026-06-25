import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white mt-12 py-10">

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LOGO */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            MiniStack 🚀
          </h1>

          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Pose des questions, partage tes connaissances et aide la communauté des développeurs.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h2 className="font-bold mb-4 text-white text-lg">
            Navigation
          </h2>

          <div className="flex flex-col gap-2 text-gray-400">

            <NavLink
              to="/"
              className="hover:text-blue-400 transition"
            >
              🏠 Questions
            </NavLink>

            <NavLink
              to="/ask"
              className="hover:text-green-400 transition"
            >
              ✍️ Poser une question
            </NavLink>

            <NavLink
              to="/profil"
              className="hover:text-purple-400 transition"
            >
              👤 Mon profil
            </NavLink>

          </div>
        </div>

        {/* TAGS */}
        <div>
          <h2 className="font-bold mb-4 text-white text-lg">
            Tags populaires
          </h2>

          <div className="flex flex-wrap gap-2">

            {["React", "Node.js", "MongoDB", "JavaScript"].map((tag) => (
              <span
                key={tag}
                className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-sm hover:bg-white/20 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}

          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MiniStack - Tous droits réservés
        </p>

      </div>

    </footer>
  );
};

export default Footer;