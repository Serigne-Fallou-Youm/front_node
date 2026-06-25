import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profil, setProfil] = useState(null);
  const [section, setSection] = useState("questions");

  useEffect(() => {
    const getProfil = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/profile/${user.id}`
        );

        const data = await response.json();
        setProfil(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      getProfil();
    }
  }, [user]);

  if (!user) {
    return <div className="p-10">Vous devez être connecté</div>;
  }

  if (!profil) {
    return <div className="p-10">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-white shadow px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        ← Retour à l'accueil
      </button>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        👤 Profil utilisateur
      </h1>

      {/* PROFILE CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl border-l-4 border-blue-500">

        <div className="flex items-center gap-4">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold shadow">
            {user.prenom.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {profil.user.prenom} {profil.user.nom}
            </h2>
            <p className="text-gray-500">{profil.user.email}</p>
          </div>

        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-5 mt-8 max-w-xl">

        <button
          onClick={() => setSection("questions")}
          className={`p-5 rounded-xl shadow transition transform hover:scale-105 ${
            section === "questions"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold">
            {profil.statistiques.questions}
          </h2>
          <p>Questions</p>
        </button>

        <button
          onClick={() => setSection("reponses")}
          className={`p-5 rounded-xl shadow transition transform hover:scale-105 ${
            section === "reponses"
              ? "bg-purple-500 text-white"
              : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold">
            {profil.statistiques.reponses}
          </h2>
          <p>Réponses</p>
        </button>

        <button
          onClick={() => setSection("votes")}
          className={`p-5 rounded-xl shadow transition transform hover:scale-105 ${
            section === "votes"
              ? "bg-pink-500 text-white"
              : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold">
            {profil.statistiques.votes}
          </h2>
          <p>Votes</p>
        </button>

      </div>

      {/* CONTENT */}
      <div className="mt-8 max-w-xl bg-white p-6 rounded-2xl shadow-lg border">

        {section === "questions" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              📝 Mes questions
            </h2>

            {profil.mesQuestions.map((q) => (
              <div
                key={q._id}
                className="p-3 border-b hover:bg-gray-50 transition"
              >
                {q.titre}
              </div>
            ))}
          </>
        )}

        {section === "reponses" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-purple-600">
              💬 Mes réponses
            </h2>

            {profil.mesReponses.map((r) => (
              <div
                key={r._id}
                className="p-3 border-b hover:bg-gray-50 transition"
              >
                {r.content}
              </div>
            ))}
          </>
        )}

        {section === "votes" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-pink-600">
              🏆 Votes
            </h2>

            <p className="text-lg">
              Total des votes reçus :
              <span className="font-bold text-pink-600 ml-2">
                {profil.statistiques.votes}
              </span>
            </p>
          </>
        )}

      </div>
    </div>
  );
};

export default Profil;