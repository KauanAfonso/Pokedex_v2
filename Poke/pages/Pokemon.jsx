import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../src/componentes/Header';
import { useParams } from 'react-router-dom';
import { ViewPokemon } from '../src/componentes/ViewPokemon';

export function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = response.data;
        const speciesRes = await axios.get(data.species.url); // <- busca a cor
        const pokemonData = {
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map(t => t.type.name),
          sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
            front_shiny: data.sprites.front_shiny,
            back_shiny: data.sprites.back_shiny,
          },
          stats:data.stats,
          abilities:data.abilities,
          color: speciesRes.data.color.name // <- salva a cor
        };

        setPokemon(pokemonData);
        console.log(pokemonData.abilities)
      } catch (error) {
        console.error('Error fetching pokemon:', error);
      }
    }
    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return (
      <>
        <Header />
        <div>Carregando...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <ViewPokemon pokemonData={pokemon} />
      </div>
    </>
  );
}
