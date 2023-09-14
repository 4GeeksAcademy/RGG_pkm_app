import React, { useState, useEffect,useContext } from "react";
import {Context} from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/favoritos.css";

export const Favoritos = () => {
  const {store} = useContext(Context)
  return (
  
    
    <div className="favoritos-container">
      <ul className="favoritos-list">
       {store.favourites.length === 0 ? ( // Verifica si no hay favoritos
          <li>No has agregado ningún Pokémon a tus favoritos.Agrega uno <Link to="/pokedex">aquí</Link></li>
        ) : (
        
        store.favourites.map((img)=>{
          
          return <li>  
            <div className="app">
            <div className="pokegallery">
             <div className="row columna " key={img.id}>
                <div className="card-pkm">
          <div className="center-that" id={img.id}>
            <img src={img.sprites.front_default} alt='pokemon' />
            <div className='card'>
              <div className="nameNumber">
                <h5 className="pokemon-id">#{img.id}</h5>
                <h5 className="pokemon-name">{img.name}</h5>
              </div>
              <div className="types">
                <h6></h6>
                <div className="type-pokedex">
                  {img.types.map((type, index) => (
                    <div key={index} className="type-box">
                      {type.type.name}
                    </div>
                  ))}
                </div>
              </div>
              <Link to={`/pokedex/${img.id}`} className="detalle-pokedex">Detalle del pokemon</Link>
              {/* Agregar a Favoritos */}
              <button className="btn btn-success" 
              onClick={() =>{actions.setFavourite(img)}}>Agregar a favoritos</button>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </li>;
              
                 
          
          
        })
      )}
    </ul>
    
</div>
  );
};

export default Favoritos;