import { useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import { useEffect, useRef, useState } from 'react'
import PokedexCard from '../components/PokedexPage/PokedexCard'
import SelectType from '../components/PokedexPage/SelectType'
import './style/PokedexPage.css'

const PokedexPage = () => {

  const [searchedName, setSearchedName] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')

const trainer = useSelector(states => states.trainer)

const [pokemons, getPokemons, getTypePokemon ] = useFetch()

useEffect(() => {
  if (typeSelected === 'allPokemons') {
    //hacemos la peticion de todos los pokemones
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
 getPokemons(url) 
} else{
  //peticion de los pokemones por tipo
  getTypePokemon(typeSelected)
}
}, [typeSelected])

const inputName = useRef()

const handleSearch = e => {
e.preventDefault()
setSearchedName(inputName.current.value.trim().toLowerCase())
}

const callbackFilter = poke => {
 const filterName = poke.name.includes(searchedName)
 return filterName
}

  return (
    <div>
        <img className='poke__image' src="src/images/pokedex_origin.png" alt="" />
        <span className='poke__user'>Welcome {trainer} </span><span>here you find your favorite pokemon</span>
        <form className='poke__form' onSubmit={handleSearch}>
          <article className='poke__article'>
          <input ref={inputName} type="text" />
          <button className='poke__btn'>Search</button>
          </article>
        </form>
        <SelectType
        setTypeSelected={setTypeSelected}
        />
        <div className='poke__pokemons'>
            {
              pokemons && pokemons.results.filter(callbackFilter).length === 0 
              ? <h2 className='poke__h2'>There are no pokemons that meet the filters</h2>
              : (
              pokemons?.results.filter(callbackFilter).map(poke => (
                <PokedexCard 
                key={poke.url}
                poke={poke}
                />
                ))
              )
            }
        </div>
    </div>
  )
}

export default PokedexPage
