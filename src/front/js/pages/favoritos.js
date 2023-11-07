import React, { useState, useEffect,useContext } from "react";
import {Context} from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/favoritos.css";

export const Favoritos = () => {
  const { store, actions } = useContext(Context);
  const DelFavourite = (img) => {
    // Envía una solicitud al backend para eliminar el Pokémon de favoritos
    fetch('/remove_favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pokemon_id: img.id }), // Envía el ID del Pokémon
    })
      .then((response) => response.json())
      .then((data) => {
        // Realiza acciones en la interfaz de usuario según la respuesta del servidor
        // Por ejemplo, elimina el Pokémon de la lista de favoritos en el frontend.
      })
      .catch((error) => {
        console.error('Error al eliminar de favoritos:', error);
      });
  };
  

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
              <button className="btn button-favourites" 
              onClick={() =>{actions.DelFavourite(img)}}>Eliminar de favoritos</button>
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