import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Connexion from './app/pages/Connexion';
import Inscription from './app/pages/Inscription';
import UserLayout from './app/layout/UserLayout';

import Accueil from './app/pages/Accueil';
import Profil from './app/pages/Profil';
import Detail from './app/pages/Detail';

import Ask from './app/pages/Ask';
import Search from './app/pages/Search';



const router = createBrowserRouter([


{
    path: "/",

    element:<UserLayout/>,

    children:[


        {
            path:"/",
            element:<Accueil/>
        },


        {
            path:"/connexion",
            element:<Connexion/>
        },


        {
            path:"/inscription",
            element:<Inscription/>
        },


        {
            path:"/profil",
            element:<Profil/>
        },


        {
            path:"/ask",
            element:<Ask/>
        },


        {
            path:"/question/:id",
            element:<Detail/>
        },


        {
            path:"/search",
            element:<Search/>
        }


    ]

}


]);




const App = ()=>{

    return <RouterProvider router={router}/>

};


export default App;