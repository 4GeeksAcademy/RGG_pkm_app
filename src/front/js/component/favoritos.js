import React, { useState, useEffect,useContext } from "react";
import {Context} from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/favoritos.css";

export const Favoritos = () => {
  const {store} = useContext(Context)
  return (
    <>
    <ul>
      {
        store.favourites.map((img)=>{
          return <li>{img.name}</li>
        })
      }
    </ul>
    </>
  );
};

export default Favoritos;