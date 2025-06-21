import axios from 'axios';
import { useEffect } from 'react';

export function Index() {
    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
                const pokemons = response.data.results;
                console.log(pokemons);

                for (const pokemon of pokemons) {
                    const pokemonResponse = await axios.get(pokemon.url);
                    console.log(pokemonResponse.data);
                }

            } catch (error) {
                console.error('Error fetching Pokemons:', error);
            }        
        }

        fetchPokemons();
    }, []); 
  
    return(
        <h1>Hello world , Kauan</h1>
    )
}