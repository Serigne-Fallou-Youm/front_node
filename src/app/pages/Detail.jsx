import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [contenu, setContenu] = useState("");

  const [editQuestion, setEditQuestion] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [editAnswerId, setEditAnswerId] = useState(null);
  const [editAnswerText, setEditAnswerText] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  // ======================
  // FETCH QUESTION
  // ======================
  const fetchQuestion = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/${id}`);
      const data = await res.json();

      setQuestion(data);
      setEditTitle(data.titre);
      setEditDesc(data.description);
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // FETCH ANSWERS
  // ======================
  const fetchAnswers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/answers/${id}`);
      const data = await res.json();

      setAnswers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // ADD ANSWER
  // ======================
  const handleAnswer = async (e) => {
    e.preventDefault();

    if (!token) return alert("Vous devez être connecté");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/answers/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ contenu }),
        }
      );

      const data = await res.json();

      setAnswers((prev) => [data, ...prev]);
      setContenu("");
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // DELETE QUESTION
  // ======================
  const deleteQuestion = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/questions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // UPDATE QUESTION
  // ======================
  const updateQuestion = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titre: editTitle,
          description: editDesc,
        }),
      });

      setEditQuestion(false);
      fetchQuestion();
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // DELETE ANSWER
  // ======================
  const deleteAnswer = async (answerId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/answers/${answerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setAnswers((prev) =>
        prev.filter((a) => a._id !== answerId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // UPDATE ANSWER
  // ======================
  const updateAnswer = async (answerId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/answers/${answerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contenu: editAnswerText }),
      });

      setAnswers((prev) =>
        prev.map((a) =>
          a._id === answerId
            ? { ...a, content: editAnswerText }
            : a
        )
      );

      setEditAnswerId(null);
      setEditAnswerText("");
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // VOTE QUESTION
  // ======================
  const voteQuestion = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${id}/vote`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      setQuestion((prev) => ({
        ...prev,
        votes: data.votes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // VOTE ANSWER
  // ======================
  const voteAnswer = async (answerId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/answers/vote/${answerId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      setAnswers((prev) =>
        prev.map((a) =>
          a._id === answerId
            ? { ...a, votes: data.votes }
            : a
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // BEST ANSWER
  // ======================
  const markBestAnswer = async (answerId) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${id}/best/${answerId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchQuestion();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [id]);

  if (!question) return <p className="p-10">Chargement...</p>;

  const sortedAnswers = [...answers].sort((a, b) => {
    if (a._id === question.bestAnswer) return -1;
    if (b._id === question.bestAnswer) return 1;
    return (b.votes || 0) - (a.votes || 0);
  });

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      {/* BACK */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600"
      >
        ⬅ Retour accueil
      </button>

      {/* QUESTION */}
      <div className="bg-white p-5 rounded shadow">

        {!editQuestion ? (
          <>
            <h1 className="text-2xl font-bold">{question.titre}</h1>
            <p className="mt-2 text-gray-700">
              {question.description}
            </p>

            <div className="mt-3 flex gap-3 items-center">

              <button
                onClick={voteQuestion}
                className="bg-blue-100 px-3 py-1 rounded"
              >
                 {question.votes || 0}
              </button>

              {userId === question.auteur?._id && (
                <>
                  <button onClick={() => setEditQuestion(true)}>
                     Modifier
                  </button>

                  <button onClick={deleteQuestion}>
                     Supprimer
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <input
              className="border p-2 w-full"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              className="border p-2 w-full mt-2"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />

            <button
              onClick={updateQuestion}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* ANSWER FORM */}
      <div className="bg-white mt-6 p-5 rounded shadow">

        <h2 className="font-bold mb-3"> Répondre</h2>

        {!token ? (
          <p className="text-red-500">
            Vous devez être connecté pour répondre
          </p>
        ) : (
          <form onSubmit={handleAnswer}>
            <textarea
              className="border w-full p-3"
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              placeholder="Écris ta réponse..."
            />

            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Répondre
            </button>
          </form>
        )}
      </div>

      {/* ANSWERS */}
      <div className="mt-6">

        <h2 className="text-xl font-bold mb-3">
           Réponses ({answers.length})
        </h2>

        {sortedAnswers.map((a) => (
          <div
            key={a._id}
            className="bg-white p-4 mb-3 rounded shadow"
          >

            {editAnswerId === a._id ? (
              <>
                <textarea
                  className="border w-full p-2"
                  value={editAnswerText}
                  onChange={(e) =>
                    setEditAnswerText(e.target.value)
                  }
                />

                <button
                  onClick={() => updateAnswer(a._id)}
                  className="bg-green-600 text-white px-3 py-1 mt-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p>{a.content}</p>

                <div className="flex gap-3 mt-2">

                  <button
                    onClick={() => voteAnswer(a._id)}
                    className="bg-gray-100 px-2 rounded"
                  >
                     {a.votes || 0}
                  </button>

                  {userId === a.author?._id && (
                    <>
                      <button
                        onClick={() => {
                          setEditAnswerId(a._id);
                          setEditAnswerText(a.content);
                        }}
                      >
                        
                      </button>

                      <button
                        onClick={() => deleteAnswer(a._id)}
                      >
                        
                      </button>
                    </>
                  )}

                  {userId === question.auteur?._id && (
                    <button
                      onClick={() =>
                        markBestAnswer(a._id)
                      }
                    >
                       Best
                    </button>
                  )}

                </div>
              </>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default Detail;