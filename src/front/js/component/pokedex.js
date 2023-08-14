import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/pokedex.css";

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
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="¿Qué Pokémon buscas?"
          onChange={handleChange}
        />
      

        {load ? (
          <p>Loading...</p>
        ) : (
          buscar.length > 0 ? ( 
            buscar.map((img, i) => (
              <div id={img.id} key={img.id}>
                <div >
                  <img src={img.sprites.front_default} className="pokemon-img" alt='pokemon' />
                  <div >
                    <h5>{img.name}</h5>
                    <h6>type: {img.types[0].type.name}</h6>
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            poke.map((img, i) => (
              <div className="row columna ">
              <div className="card-pkm">
              <div className="center-that"  id={img.id} key={img.id}>
                
                  <img src={img.sprites.front_default} alt='pokemon' />
                  <div className='card'>
                    <div className="nameNumber">
                  <h5 className="pokemon-id">#{img.id}</h5>
                    <h5 className="pokemon-name">{img.name}</h5>
                    </div>
                    <h6 className="type">{img.types[0].type.name}</h6>
                    <Link to= "/pokemonDetail" className="detalle-pokedex">Detalle del pokemon</Link>
                  
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
