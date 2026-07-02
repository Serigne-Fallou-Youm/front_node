import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Ask = () => {


    const navigate = useNavigate();


    const [titre, setTitre] = useState("");

    const [description, setDescription] = useState("");

    const [tags, setTags] = useState("");



    const handleSubmit = async (e) => {


        e.preventDefault();



        const token = localStorage.getItem("token");



        try {


            const response = await fetch(
                "http://localhost:3000/api/questions",
                {

                    method: "POST",


                    headers: {

                        "Content-Type": "application/json",

                        "Authorization": `Bearer ${token}`

                    },


                    body: JSON.stringify({

                        titre,

                        description,

                        tags: tags.split(",")

                    })

                }

            );



            const data = await response.json();



            console.log(data);



            if(response.ok){


                alert("Question publiée avec succès");


                navigate("/");


            }else{


                alert(data.message || "Erreur");


            }




        } catch(error){

    console.log("ERREUR :", error);

    alert(error.message);

}



    };
return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-[30px] shadow-2xl overflow-hidden">

            {/* En-tête */}
            <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white p-10 text-center">

                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto text-5xl shadow-lg">
                    <span className="text-4xl">❓</span>
                </div>

                <h1 className="text-4xl font-extrabold mt-5">
                    Poser une question
                </h1>

                <p className="mt-3 text-blue-100 text-lg">
                    Décrivez clairement votre problème afin d'obtenir les meilleures réponses.
                </p>

            </div>

            {/* Formulaire */}
            <form
                onSubmit={handleSubmit}
                className="p-10 space-y-7"
            >

                <div>
                    <label className="block text-gray-700 font-bold mb-2">
                         Titre
                    </label>

                    <input
                        type="text"
                        placeholder="Ex : Erreur React lors du démarrage"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 p-4 text-lg focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">
                         Description
                    </label>

                    <textarea
                        placeholder="Expliquez votre problème avec le maximum de détails..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 p-4 h-48 text-lg resize-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-200 outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">
                         Tags
                    </label>

                    <input
                        type="text"
                        placeholder="React, Node.js, Express, MongoDB..."
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 p-4 text-lg focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-200 outline-none transition"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                        Exemple : React, JavaScript, Laravel, Node.js
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white font-bold text-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                     Publier la question
                </button>

            </form>

        </div>

    </div>
);



};


export default Ask;