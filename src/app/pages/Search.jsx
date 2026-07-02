import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [questions, setQuestions] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  const fetchSearch = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/search?q=${query}`
      );

      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearch();
    }
  }, [query]);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-5">
        Résultats pour : "{query}"
      </h1>

      {questions.length === 0 ? (
        <p>Aucune question trouvée</p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="border p-4 mb-3 rounded">

            <h2 className="font-bold">{q.titre}</h2>
            <p className="text-gray-600">
              {q.description?.slice(0, 120)}...
            </p>

          </div>
        ))
      )}

    </div>
  );
};

export default Search;