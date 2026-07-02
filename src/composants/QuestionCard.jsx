import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(question.likes?.length || 0);
  const [dislikes, setDislikes] = useState(question.dislikes?.length || 0);

  const token = localStorage.getItem("token");

  const likeQuestion = async (e) => {
    e.stopPropagation();

    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${question._id}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dislikeQuestion = async (e) => {
    e.stopPropagation();

    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/questions/${question._id}/dislike`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => navigate(`/question/${question._id}`)}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-3">
        {question.titre}
      </h2>

      <p className="text-gray-600 mb-5">
        {question.description}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-5">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* ACTIONS */}
      <div
        className="flex items-center justify-between border-t pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-3">
          <button
            onClick={likeQuestion}
            className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full transition"
          >
            👍 {likes}
          </button>

          <button
            onClick={dislikeQuestion}
            className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-full transition"
          >
            👎 {dislikes}
          </button>
        </div>

        <div className="text-gray-500 font-medium">
          💬 {question.reponses || 0} réponses
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;