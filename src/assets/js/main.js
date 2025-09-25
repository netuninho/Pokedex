import '../scss/main.scss';
import { createPokemonCard } from './dom.js';
import { fetchPokemons } from './api.js';

const container = document.getElementById('pokemon-list');
let offset = 0;
const limit = 18;

async function renderPokemons() {
  try {
    const { pokemons } = await fetchPokemons(offset, limit);
    pokemons.forEach(pokemon => createPokemonCard(pokemon, container));
  } catch (error) {
    console.error('Erro ao buscar pokémons:', error);
  }
}

renderPokemons();
