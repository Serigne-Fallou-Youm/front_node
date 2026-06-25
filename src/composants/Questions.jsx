import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";


const Questions = () => {


    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sort, setSort] = useState("recent");



    const fetchQuestions = async () => {


        try {


            setLoading(true);


            const response = await fetch(
                `http://localhost:3000/api/questions?sort=${sort}`
            );


            const data = await response.json();


            setQuestions(data);



        } catch(error){


            console.error(error);

            setError("Impossible de charger les questions");


        } finally{


            setLoading(false);


        }


    };





    useEffect(()=>{

        fetchQuestions();

    },[sort]);





    if(loading){

        return (

            <div className="p-10 text-center">

                Chargement des questions...

            </div>

        );

    }





    return (

        <div className="w-full p-10">


            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">

                    Les questions

                </h1>




                <select

                    className="border p-2 rounded"

                    value={sort}

                    onChange={(e)=>setSort(e.target.value)}

                >

                    <option value="recent">
                        Plus récentes
                    </option>


                    <option value="popular">
                        Plus populaires
                    </option>


                    <option value="unanswered">
                        Sans réponse
                    </option>


                </select>


            </div>





            {
                error && (

                    <p className="text-red-500">

                        {error}

                    </p>

                )
            }






            {
                questions.length === 0 ? (

                    <p>
                        Aucune question pour le moment
                    </p>


                ) : (


                    <div className="space-y-4">


                        {
                            questions.map((question)=>(


                                <QuestionCard

                                    key={question._id}

                                    question={question}

                                />


                            ))
                        }


                    </div>


                )
            }





        </div>

    );

};



export default Questions;