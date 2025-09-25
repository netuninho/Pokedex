import { createPokemonCard } from './dom.js';
import { renderPagination } from './pagination.js';
import { typeMapPt, normalizeString } from './types.js';

let searchResults = [];
let isSearching = false;

export function renderSearchResults(container, paginationNumbers, prevBtn, nextBtn, currentPage, limit, handlePageChange) {
  container.innerHTML = '';

  if (searchResults.length === 0) {
    container.innerHTML = `<p class="no-results">Nenhum Pokémon encontrado</p>`;
    paginationNumbers.innerHTML = '';
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const pagePokemons = searchResults.slice(start, end);

  pagePokemons.forEach(p => createPokemonCard(p, container));
  renderPagination(currentPage, searchResults.length, limit, paginationNumbers, prevBtn, nextBtn, handlePageChange);
}

export async function searchPokemon(query, container, paginationNumbers, prevBtn, nextBtn, currentPage, limit, handlePageChange) {
  query = query.toLowerCase();
  isSearching = true;
  searchResults = [];
  currentPage = 1;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (res.ok) {
      const pokeData = await res.json();
      searchResults.push({
        id: pokeData.id,
        name: pokeData.name,
        types: pokeData.types.map(t => t.type.name),
        image: pokeData.sprites.other['official-artwork'].front_default
      });

      renderSearchResults(container, paginationNumbers, prevBtn, nextBtn, currentPage, limit, handlePageChange);
      return;
    }
  } catch (e) { }

  const typeEn = Object.keys(typeMapPt).find(
    key => key === query || normalizeString(typeMapPt[key]) === normalizeString(query)
  );

  if (typeEn) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${typeEn}`);
    const data = await res.json();

    for (let p of data.pokemon) {
      const pokeRes = await fetch(p.pokemon.url);
      const pokeData = await pokeRes.json();

      const firstTypePt = typeMapPt[pokeData.types[0].type.name] || pokeData.types[0].type.name;
      if (normalizeString(firstTypePt) === normalizeString(query)) {
        searchResults.push({
          id: pokeData.id,
          name: pokeData.name,
          types: pokeData.types.map(t => t.type.name),
          image: pokeData.sprites.other['official-artwork'].front_default
        });
      }
    }
  }

  renderSearchResults(container, paginationNumbers, prevBtn, nextBtn, currentPage, limit, handlePageChange);
}

export function getIsSearching() {
  return isSearching;
}

export function resetSearch() {
  searchResults = [];
  isSearching = false;
}
