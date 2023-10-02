const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDialogCard = document.getElementById('pokemonDialogCard')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number.toString().padStart(3,'0')}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
    </li>
  `
}

function convertPokemonToDialogCard(pokemon) {
  return `
    <div class="about">
      <div class="top">
        <button class="closeDialogCard" type="button" onclick="closePokemonDialogCard()">&#8592;</button>
        <span class="number">#${pokemon.number.toString().padStart(3,'0')}</span>
      </div>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
      <table class="aboutTable">
        <tr>
          <th class="tableHeader" colspan="2">${pokemon.name}</th>
        </tr>
        <tr>
          <th class="rowHeader">types</th>
          <td class="display">${pokemon.types.join(', ')}</td>
        </tr>
        <tr>
          <th class="rowHeader">height</th>
          <td class="display">${(pokemon.height/10)}m</td>
        </tr>
        <tr>
          <th class="rowHeader">weight</th>
          <td class="display">${pokemon.weight/10}kg</td>
        </tr>
        <tr>
          <th class="rowHeader">abilities</th>
          <td class="display">${pokemon.abilities.join(', ')}</td>
        </tr>
      </table>
    </div>
    
    <table class="baseStatsTable">
      <tr>
        <th  class="tableHeader" colspan="3">base stats</th>
      </tr>
      ${pokemon.baseStats.map(statItem => {
        return `
        <tr>
          <th class="rowHeader">${statItem.name}</th>
          <td class="value">${statItem.stat}</td>
          <td class="display"><meter value="${statItem.stat}" min="0" max="100">${statItem.stat}</meter></td>
        </tr>
        `
      }).join('')}
    </table>
  `
}

function showPokemonDialogCard(pokemonId) {
  pokeApi.getPokemon(pokemonId)
  .then((pokemon)=>{
    pokemonDialogCard.className = `pokemonDialogCard ${pokemon.type}`
    return convertPokemonToDialogCard(pokemon)
  })
  .then(pokemonDialog => pokemonDialogCard.innerHTML = pokemonDialog)
  .then(() => pokemonDialogCard.showModal())

}

function closePokemonDialogCard() { pokemonDialogCard.close() }

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('')
      pokemonList.innerHTML += newHtml
    })
    .then(() => {
      [...document.getElementsByClassName('pokemon')]
      .forEach(liElement => {
        liElement.addEventListener('click', () => showPokemonDialogCard(liElement.id))
      })
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})