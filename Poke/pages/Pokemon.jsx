import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../src/componentes/Header';
import { useParams } from 'react-router-dom';

export function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = response.data;

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
          }
        };

        setPokemon(pokemonData);
        console.log(data)
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
        <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
          <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
          <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} front shiny`} />
          <img src={pokemon.sprites.back_shiny} alt={`${pokemon.name} back shiny`} />
        </div>

        <p><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
      </div>
    </>
  );
}
