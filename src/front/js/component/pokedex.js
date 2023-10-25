import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/pokedex.css";
import { Context } from "../store/appContext";

export const Pokedex = () => {
  
  const [result, setResult] = useState([]);
  const [poke, setPoke] = useState([]);
  const [load, setLoad] = useState(true);
  const [buscar, setBuscar] = useState([]);
  const [tablaPokemon, setTablaPokemon] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const { store, actions } = useContext(Context);
  

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
  
  const handleFavoritoClick = (img) => {
    let fav = actions.getAuthentication();
    console.log(fav);
  
    if (fav === true) {    
      // El usuario está autenticado, puedes agregar el Pokémon a favoritos
      actions.setFavourite(img);
    } else {
      // El usuario no está autenticado, muestra un mensaje de error o redirígelo al inicio de sesión
      alert("Debes iniciar sesión para agregar a favoritos.");
      // O puedes redirigir al usuario a la página de inicio de sesión
      // navigate("/login");
    }
  };
  
  
  

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
                      {store.isAuthenticated ? (
                        <button className="btn button-favourites" onClick={() => handleFavoritoClick(img)}>Agregar a favoritos</button>
                      ) : (
                        <p>Debes iniciar sesión para agregar a favoritos</p>
                      )}
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
                      {store.auth ? (
                        <button className="btn button-favourites" onClick={() => handleFavoritoClick(img)}>Agregar a favoritos</button>
                      ) : (
                        <p>Debes iniciar sesión para agregar a favoritos</p>
                      )}
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
