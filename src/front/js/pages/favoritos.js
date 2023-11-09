import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/favoritos.css";

export const Favoritos = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Cargar los Pokémon favoritos cuando se monta el componente
    fetch(process.env.BACKEND_URL + '/favoritos',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token, // Asegúrate de incluir el token JWT
      },
    })
      .then((response) => response.json())
      .then((data) => {
        actions.setFavourites(data);
      })
      .catch((error) => {
        console.error('Error al obtener los favoritos:', error);
      });
  }, []); // La dependencia vacía asegura que se carga solo una vez al montar el componente

  const DelFavourite = (pokemonId) => {
    // Envía una solicitud al backend para eliminar el Pokémon de favoritos
    fetch(process.env.BACKEND_URL + '/remove_favorite/' + pokemonId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token, // Asegúrate de incluir el token JWT
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de favoritos después de eliminar
        actions.removeFavourite(pokemonId);
      })
      .catch((error) => {
        console.error('Error al eliminar de favoritos:', error);
      });
  };
console.log(store.favourites)
  return (
    <div className="favoritos-container">
      <ul className="favoritos-list">
        {store.favourites.length === 0 ? (
          <li>
            No has agregado ningún Pokémon a tus favoritos. Agrega uno{" "}
            <Link to="/pokedex">aquí</Link>
          </li>
        ) : (
          store.favourites.map((pokemon) => {
            return (
              <li key={pokemon.id}>
                <div className="app">
                  <div className="pokegallery">
                    <div className="row columna">
                      <div className="card-pkm">
                        <div className="center-that" id={pokemon.id}>
                          {/* Mostrar detalles del Pokémon favorito aquí */}
                          <Link to={`/pokedex/${pokemon.id}`} className="detalle-pokedex">
                            Detalle del Pokémon
                          </Link>
                          <button
  className="btn button-favourites"
  onClick={() => DelFavourite(pokemon.id)}>
  Eliminar de favoritos
</button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Favoritos;
