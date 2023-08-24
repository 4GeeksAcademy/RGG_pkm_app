import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/pokedex.css";

function ClickCounter({ pokemonName }) {
  const [count, setCount] = useState(0);

  const addFav = () => {
    alert("Has agregado " + pokemonName + " a mis favoritos");
    
  };

  return (
    <div>
      <button onClick={addFav} className="button-favourites">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
          <path d="..." />
        </svg>
        Agregar a mis favoritos
      </button>
     
    </div>
  );
}

export const Pokedex = () => {
  const [result, setResult] = useState([]);
  const [poke, setPoke] = useState([]);
  const [load, setLoad] = useState(true);
  const [buscar, setBuscar] = useState([]);
  const [tablaPokemon, setTablaPokemon] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = tablaPokemon.filter((elemento) =>
      elemento.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setBuscar(resultadoBusqueda);
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then((response) => response.json())
      .then((data) => {
        const fetchPromises = data.results.map((item) =>
          fetch(item.url).then((response) => response.json())
        );

        Promise.all(fetchPromises)
          .then((allpokemon) => {
            setPoke(allpokemon);
            setTablaPokemon(allpokemon); // Guarda los datos en tablaPokemon para el filtrado
            setLoad(false);
          })
          .catch((error) => {
            console.error('Error fetching Pokémon data:', error);
            setLoad(false); // Set load to false even in case of an error
          });
      })
      .catch((error) => {
        console.error('Error fetching Pokémon list:', error);
        setLoad(false); // Set load to false in case of an error
      });
  }, []);

  return (
    <div className="App">
      <div className='pokegallery'>
        <input className="form-control inputBuscar" value={busqueda} placeholder="¿Qué Pokémon buscas?" onChange={handleChange}/>
      
        {load ? (
          <p>Loading...</p>
        ) : (
          buscar.length > 0 ? ( 
            buscar.map((img, i) => (
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
                      <ClickCounter pokemonName={img.name} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            poke.map((img, i) => (
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
                      <ClickCounter pokemonName={img.name} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};
