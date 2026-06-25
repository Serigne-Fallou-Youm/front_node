import React from "react";
import { useNavigate } from "react-router-dom";


const QuestionCard = ({ question }) => {


    const navigate = useNavigate();



    return (

        <div

            onClick={() => navigate(`/question/${question._id}`)}

            className="border p-5 rounded cursor-pointer hover:shadow"

        >



            <h2 className="font-bold text-blue-600">

                {question.titre}

            </h2>




            <p className="mt-2">

                {question.description}

            </p>





            <div className="mt-3 text-sm">


                👍 {question.votes || 0} votes

                {" | "}

                💬 {question.reponses || 0} réponses



            </div>



        </div>

    );


};



export default QuestionCard;