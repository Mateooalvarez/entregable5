import { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import './style/PokeInfoPage.css'

const PokeInfoPage = () => {

   const { name } = useParams()

  const [ pokemon, getPokemon ]  = useFetch()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    getPokemon(url)
  }, [name])
  
 
  return (
    <div>
    <img className='poke__image' src="src/images/pokedex_origin.png" alt="" />
    <section className='pokemon__body'>
    <header className={`pokemons__header bg__${pokemon?.types[0].type.name}`}>
    <img className='pokemons__sprites' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </header>
        <section className='pokemons__infor'>
            <span className={`poke__name pokemons__number text__${pokemon?.types[0].type.name}`}>#{pokemon?.id}</span>
            <h2 className={`poke__name text__${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
        </section>
        <ul className='pokemon__ul'>
            <li>
                <div>peso</div> <div>{pokemon?.weight}</div>
            </li>
            <li>
                <div>altura</div> <div>{pokemon?.height}</div>
            </li>
        </ul>

        <section className='pokemons__skills'>
            <ul>
                <h4>Tipo</h4>
                {pokemon?.types.map(stack => (
                    <li className='pokemon__types' key={stack.type.url}>{stack.type.name}</li>
                ))}
            </ul>

            <ul>
                <h4>Habilidades</h4>
                {pokemon?.abilities.map(abilities=> (
                    <li key={abilities.ability.url}>{abilities.ability.name}</li>
                ))}

            </ul>
        </section>

    <section>
        <div className='pokemons__stats'>
        <h2>Stats</h2>
            {pokemon?.stats.map(stat=> (
                <div key={stat.stat.url}>
                <p>{stat.stat.name}:</p>
                <div className="pokemons__bar">
                    <div className="pokemons__fill" style={{ width: `${(stat.base_stat / 150) * 100}%` }}></div>
                </div>
                <p>{stat.base_stat}/150</p>
               </div>
            ))}
        </div>
    </section>
    </section>

    <footer className='pokemon__body'>
        <h2 className='pokemon__move'>Movements</h2>
        <ul className='poke__ul'>
        {pokemon?.moves.map(move=> (
            <li className='pokemon__movements' key={move.move.url}>{move.move.name}</li>
        ))}
        </ul>
    </footer>
</div>
)
}

export default PokeInfoPage