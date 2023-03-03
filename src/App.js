import React from 'react';
import Teste from './teste';

function App() {
  const [pokemon, setPokemon] = React.useState({});
  const [id, setId] = React.useState(1);

  function Carregar(id){
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setPokemon(data);
    });
  }

  function Proximo() {
      Carregar(id);
      setId(id + 1);
  }

  function Anterior() {
    if (id > 1) {
      setId(id - 1);
      Carregar(id);
    }
  }

  function converterAlturaParaMetro(decimetro) {
    return decimetro / 10;
  }

  function converterPesoParaQuilo(hectograma) {
    return hectograma / 10;
  }

  function mostrarDetalhes(){
    return pokemon.abilities.map(data => <Teste text={data.ability.name} />)
  }

  return (
    pokemon.sprites ?
      <div>
        <img src={pokemon.sprites.front_default} alt=""/>
        <h1>{pokemon.name}</h1>
        <h2>Número na Pokedex: {id}</h2>
        <h3>Informações Gerais</h3>
        <p>Tipos: {pokemon.types.map(data => data.type.name + " ")}</p>
        <p>Altura: {converterAlturaParaMetro(pokemon.height)}m</p>
        <p>Peso: {converterPesoParaQuilo(pokemon.weight)}kg</p>
        <h3>Habilidades</h3>
        <p>{mostrarDetalhes()}</p>
        <button onClick={Anterior}>Previous</button>
        <button onClick={Proximo}>Next</button>
      </div>
    :
      <div>
        <button onClick={Carregar(1)}>Carregar</button>
      </div>
    );
    
}

export default App;