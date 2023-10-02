# Trilha JS Developer - Pokedex

Atividade proposta no módulo **primeiras páginas interativas com JavaScript**, presente no **Bootcamp Santander + DIO: Formação Full Stack com Java e Angular.**

---

## Sumário

- [Visão geral](#visão-geral)
  - [Desafio](#desafio)
  - [Screenshots](#screenshots)
    - [Mobile](#mobile)
    - [Desktop](#desktop)
    - [Active states](#active-states)
  - [Links](#links)
- [Pré-requisitos](#pré-requisitos)
- [Instruções de uso](#instruções-de-uso)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Dependências](#dependências)
- [Meu processo](#meu-processo)
  - [Construído com](#construído-com)
  - [O que Aprendi](#o-que-aprendi)
  - [Recursos úteis](#recursos-úteis)
- [Autor](#autor)

## Visão geral

Esta aplicação permite aos usuários visualizar uma lista de Pokémon, clicar em Pokémons individuais para ver mais detalhes em uma caixa de diálogo modal e carregar mais Pokémon conforme eles clicam em 'load more'.

### Desafio

O desafio consiste em implementar uma página que exiba uma listagem de pokemons, consumindo dados de uma API externa. Ao clicar em um pokemon da lista, deverá ser exibido as informações detalhadas a respeito deste pokemon.

Recursos disponíveis ao usuário:

- Visualizar a listagem de pokemons em dispositivos móveis
- Carregar pokemons com o botão "load more"
- Visualizar card com as informações detalhadas do pokemon ao clicar sobre o mesmo

### Screenshots

#### Mobile

![Medium Mobile Screenshot](./assets/screenshots/mobile-m-screenshot.jpeg)

#### Desktop

![Desktop Screenshot](./assets/screenshots/desktop-screenshot.jpeg)

#### Active states

![Desktop Screenshot active states](./assets/screenshots/active-states.gif)

### Links

- Solution URL: [Github repository](https://github.com/jefersonBorges/js-developer-pokedex)
- Live Site URL: [Github live page](https://jefersonborges.github.io/js-developer-pokedex/)

## Pré-requisitos

- Navegador web moderno

## Instruções de uso

1. Clone este repositório
2. Abra o arquivo 'index.html' em um navegador da web

## Estrutura do projeto

- '/assets': contém arquivos de recursos como CSS, JavaScript e Imagens
- '/js': contém os arquivos JavaScript do projeto
- '/css': contém os estilos css do projeto
- '/screnshots': capturas de tela da aplicação

## Dependências

- [Normalize CSS](https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css)
- [Roboto Font](https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap)

## Meu processo

### Construído com

- CSS
  - Mobile-first
  - Flexbox
  - Grid
  - Variáveis
- JavaScript
  - DOM
  - Async
  - ES6 Features
  - Destructuring assignment

### O que Aprendi

Integrar um código à um projeto já existente é bem desafiador, devemos estar atentos ao formato das funções e declarações de variáveis.

Utilizar o método de `Promise.all()` nativo do Javascript facilita a construção de elementos HTML oriundos de uma API de forma recursiva.

```javascript

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  /* Neste ponto, estamos buscando a página principal da API */
  return fetch(url)
    .then((response) => response.json()) 
    .then((jsonBody) => jsonBody.results)
    /*Em seguida, com a página princiapl da API já carreagada, buscamos os detalhes da cada pokemon */
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    /* O método nativo Promise.all()  transforma todas as promises em uma só, retornando somente quando todas as promises forem cumpridas */ 
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    /*O retorno é uma lista contendo todos os pokemons, que em seguida será transformada em HTML*/
}
```

Outro recurso interessante, nativo do JavaScript, é `String.padStart(length, pad)`, demonstrado abaixo para fixarmos o tamanho do número, acrescentando zeros à sua frente.

```javascript
/* Utilizamos esta função para transformar os dados vindos da API em String */
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

```

Em css, declarar variáveis foi útil para criar as cartas responsivas de acordo com a cor principal do pokemon.

```css
/* Declarando a variável '--color' para cada uma das classes...*/

.normal {
  --color: #a6a877;
}

.grass {
  --color: #77c850;
}

/* Abaixo, com a combinação da variável declarada e atribuída em conjunto com a classe 'pokemon', podemos estilizar dinamicamente cada elemento da lista */

.pokemon {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1rem;
  background: linear-gradient(to top right, var(--color) 0%, #000 100%);
  box-shadow: 5px -5px 15px #000, -1px 1px 3px var(--color);
  transition: transform 100ms ease-in-out;
}

```

Um elemento HTMl interessante é o `<dialog></dialog>`. Com ele podemos criar um modal de conteúdo, com recursos incorporados do componente. Neste exemplo foi utilizado para gerar o card de detalhes do pokemon.

```html
<dialog id="pokemonDialogCard" class="pokemonDialogCard">
  <!-- Conteúdo do modal aqui -->
  </dialog>
```

Um exemplo de recursos incroporados são as funções JavaScript `element.showModal()` e `element.close()` utilizadas para exibir e fechar, respectivamente o elemento `<dialog></dialog>`.

```javascript

  function showPokemonDialogCard(pokemonId) {
  pokeApi.getPokemon(pokemonId)
  .then((pokemon)=>{
    pokemonDialogCard.className = `pokemonDialogCard ${pokemon.type}`
    return convertPokemonToDialogCard(pokemon)
  })
  .then(pokemonDialog => pokemonDialogCard.innerHTML = pokemonDialog)
  /* Após gerar o conteúdo do modal, a função showModal() o exibe em tela */
  .then(() => pokemonDialogCard.showModal())

}

/* Ao executar a função fecha o modal */
function closePokemonDialogCard() { pokemonDialogCard.close() }

```

### Recursos úteis

- [JavaScript Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

- [JavaScript String.padStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

- [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

- [The Dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

## Autor

- GitHub - [jefersonBorges](https://github.com/jefersonBorges/jefersonBorges)
- Frontend Mentor - [@jefersonBorges](https://www.frontendmentor.io/profile/jefersonBorges)
- Linkedin - [Jeferson Borges Linkedin](https://www.linkedin.com/in/jeferson-borges-543b34229)
- DIO profile - [DIO profile](https://www.dio.me/users/borges_jeferson)

---
