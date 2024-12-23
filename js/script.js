const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 448;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {

    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    searchPokemon = data.id;

    input.value = '';
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'not found T-T';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
     searchPokemon = Math.max(1, searchPokemon - 1); // Garante que não vá abaixo de 1
    renderPokemon(searchPokemon);
    
});
buttonNext.addEventListener('click', () => {
    searchPokemon = Math.min(898, searchPokemon + 1); // Garante que não vá acima de 898 (o número máximo de Pokémon na API)
    renderPokemon(searchPokemon);
    
});
renderPokemon(searchPokemon);

