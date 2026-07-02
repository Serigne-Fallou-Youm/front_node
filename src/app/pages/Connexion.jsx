import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;
const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/connexion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        login(result);
        navigate("/");
      } else {
        alert(result.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.log(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
           Connexion
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              className="w-full border border-gray-200 p-3 rounded-lg mt-1 focus:outline-none focus:border-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@gmail.com"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Mot de passe</label>
            <input
              className="w-full border border-gray-200 p-3 rounded-lg mt-1 focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          {/* BUTTON */}
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Se connecter
          </button>

        </form>

        {/* LINK */}
        <p className="text-center mt-5 text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link
            to="/inscription"
            className="text-blue-600 font-semibold hover:underline"
          >
            Créer un compte
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Connexion;