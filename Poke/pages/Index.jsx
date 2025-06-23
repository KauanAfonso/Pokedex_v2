import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from '../src/componentes/Card';
import styles from './Index.module.css';

export function Index() {
    const [pokemons, setPokemons] = useState([]);
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
                    // console.log(pokemonResponse.data);
                    const pokemonData = {
                        name: pokemonResponse.data.name,
                        img: pokemonResponse.data.sprites.front_default,
                        type: pokemonResponse.data.types.map(type => type.type.name).join(', '),
                        height: pokemonResponse.data.height,
                        weight: pokemonResponse.data.weight,
                        color: species.data.color.name
                    };
                    setPokemons(prevPokemons => [...prevPokemons, pokemonData]);
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
                {pokemons.map((pokemon, index) => (
                    <Card
                        key={index}
                        name={pokemon.name}
                        img={pokemon.img}
                        type={pokemon.type}
                        height={pokemon.height}
                        weight={pokemon.weight}
                        color={pokemon.color}
                    />
                ))}
            </div>
        </main>
    )
}