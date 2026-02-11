
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonDetails from "../../hooks/usePokemonDetails";
import Pokemon from "../Pokemon/Pokemon";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useState } from "react";

function PokemonDetail({pokemonName}){
    const {id} = useParams();
    const [pokemon,pokedexListState,err,loading] = usePokemonDetails(id,pokemonName);

    
    if(err){
        return(
            <ErrorPage/>
        )
    }

    const getRandomPokemons = (pokedexList) => {
        if (!pokedexList || pokedexList.length === 0) return [];
        let shuffled = [...pokedexList].sort(() => 0.8 - Math.random()); // Shuffle array
        return shuffled.slice(0, Math.min(8, shuffled.length)); // Take 8 or less
    };


    const randomPokemonLists = loading 
    ? [] 
    : getRandomPokemons(pokedexListState?.pokedexList);

    return(

        <div className="detail-wrapper">
            <div className="pokemon-detail-wrapper">
                <img className="pokemon-detail-image" src={pokemon.image}/>
                <div className="pokemon-detail-name"><span>{pokemon.name}</span> </div>
                <div className="pokemon-detail-height">Height : {pokemon.height}</div>
                <div className="pokemon-detail-weight">Weight : {pokemon.weight}</div>
                <div className="pokemon-detail-type">
                    {pokemon.types.map((t)=> <div key={t}>{t}</div>)}            
                </div>
            </div>
            <div className="similar-pokemon-detail-wrapper">
                <div className="similar-pokemon-heading">
                    {pokemon.types.length > 0 && 
                        `Some More ${pokemon.types[0]} Type Pokemons`}
                </div>

                {loading ? (
                    <div className="similar-pokemon-heading">Loading...</div>
                ) : (
                    <div className="similar-pokemon-details">
                        {randomPokemonLists.map((pokedex) => (
                            <Pokemon
                                key={pokedex.id}
                                id={pokedex.id}
                                name={pokedex.name}
                                image={pokedex.image}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
        
        
    )
}

export default PokemonDetail;