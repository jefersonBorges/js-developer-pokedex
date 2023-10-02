
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  //list
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  //end list

  //card
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  pokemon.abilities = pokeDetail.abilities.map(abilityItem => abilityItem.ability.name);
  pokemon.baseStats = pokeDetail.stats.map((statsItem) => {
    return {
      name : statsItem.stat.name,
      stat : statsItem.base_stat,
    }
  });
  //end card

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (pokemonId = '') => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
  return fetch(url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon)
}