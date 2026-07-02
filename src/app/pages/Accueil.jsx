import React from "react";
import Questions from "./../../composants/Questions";


const Accueil = () => {


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    return (

        <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-6">


            <div className="max-w-5xl mx-auto">


                <div className="bg-white/95 backdrop-blur shadow-2xl rounded-3xl p-8 mb-8">


                    <h1 className="text-4xl font-extrabined text-gray-800 tracking-tight">

                        Bienvenue sur 

                        <span className="text-blue-600">
                            {" "}Mini Stack Overflow 
                        </span>

                    </h1>



                    <p className="mt-3 text-gray-600 text-lg">

                        Pose tes questions, partage tes connaissances et aide la communauté.

                    </p>




                    {
                        user && (

                            <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">


                                <h2 className="text-2xl font-bold">

                                    Bonjour {user.prenom} {user.nom} 

                                </h2>



                                <p className="mt-3 text-blue-100">

                                     {user.email}

                                </p>


                            </div>

                        )
                    }



                </div>





                <div className="bg-white rounded-3xl shadow-2xl p-7">


                    <div className="flex items-center justify-between mb-6">


                        <h2 className="text-2xl font-bold text-gray-800">

                            Questions récentes 

                        </h2>


                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

                            Communauté

                        </span>


                    </div>



                    <Questions />


                </div>



            </div>



        </div>

    );


};


export default Accueil;