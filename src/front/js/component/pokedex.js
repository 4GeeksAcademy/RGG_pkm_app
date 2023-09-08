import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/pokedex.css";
import { Favoritos } from "./favoritos"; // Asegúrate de importar el componente Favoritos correctamente

export const Pokedex = () => {
  const [result, setResult] = useState([]);
  const [poke, setPoke] = useState([]);
  const [load, setLoad] = useState(true);
  const [buscar, setBuscar] = useState([]);
  const [tablaPokemon, setTablaPokemon] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [favoritos, setFavoritos] = useState([]); // Estado para los favoritos

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const agregarFavorito = (pokemonName) => {
    setFavoritos([...favoritos, pokemonName]);
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
            setTablaPokemon(allpokemon);
            setLoad(false);
          })
          .catch((error) => {
            console.error('Error fetching Pokémon data:', error);
            setLoad(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching Pokémon list:', error);
        setLoad(false);
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
                      {/* Agregar a Favoritos */}
                      <button onClick={() => agregarFavorito(img.name)}>Agregar a Favoritos</button>
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
                      {/* Agregar a Favoritos */}
                      <button onClick={() => agregarFavorito(img.name)}>Agregar a Favoritos</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
      {/* Renderiza el componente Favoritos y pasa la lista de favoritos como prop */}
      <Favoritos favoritos={favoritos} />
    </div>
  );
};
