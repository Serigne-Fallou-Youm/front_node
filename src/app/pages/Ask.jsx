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


        <div className="min-h-screen bg-gray-100 p-10">



            <h1 className="text-3xl font-bold mb-6">

                Poser une question

            </h1>




            <form

                onSubmit={handleSubmit}

                className="bg-white p-6 rounded shadow max-w-3xl"

            >



                <input


                    type="text"


                    placeholder="Titre de la question"


                    value={titre}


                    onChange={(e)=>setTitre(e.target.value)}


                    className="w-full border p-3 rounded mb-4"


                />






                <textarea


                    placeholder="Description de votre problème"


                    value={description}


                    onChange={(e)=>setDescription(e.target.value)}


                    className="w-full border p-3 rounded h-40 mb-4"


                />






                <input


                    type="text"


                    placeholder="Tags séparés par virgule : React, Node"


                    value={tags}


                    onChange={(e)=>setTags(e.target.value)}


                    className="w-full border p-3 rounded"


                />







                <button


                    className="mt-5 bg-blue-600 text-white px-6 py-2 rounded"


                >

                    Publier


                </button>





            </form>



        </div>


    );


};


export default Ask;