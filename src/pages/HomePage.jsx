import React, { useRef } from 'react'
import { setTrainer } from '../store/slices/trainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './style/HomePage.css'

const HomePage = () => {

const inputTrainer = useRef()

const dispatch = useDispatch()

const navigate = useNavigate()

const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainer(inputTrainer.current.value.trim()))
    navigate('/pokedex')
}

  return (
    <div>
        <img className='poke_img' src="src/images/pokedex_origin.png" alt="" />
        <h1 className='poke_text poke_welcome'>Hi trainer</h1>
        <h3 className='poke_text'>If you want you favorite pokemon, please give me your trainer name</h3>
        <form className='poke_form' onSubmit={handleSubmit}>
        <input ref={inputTrainer} type="text" />
        <button className='poke_btn'>Catch them all</button>
        <footer className='poke_footer'></footer>
    </form>
    </div>
  )
}

export default HomePage