// In script.js, reorder the code snippets in https://learn.sait.ca/d2l/le/content/688713/viewContent/16706483/View to get the page working like in video example in video-solution.mov file in this repo.


document.addEventListener('DOMContentLoaded', showDropdownAndDisplayResults);

function showDropdownAndDisplayResults() {
  // get the dropdown and card container
  const dropdown = document.getElementById('pokemon-categories');
  const cardsContainer = document.getElementById('pokemon-cards');

  // fetch and display dropdown list values
  fetchPokemonCategories()
    .then((categories) => populateDropdown(dropdown, categories))
    .catch((error) =>
      console.error('Error fetching Pokémon categories:', error)
    );

  // apply dropdown select value to results and display pokemon results
  dropdown.addEventListener('change', () => {
    // get dropdown value
    const category = dropdown.value;

    if (category) {
      // fetch pokemons based on dropdown category value
      fetchPokemonsByCategory(category)
        .then((pokemons) => displayPokemonCards(cardsContainer, pokemons))
        .catch((error) => console.error('Error fetching Pokémon:', error));
    } else {
      cardsContainer.innerHTML = '';
    }
  });
}

// fetch pokemon categories
async function fetchPokemonCategories() {
  const response = await fetch('https://pokeapi.co/api/v2/type');
  const data = await response.json();
  return data.results;
}

function populateDropdown(dropdown, categories) {
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    dropdown.appendChild(option);
  });
}

// fetch details of each category
async function fetchPokemonsByCategory(category) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${category}`);
  const data = await response.json();
  return data.pokemon.map((p) => p.pokemon);
}

function displayPokemonCards(container, pokemons) {
  container.innerHTML = '';
  pokemons.forEach((pokemon) => {
    // fetch pokemon detail
    fetchPokemonDetails(pokemon.url)
      .then((details) => {
        const card = createPokemonCard(details);
        container.appendChild(card);
      })
      .catch((error) =>
        console.error('Error fetching Pokémon details:', error)
      );
  });
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  const pokemonResults = await response.json();
  console.log(pokemonResults, url)
  return pokemonResults;
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = pokemon.sprites.front_default;
  img.alt = pokemon.name;

  const name = document.createElement('h3');
  name.textContent = pokemon.name;

  card.appendChild(img);
  card.appendChild(name);

  return card;
}

function multiply(one, two) {
  return one * two;
}

multiply(2, 3);
console.log(multiply(4, 5))

