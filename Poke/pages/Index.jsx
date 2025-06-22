import axios from 'axios';
import { useEffect } from 'react';
import { Card } from '../src/componentes/Card';
import styles from './Index.module.css';

export function Index() {
    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
                const pokemons_base = response.data.results;
                console.log(pokemons_base);

                for (const pokemon of pokemons_base) {
                    const pokemonResponse = await axios.get(pokemon.url);
                    //pegando a url de species
                    const species = await axios.get(pokemonResponse.data.species.url);
                    console.log(species.data);
                    console.log(pokemonResponse.data);
                }

            } catch (error) {
                console.error('Error fetching Pokemons_base:', error);
            }        
        }

        fetchPokemons();
    }, []); 
  
    return(
        <main>
            <div className={styles.container_main}>

            </div>
        </main>
    )
}