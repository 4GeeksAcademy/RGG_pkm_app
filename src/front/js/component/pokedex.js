import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/demo.css";
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
        <button className="btn btn-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>

        {load ? (
          <p>Loading...</p>
        ) : (
          buscar.length > 0 ? ( // Utiliza 'buscar' para el filtrado
            buscar.map((img, i) => (
              <div id={img.id} key={img.id}>
                <div className='card' style={{ width: '10rem', height: '15rem', backgroundColor: '#F0F0C9' }}>
                  <img src={img.sprites.front_default} alt='pokemon' />
                  <div>
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
              <div className="  col-3" id={img.id} key={img.id}>
                
                  <img src={img.sprites.front_default} alt='pokemon' />
                  <div>
                    <h5>{img.name}</h5>
                    <h6 className="type">{img.types[0].type.name}</h6>
                    {/* <button className="btn bg-success">Detalle del pokemon</button> */}
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
