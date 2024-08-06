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

const mealdb = {
  meals: [
    {
      idMeal: 52772,
      strMeal: 'Teriyaki Chicken Casserole',
      strDrinkAlternate: null,
      strCategory: 'Chicken',
      strArea: 'Japanese',
      moreDetails: { isSpicy: true, avgPrice: 40 },
      strInstructions:
        'Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
      strTags: 'Meat,Casserole',
      strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
      strIngredient1: 'soy sauce',
      strIngredient2: 'water',
      strIngredient3: 'brown sugar',
      strIngredient4: 'ground ginger',
      strIngredient5: 'minced garlic',
      strIngredient6: 'cornstarch',
      strIngredient7: 'chicken breasts',
      strIngredient8: 'stir-fry vegetables',
      strIngredient9: 'brown rice',
      strMeasure1: '3/4 cup',
      strMeasure2: '1/2 cup',
      strMeasure3: '1/4 cup',
      strMeasure4: '1/2 teaspoon',
      strMeasure5: '1/2 teaspoon',
      strMeasure6: '4 Tablespoons',
      strMeasure7: '2',
      strMeasure8: '1 (12 oz.)',
      strMeasure9: '3 cups',
      isSpicy: true,
      strCreativeCommonsConfirmed: null,
      dateModified: '2023-03-25T23:15:30.000Z',
    },
  ],
};

// String: mealdb.meals[0].strMeal
console.log(mealdb.meals[0].strMeal);

// Number:
console.log(mealdb.meals[0].moreDetails.avgPrice);

// Boolean:
console.log(mealdb.meals[0].moreDetails.isSpicy);

// Null:
console.log(mealdb.meals[0].strCreativeCommonsConfirmed);

// Object:
console.log(mealdb.meals[0]);

// Array:
console.log(mealdb.meals);

// Date:
console.log(new Date(mealdb.meals[0].dateModified));

// _____: Function to be called when DOM content is loaded.
// populateDropdown: Function to populate the dropdown with categories.
// displayPokemonCards: Function to display the Pokémon cards.
// 'https://pokeapi.co/api/v2/type': URL to fetch Pokémon categories.
// ${category}: Template literal to insert the selected category.
// 'card': Class name for the Pokémon card element.

/**
 * Option 2 Enhanced
 */

/**
 * Fetch details of all 150 pokemon.
 */
// async function fetch150PokemonDetails() {
//   const detailsList = [];
//   for (let i = 1; i <= 150; i++) {
//     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     const data = await fetchPokemonDetails(url);
//     if (data) {
//       detailsList.push(data);
//     }
//   }

//   return detailsList;
// }

// async function renderOption2Enhanced() {
//   const data = await fetch150PokemonDetails();
//   const cards = createCardElements(
//     data.map((item) => ({
//       title: item.name,
//       image: item.sprites.other['official-artwork'].front_default,
//       subtitle: item.types.map((type) => type.type.name).join(', '),
//     }))
//   );
//   document.getElementById('option-2-enhanced-results').innerHTML = cards;
// }

// renderOption2Enhanced();

/**
 * Option 2 Enhanced: Search bar function.
 */
// function searchbarEventHandler() {
//   //Get the value of the input field with id="searchbar"
//   let input = document.getElementById('searchbar').value;
//   input = input.toLowerCase();
//   //Get all the cards
//   const enhancedResults = document.getElementById('option-2-enhanced-results');
//   const card = enhancedResults.getElementsByClassName('card');

//   for (i = 0; i < card.length; i++) {
//     //If the value of the input field is not equal to the name of the pokemon, hide the card
//     if (!card[i].innerHTML.toLowerCase().includes(input)) {
//       card[i].style.display = 'none';
//       //If the value of the input field is equal to the name of the pokemon, show the card
//     } else {
//       card[i].style.display = 'block';
//     }
//   }
// }

// const searchbar = document.getElementById('searchbar');
// searchbar.addEventListener('keyup', searchbarEventHandler);
