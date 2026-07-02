import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionForm = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ======================
  // SUBMIT QUESTION
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !description) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titre,
          description,
          tags: tags.split(",").map((t) => t.trim()), // conversion string → array
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Question publiée avec succès ");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-2xl font-bold mb-6">
        Poser une question
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TITRE */}
        <div>
          <label className="font-semibold">Titre</label>
          <input
            type="text"
            className="w-full border p-3 mt-1"
            placeholder="Ex: Comment utiliser useEffect ?"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-3 mt-1 h-40"
            placeholder="Explique ton problème..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="font-semibold">Tags</label>
          <input
            type="text"
            className="w-full border p-3 mt-1"
            placeholder="react,node,express (séparés par des virgules)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800"
        >
          Publier la question
        </button>

      </form>

    </div>
  );
};

export default QuestionForm;