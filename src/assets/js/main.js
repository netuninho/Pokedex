import '../scss/main.scss';
import { createPokemonCard } from './dom.js';
import { fetchPokemons } from './api.js';
import { renderPagination } from './pagination.js';

const container = document.getElementById('pokemon-list');
const paginationNumbers = document.getElementById('page-buttons');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentPage = 1;
const limit = 18;
let totalPokemons = 0;

async function renderPokemons(page = 1) {
  const offset = (page - 1) * limit;
  try {
    const { pokemons, total } = await fetchPokemons(offset, limit);
    totalPokemons = total;

    container.innerHTML = '';
    pokemons.forEach(pokemon => createPokemonCard(pokemon, container));

    renderPagination(currentPage, totalPokemons, limit, paginationNumbers, prevBtn, nextBtn, (page) => {
      currentPage = page;
      renderPokemons(page);
    });
  } catch (error) {
    console.error('Erro ao buscar pokémons:', error);
  }
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPokemons(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(totalPokemons / limit);
  if (currentPage < totalPages) {
    currentPage++;
    renderPokemons(currentPage);
  }
});

renderPokemons(currentPage);
