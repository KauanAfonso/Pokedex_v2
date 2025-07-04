    import axios from 'axios';
    import { useEffect, useState } from 'react';
    import { Card } from '../src/componentes/Card';
    import styles from './Index.module.css';
    import { Header } from '../src/componentes/Header';
    import { See_More } from '../src/componentes/See_More';
    import { useNavigate } from 'react-router-dom';

    export function Index() {
        //lidar com o estado para pokemons, limites e offset(Para buscar mais pokemons sem repetir)
        const [allPokemons, setAllPokemons] = useState([]);
        const [filteredPokemons, setFilteredPokemons] = useState([]);
        const [limit, setLimit] = useState(10);
        const [offset, setOffset] = useState(0);
        const [filterType, setFilterType] = useState('');
        const [filterName, setFilterName] = useState('');
        const navigate = useNavigate();
        const newPokemons = [];

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
                            id: pokemonResponse.data.id,
                            name: pokemonResponse.data.name,
                            img: pokemonResponse.data.sprites.front_default,
                            type: pokemonResponse.data.types.map(type => type.type.name).join(', '),
                            height: pokemonResponse.data.height,
                            weight: pokemonResponse.data.weight,
                            color: species.data.color.name
                        };

                        newPokemons.push(pokemonData);
                        // Agora, atualiza o estado incluindo só pokémons novos
                        setAllPokemons(prev => {
                        // Evita duplicados pelo id
                        const allIds = new Set(prev.map(p => p.id));
                        const filteredNew = newPokemons.filter(p => !allIds.has(p.id));
                        return [...prev, ...filteredNew];
                        });

                        setOffset(prev => prev + limit);
                    }

                } catch (error) {
                    console.error('Error fetching Pokemons_base:', error);
                }
            }

            useEffect(()=>{
                fetchPokemons(15, 0)
            }, [])

            useEffect(() => {
                let filtered = allPokemons;

                if (filterType) {
                setFilterName("")
                filtered = filtered.filter(pokemon =>
                    pokemon.type.split(', ').includes(filterType)
                );
                }

                if (filterName) {
                setFilterType("")
                filtered = filtered.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(filterName.toLowerCase())
                );
                }

                setFilteredPokemons(filtered);
        }, [filterType, filterName, allPokemons, limit]);

        //funcao para ver mais pokemons
        function seeMorePokemons(){
            fetchPokemons(limit, offset)
        }
    
        //lidar com o filtro onde ele filtra com base no filtro
        function handle_filter(event){
            fetchPokemons(890, 0)
            setFilterType(event.target.value);
        }


        function handleFilterName(event){
            setLimit((a) => a=890)
            fetchPokemons(890, 0)
            console.log(allPokemons)
            event.preventDefault(); 
            const input = event.target.querySelector('input').value.toLowerCase();
            setFilterName(input);
        }

        return(
            <>
            <Header></Header>
            <main>
            <section className={styles.FilterSection}>
                <h2>Filters</h2>
                <div>
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

                    <form action="" onSubmit={handleFilterName}>
                        <label htmlFor="">Filter by name</label>
                        <input type="text" name="" id="" />
                        <button type="submit">Filter</button>
                    </form>

                </div>
            </section>
                <section>
                    <div className={styles.container_main}>
                        {filteredPokemons.map((pokemon, index) => {
                        const textColor =
                            pokemon.color === "white" ? "gray" :
                            pokemon.color === "yellow" ? "black" :
                            pokemon.color;

                            return (
                                <Card 
                                    onClick={() => navigate(`/pokemon/${pokemon.id}`)}
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