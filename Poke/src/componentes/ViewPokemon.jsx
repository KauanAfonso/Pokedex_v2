import React from 'react';
import styles from './ViewPokemon.module.css';

export function ViewPokemon({ pokemonData }){
    const bgColor = pokemonData.color;
    const textColor = bgColor === 'white' ? 'gray' :
                    bgColor === 'yellow' ? 'black' : 'white';

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: bgColor, color: textColor }}
    >

      <h2 className={styles.name}>{pokemonData.name}</h2>

      <div className={styles.sprites}>
        <img src={pokemonData.sprites.front_default} alt="front default" />
        <img src={pokemonData.sprites.back_default} alt="back default" />
        <img src={pokemonData.sprites.front_shiny} alt="front shiny" />
        <img src={pokemonData.sprites.back_shiny} alt="back shiny" />
      </div>

      <div className={styles.info}>
        <p><strong>Height:</strong> {pokemonData.height}</p>
        <p><strong>Weight:</strong> {pokemonData.weight}</p>
        <p><strong>Type(s):</strong> {pokemonData.types.join(', ')}</p>
      </div>

      <div className={styles.stats}>
        <h3>Stats</h3>
        <table>
          <thead>
            <tr>
              <th>Stat</th>
              <th>Base Value</th>
            </tr>
          </thead>
          <tbody>
            {pokemonData.stats.map((statObj, idx) => (
              <tr key={idx}>
                <td>{statObj.stat.name}</td>
                <td>{statObj.base_stat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.abilities}>
        <h3>Abilities</h3>
        <ul>
          {pokemonData.abilities.map((a, idx) => (
            <li key={idx}>{a.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
