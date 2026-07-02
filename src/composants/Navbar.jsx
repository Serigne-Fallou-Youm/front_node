import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false); // mobile menu

  const Deconnexion = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setOpen(false);
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md border-b px-4 md:px-6 py-3 sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          MiniStack 🚀
        </NavLink>

        {/* BURGER */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4">

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="flex w-[320px]">
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 focus:border-blue-500 outline-none px-3 py-2 rounded-l-full bg-gray-50"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 rounded-r-full">
              🔍
            </button>
          </form>

          {/* USER MENU */}
          {token ? (
            <>
              <NavLink to="/ask" className="bg-green-600 text-white px-4 py-2 rounded-full">
                + Poser une question
              </NavLink>

              <NavLink to="/profil" className="text-gray-700 hover:text-blue-600">
                Profil
              </NavLink>

              <button
                onClick={Deconnexion}
                className="bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink to="/connexion" className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full">
                Connexion
              </NavLink>

              <NavLink to="/inscription" className="bg-blue-600 text-white px-4 py-2 rounded-full">
                Inscription
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-3">

          {/* SEARCH MOBILE */}
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border px-3 py-2 rounded-l-full bg-gray-50"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-full">
              🔍
            </button>
          </form>

          {token ? (
            <>
              <NavLink to="/ask" onClick={() => setOpen(false)}>
                + Poser une question
              </NavLink>

              <NavLink to="/profil" onClick={() => setOpen(false)}>
                Profil
              </NavLink>

              <button onClick={Deconnexion} className="text-left text-red-600">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink to="/connexion" onClick={() => setOpen(false)}>
                Connexion
              </NavLink>

              <NavLink to="/inscription" onClick={() => setOpen(false)}>
                Inscription
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;