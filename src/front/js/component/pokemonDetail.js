import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pokemonDetail.css";

export const PokemonDetail = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null);
    const params = useParams();

    useEffect(() => {
        // Fetch data for the selected Pokémon using params.pokemonId
        fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemonData(data);
            })
            .catch((error) => {
                console.error('Error fetching Pokémon details:', error);
            });

        // Fetch data for the species information of the selected Pokémon
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.pokemonId}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemonSpeciesData(data);
            })
            .catch((error) => {
                console.error('Error fetching Pokémon species details:', error);
            });
    }, [params.pokemonId]);

    if (!pokemonData || !pokemonSpeciesData) {
        return <p>Loading...</p>;
    }

    const description = pokemonSpeciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
    ).flavor_text;

    return (
        <div className="detail-card">
            <div className="detail-name-id">
            <h2 className="id-detail">#{pokemonData.id}</h2>
            <h1 className="name-detail">{pokemonData.name}</h1>
            </div>
            <div className="center-img">
            <img className="img-detail" src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            </div>
            <h3 className="type-details">Type</h3>
            <ul className="type-pokedex">
                {pokemonData.types.map((type) => (
                    <li className="type-box" key={type.slot}>{type.type.name}</li>
                ))}
            </ul>
            <h3 className="type-details">Abilities</h3>
            <ul className="type-pokedex">
                {pokemonData.abilities.map((ability) => (
                    <li className="type-box" key={ability.slot}>{ability.ability.name}</li>
                ))}
            </ul>
            <div className="details-stats">
            <h3 className="type-box">Height: {pokemonData.height / 10}m</h3>
            <h3 className="type-box">Weight: {pokemonData.weight / 10}kg</h3>
            </div>
            <div className="description-details">
            <h3>Description: </h3>
            <p>{description}</p>
            </div>
          
          
              
            <h3 className="habitat-details">Habitat</h3>       
            <h3 className="habitat-box"> {pokemonSpeciesData.habitat.name}</h3>
            
           
           
        </div>
    );
};
