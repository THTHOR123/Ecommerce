import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState  = createContext();

export const DataProvider = ({children})=>{

    const [token,setToken] =useState(false);


    const refreshToken = async()=>{
        try {
            console.log("refersh token started");
            const res = await axios.get('/user/refresh_token');
            console.log(res);
            setToken(res.data.accesstoken);
        } catch (err) {
            console.error('Error refreshing token:', err);
        }
    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) refreshToken();
    },[]);

    const state = {
        token:[token,setToken],
        productAPI:ProductAPI(),
        userAPI:UserAPI(token)
    }

    ProductAPI();

    return(

        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}