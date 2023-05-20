import axios from "axios";
import React, { useState, useEffect } from "react";

import './styles.css';



export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [picture, setPicture] = useState("[]");

  const getPokemons = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0" 
      );
      
      setPokemons(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getPokePicture = async (event) => {
    console.log(event.target.value);
    try {
      const url = event.target.value;
      const response = await axios.get(`${url}`);
      setPicture(response.data.sprites.front_default);
    } catch (err) {
      console.log(err);
    }
  };

  const pokeList = pokemons.map((poke) => {
    return (
      <option key={poke.name} value={poke.url}>
        {poke.name}
      </option>
    );
  });

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="App">
      <h1>Pokemons</h1>
      <select onChange={getPokePicture}>
        <option>Selecione um pokemon</option>
        {pokeList}
      </select>
      {picture && <img src={picture} alt="foto do pokemon" />}
    </div>
  );
}
  



