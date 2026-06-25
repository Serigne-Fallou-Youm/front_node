import React from "react";
import Questions from "./../../composants/Questions";


const Accueil = () => {


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    return (

        <div className="w-full min-h-screen bg-gray-100 p-6">


            <div className="bg-white shadow rounded p-6 mb-6">


                <h1 className="text-3xl font-bold">

                    Bienvenue sur Mini Stack Overflow 🚀

                </h1>



                {
                    user && (

                        <div className="mt-5">


                            <h2 className="text-xl font-semibold">

                                Bonjour {user.prenom} {user.nom}

                            </h2>



                            <p className="mt-2">

                                Email : {user.email}

                            </p>



                        </div>

                    )
                }



            </div>




            {/* LISTE DES QUESTIONS */}


            <Questions />


        </div>

    );


};


export default Accueil;