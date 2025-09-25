import '../scss/main.scss';
import { createPokemonCard } from './dom.js';
import { fetchPokemons } from './api.js';
import { renderPagination } from './pagination.js';
import { searchPokemon, renderSearchResults, resetSearch, getIsSearching, getSearchResults } from './search.js';

// Elementos DOM
const container = document.getElementById('pokemon-list');
const paginationNumbers = document.getElementById('page-buttons');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const homeLink = document.getElementById('home');

// Elemento de carregamento
const loading = document.createElement('p');
loading.classList.add('--loading');
loading.textContent = 'Carregando';
loading.style.display = 'none';
container.parentNode.insertBefore(loading, container);

// Estado da aplicação
let currentPage = 1;
const limit = 18;
let totalPokemons = 0;

// Função para renderizar pokémons
async function renderPokemons(page = 1) {
  const offset = (page - 1) * limit;
  loading.style.display = 'block';
  try {
    const { pokemons, total } = await fetchPokemons(offset, limit);
    totalPokemons = total;
    container.innerHTML = '';
    pokemons.forEach(pokemon => createPokemonCard(pokemon, container));
    loading.style.display = 'none';
    renderPagination(currentPage, totalPokemons, limit, paginationNumbers, prevBtn, nextBtn, (page) => {
      currentPage = page;
      renderPokemons(page);
    });
  } catch (error) {
    loading.style.display = 'none';
    console.error('Erro ao buscar pokémons:', error);
  }
}

// Função para lidar com a mudança de página na busca
function handleSearchPageChange(page) {
  currentPage = page;
  const results = getSearchResults();
  renderSearchResults(container, paginationNumbers, prevBtn, nextBtn, currentPage, limit, handleSearchPageChange, results);
}

// Busca de pokémons
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    loading.style.display = 'block';
    searchPokemon(query, container, paginationNumbers, prevBtn, nextBtn, currentPage, limit, handleSearchPageChange)
      .finally(() => loading.style.display = 'none');
  } else {
    resetSearch();
    currentPage = 1;
    renderPokemons(currentPage);
  }
});

// Permitir busca ao pressionar Enter
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchBtn.click();
  }
});

// Navegação de página - anterior
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    if (getIsSearching()) {
      handleSearchPageChange(currentPage);
    } else {
      renderPokemons(currentPage);
    }
  }
});

// Navegação de página - próxima
nextBtn.addEventListener('click', () => {
  const totalPages = getIsSearching()
    ? Math.ceil(getSearchResults().length / limit)
    : Math.ceil(totalPokemons / limit);
  if (currentPage < totalPages) {
    currentPage++;
    if (getIsSearching()) {
      handleSearchPageChange(currentPage);
    } else {
      renderPokemons(currentPage);
    }
  }
});

// Link para a página inicial
homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  searchInput.value = '';
  resetSearch();
  currentPage = 1;
  renderPokemons(currentPage);
});

// Renderização inicial
renderPokemons(currentPage);
