import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../src/componentes/Header';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function Pokemon() {
    const [pokemons, setPokemons] = useState([]);
    const { id } = useParams();  // id é o nome do parâmetro definido na rota "/pokemon/:id"

    //fetch na api
    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                const pokemons_base = response.data;
                console.log(pokemons_base);

                const pokemonData = {
                        name: pokemons_base.name,
                        img: pokemons_base.sprites.front_default,
                        // type: pokemons_base.types.map(type => type.type.name).join(', '),
                        height: pokemons_base.height,
                        weight: pokemons_base.weight,
                        // color: species.color.name
                    };
                console.log(pokemonData)
                setPokemons(prevPokemons => [...prevPokemons, pokemonData]);
                

            } catch (error) {
                console.error('Error fetching Pokemons_base:', error);
            }
        }
        fetchPokemons();
        }, []);


    return (
        <>
        <Header></Header>
        <div>
            <h1>Pokemon Page</h1>
            <p>This is the Pokemon page where you can view details about a specific Pokemon.</p>
            <p>ESSA PAGINA VIRA MAIS INFORMAÇÔES SOBRE O POKEMON</p>
        </div>
        </>
    );
}