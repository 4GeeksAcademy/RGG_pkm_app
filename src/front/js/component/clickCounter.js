function ClickCounter({ pokemonName, agregarFavorito, eliminarFavorito, esFavorito }) {
    const handleFavoritoClick = () => {
      if (esFavorito) {
        eliminarFavorito(pokemonName);
      } else {
        agregarFavorito(pokemonName);
      }
    };
  
    return (
      <div>
        <button onClick={handleFavoritoClick} className="button-favourites">
          {esFavorito ? "Eliminar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    );
  }