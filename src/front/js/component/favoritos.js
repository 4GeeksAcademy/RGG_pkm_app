import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/favoritos.css";

export const Favoritos = ({ favoritos }) => {
  return (
    <div className="favoritos-container">
      <h2>Mis Pokémon Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No has agregado ningún Pokémon a tus favoritos.</p>
      ) : (
        <ul>
          {favoritos.map((pokemonName) => (
            <li key={pokemonName}>{pokemonName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favoritos;