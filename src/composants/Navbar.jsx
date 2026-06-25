import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [search, setSearch] = useState("");

  const Deconnexion = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md border-b px-6 py-3 flex items-center justify-between sticky top-0 z-50">

      {/* LOGO */}
      <NavLink
        to="/"
        className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        MiniStack 🚀
      </NavLink>

      {/* SEARCH */}
      <form
        onSubmit={handleSearch}
        className="flex w-[40%] max-w-xl"
      >
        <input
          type="text"
          placeholder="Rechercher une question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 focus:border-blue-500 outline-none px-4 py-2 rounded-l-full bg-gray-50"
        />

        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 rounded-r-full hover:opacity-90 transition"
        >
          🔍
        </button>
      </form>

      {/* MENU */}
      <div className="flex items-center gap-4">

        {/* POSER QUESTION */}
        {token && (
          <NavLink
            to="/ask"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
          >
            + Poser
          </NavLink>
        )}

        {/* USER CONNECTÉ */}
        {token ? (
          <>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {user?.prenom?.charAt(0)}
              </div>

              <span className="font-medium text-gray-700">
                {user?.prenom}
              </span>
            </div>

            <NavLink
              to="/profil"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Profil
            </NavLink>

            <button
              onClick={Deconnexion}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/connexion"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition"
            >
              Connexion
            </NavLink>

            <NavLink
              to="/inscription"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Inscription
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;