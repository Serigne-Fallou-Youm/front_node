import React, { createContext, useContext, useState } from "react";


// création du contexte

const AuthContext = createContext();



// Provider qui englobe l'application

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(() => {


        const savedUser = localStorage.getItem("user");


        return savedUser 
            ? JSON.parse(savedUser) 
            : null;


    });



    const [token, setToken] = useState(() => {


        return localStorage.getItem("token") || null;


    });






    // connexion

    const login = (data) => {


        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );



        setToken(data.token);


        setUser(data.user);


    };






    // déconnexion

    const logout = () => {


        localStorage.removeItem("token");


        localStorage.removeItem("user");


        setToken(null);


        setUser(null);


    };






    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                login,

                logout

            }}

        >

            {children}


        </AuthContext.Provider>


    );


};






// utiliser le contexte

export const useAuth = () => {


    return useContext(AuthContext);


};