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
          `${import.meta.env.VITE_API_URL}/api/auth/profile/${user.id}`
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-red-500">
            Vous devez être connecté
          </h2>
        </div>
      </div>
    );
  }

  if (!profil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-xl font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Bouton retour */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-xl hover:scale-105 hover:bg-blue-50 transition-all duration-300"
        >
          ⬅ Retour à l'accueil
        </button>

        {/* Carte profil */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-white">
              {profil.user.prenom.charAt(0)}
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-extrabold text-gray-800">
                {profil.user.prenom} {profil.user.nom}
              </h1>

              <p className="text-gray-500 text-lg mt-2">
                 {profil.user.email}
              </p>

              <p className="text-blue-600 mt-3 font-semibold">
                Bienvenue sur votre espace personnel 
              </p>
            </div>

          </div>

        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <button
            onClick={() => setSection("questions")}
            className={`rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
              section === "questions"
                ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                : "bg-white"
            }`}
          >
            <h2 className="text-5xl font-black">
              {profil.statistiques.questions}
            </h2>

            <p className="mt-3 text-lg font-semibold">
               Questions
            </p>
          </button>

          <button
            onClick={() => setSection("reponses")}
            className={`rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
              section === "reponses"
                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                : "bg-white"
            }`}
          >
            <h2 className="text-5xl font-black">
              {profil.statistiques.reponses}
            </h2>

            <p className="mt-3 text-lg font-semibold">
               Réponses
            </p>
          </button>

          <button
            onClick={() => setSection("votes")}
            className={`rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
              section === "votes"
                ? "bg-gradient-to-br from-orange-400 to-red-500 text-white"
                : "bg-white"
            }`}
          >
            <h2 className="text-5xl font-black">
              {profil.statistiques.votes}
            </h2>

            <p className="mt-3 text-lg font-semibold">
               Votes
            </p>
          </button>

        </div>

        {/* Contenu */}
        <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8">

          {section === "questions" && (
            <>
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                 Mes Questions
              </h2>

              {profil.mesQuestions.length === 0 ? (
                <p className="text-gray-500 text-lg">
                  Aucune question publiée.
                </p>
              ) : (
                profil.mesQuestions.map((q) => (
                  <div
                    key={q._id}
                    className="p-5 mb-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <h3 className="font-bold text-lg text-gray-800">
                      {q.titre}
                    </h3>
                  </div>
                ))
              )}
            </>
          )}

          {section === "reponses" && (
            <>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">
                 Mes Réponses
              </h2>

              {profil.mesReponses.length === 0 ? (
                <p className="text-gray-500 text-lg">
                  Aucune réponse publiée.
                </p>
              ) : (
                profil.mesReponses.map((r) => (
                  <div
                    key={r._id}
                    className="p-5 mb-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <p className="text-gray-700">{r.content}</p>
                  </div>
                ))
              )}
            </>
          )}

          {section === "votes" && (
            <>
              <h2 className="text-3xl font-bold text-red-500 mb-6">
                 Mes Votes
              </h2>

              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl text-white p-10 text-center shadow-xl">
                <h1 className="text-7xl font-black">
                  {profil.statistiques.votes}
                </h1>

                <p className="text-2xl mt-4">
                  Total des votes reçus
                </p>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profil;