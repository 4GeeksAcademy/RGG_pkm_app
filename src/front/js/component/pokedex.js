import React,{useState,useEffect, useSyncExternalStore, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import  "../../styles/demo.css";
import  "../../styles/pokedex.css"



export const Pokedex=()=>{
//     const [result, setResult] = React.useState([]);
//     const [poke, setPoke] = React.useState([]);
//     const [load, setLoad] = React.useState('true');
//     const arr = [];
//     useEffect(() => {
//      fetch('https://pokeapi.co/api/v2/pokemon/?limit=50')
//      .then((response) => response.json())
//      .then((data) => setResult(
//      data.results.map((item) => {
//      fetch(item.url)
//      .then((response) => response.json())
//      .then((allpokemon) => arr.push(allpokemon));
//      setPoke(arr);
//    }),
//    ));
//    }, []);
//    setTimeout(() => {
//    setLoad(false);
//    }, 1000);
 
   return(
   <div>
     <div className="pokedex-bg">
            <ul className="list-types">
               
                <li className="nav-item"><button className="btn btn-header" id="ver-todos">Ver todos</button></li>
                <li className="nav-item"><button className="btn btn-header normal" id="normal">Normal</button></li>
                <li className="nav-item"><button className="btn btn-header fire" id="fire">Fire</button></li>
                <li className="nav-item"><button className="btn btn-header water" id="water">Water</button></li>
                <li className="nav-item"><button className="btn btn-header grass" id="grass">Grass</button></li>
                <li className="nav-item"><button className="btn btn-header electric" id="electric">Electric</button></li>
                <li className="nav-item"><button className="btn btn-header ice" id="ice">Ice</button></li>
                <li className="nav-item"><button className="btn btn-header fighting" id="fighting">Fighting</button></li>
                <li className="nav-item"><button className="btn btn-header poison" id="poison">Poison</button></li>
                <li className="nav-item"><button className="btn btn-header ground" id="ground">Ground</button></li>
                <li className="nav-item"><button className="btn btn-header flying" id="flying">Flying</button></li>
                <li className="nav-item"><button className="btn btn-header physic" id="physic">Physic</button></li>
                <li className="nav-item"><button className="btn btn-header bug" id="bug">Bug</button></li>
                <li className="nav-item"><button className="btn btn-header rock" id="rock">Rock</button></li>
                <li className="nav-item"><button className="btn btn-header ghost" id="ghost">Ghost</button></li>
                <li className="nav-item"><button className="btn btn-header dark" id="dark">Dark</button></li>
                <li className="nav-item"><button className="btn btn-header dragon" id="dragon">Dragon</button></li>
                <li className="nav-item"><button className="btn btn-header steel" id="steel">Steel</button></li>
                <li className="nav-item"><button className="btn btn-header fairy" id="fairy">Fairy</button></li>

            </ul>
       <div className="todos">
        <div className="pokemon-todos" id="listaPokemon">
            <div className="pokemon">
                <p className="pokemon-id-back"></p>
                <div className="pokemon-imagen"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                 alt="Pikachu"></img>
                 <div className="pokemon-info">
                    <div className="nombre-contenedor">
                        <p className="pokemon-id">#025</p>
                        <h2 className="pokemon-nombre">Pikachu</h2>
                    </div>
                    <div className="d-flex f-column columna">
                    <div className="pokemon-tipos">
                        <p className="electric tipo">Electric</p>
                        <p className="fighting tipo">Fighting</p>
                        </div>
                        <div className="pokemon-stats">
                            <p className="stat">4m</p>
                            <p className="stat">60kg</p>
                        </div>
                        </div>

                 </div>
            </div>
      

       </div>
       <div className="pokemon">
                <p className="pokemon-id-back">#025</p>
                <div className="pokemon-imagen"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                 alt="Pikachu"></img>
                 <div className="pokemon-info">
                    <div className="nombre-contenedor">
                        <p className="pokemon-id">#025</p>
                        <h2 className="pokemon-nombre">Pikachu</h2>
                    </div>
                    <div className="d-flex f-column columna">
                    <div className="pokemon-tipos">
                        
                        <p className="electric tipo">Electric</p>
                        <p className="fighting tipo">Fighting</p>
                        </div>
                        <div className="pokemon-stats">
                            <p className="stat">4m</p>
                            <p className="stat">60kg</p>
                        </div>
                        </div>
                        

               
            </div>
        </div>

       </div>
       <div className="pokemon">
                <p className="pokemon-id-back">#025</p>
                <div className="pokemon-imagen"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                 alt="Pikachu"></img>
                 <div className="pokemon-info">
                    <div className="nombre-contenedor">
                        <p className="pokemon-id">#025</p>
                        <h2 className="pokemon-nombre">Pikachu</h2>
                    </div>
                    <div className="d-flex f-column columna">
                    <div className="pokemon-tipos">
                        <p className="electric tipo">Electric</p>
                        <p className="fighting tipo">Fighting</p>
                        </div>
                        <div className="pokemon-stats">
                            <p className="stat">4m</p>
                            <p className="stat">60kg</p>
                        </div>
                        </div>

                 </div>
            </div>
      

       </div>
       <div className="pokemon">
                <p className="pokemon-id-back">#025</p>
                <div className="pokemon-imagen"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                 alt="Pikachu"></img>
                 <div className="pokemon-info">
                    <div className="nombre-contenedor">
                        <p className="pokemon-id">#025</p>
                        <h2 className="pokemon-nombre">Pikachu</h2>
                    </div>
                    <div className="d-flex f-column columna">
                    <div className="pokemon-tipos">
                        
                        <p className="electric tipo">Electric</p>
                        <p className="fighting tipo">Fighting</p>
                        </div>
                        <div className="pokemon-stats">
                            <p className="stat">4m</p>
                            <p className="stat">60kg</p>
                        </div>
                        </div>
                        

               
            </div>
        </div>

       </div>
       </div></div>
       </div>

</div>
    )
}