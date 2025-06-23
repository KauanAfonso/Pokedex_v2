import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from '../src/componentes/Card';
import styles from './Index.module.css';
import { Header } from '../src/componentes/Header';
import { See_More } from '../src/componentes/See_More';

export function Index() {
    //lidar com o estado para pokemons, limites e offset(Para buscar mais pokemons sem repetir)
    const [pokemons, setPokemons] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    //fetch na api
    async function fetchPokemons(limit = 10, offset = 0) {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const pokemons_base = response.data.results;
                console.log(pokemons_base);

                for (const pokemon of pokemons_base) {
                    const pokemonResponse = await axios.get(pokemon.url);
                    //pegando a url de species
                    const species = await axios.get(pokemonResponse.data.species.url);
                    // console.log(species.data);
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
        
        // useEffect(() => {
        //     fetchPokemons(limit, offset);
        // }, []);


    //funcao para ver mais pokemons
    function seeMorePokemons(){
        setOffset((li) => li+ limit);
        fetchPokemons(limit, offset)
    }
  
    //lidar com o filtro onde ele filtra com base no filtro
    function handle_filter(event){
        const value = event.target.value;
        const pokemonsFiltered = pokemons.filter((poke)=>poke.type.split(', ').includes(value)); //quebrando o tipo pois estaba vindo assim "tipo , tipo02"
        setPokemons(pokemonsFiltered);

        if(value == ''){
            fetchPokemons(10,0);
            return;
        }

        // Busca mais pokémons e filtra localmente após isso
        fetchPokemons(200, 0).then(() => {
            setPokemons(prev =>
            prev.filter(poke => poke.type.split(', ').includes(value))
            );
        });
    }

    return(
        <>
        <Header></Header>
        <main>
        <section>
            <h2>Filter</h2>
                <select name="pokemonType" id="pokemonType" onChange={handle_filter}>
                    <option value="">All Types</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="rock">Rock</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="steel">Steel</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                </select>
        </section>
            <section>
                <div className={styles.container_main}>
                    {pokemons.map((pokemon, index) => {
                    const textColor =
                        pokemon.color === "white" ? "gray" :
                        pokemon.color === "yellow" ? "black" :
                        pokemon.color;

                        return (
                            <Card
                                key={index}
                                name={pokemon.name}
                                img={pokemon.img}
                                type={pokemon.type}
                                height={pokemon.height}
                                weight={pokemon.weight}
                                color={textColor}
                            />
                        );
                    })}

                </div>

            </section>
            <section className={styles.section_btn}>
                <See_More handle_btn={seeMorePokemons}/>
            </section>
        </main>

        </>
    )
}