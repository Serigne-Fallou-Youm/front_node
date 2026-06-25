import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Inscription = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!prenom || !nom || !email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/inscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prenom, nom, email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Inscription réussie ✔️");
        navigate("/connexion");
      } else {
        alert(result.message || "Erreur inscription");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🚀 Inscription
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />

          <input
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />

          <input
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            S'inscrire
          </button>

        </form>

        {/* LINK */}
        <p className="text-center mt-5 text-sm text-gray-600">
          Déjà un compte ?{" "}
          <Link
            to="/connexion"
            className="text-blue-600 font-semibold hover:underline"
          >
            Se connecter
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Inscription;