import React from "react";
import "../../styles/favoritos.css"; // Asegúrate de importar tus estilos CSS

const Favoritos = ({ favoritos }) => {
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