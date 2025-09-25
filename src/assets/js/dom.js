import { typeMapPt } from './types.js';

// Função para criar o card de um pokémon
export function createPokemonCard(pokemon, container) {
  const card = document.createElement('div');
  card.classList.add('pokemon__card');

  const mainType = pokemon.types[0];
  const translatedTypes = pokemon.types.map(t => typeMapPt[t] || t).join(',');
  const mainTranslatedType = translatedTypes.split(',')[0];

  card.innerHTML = `
    <div class="pokemon__card-header">
      <p class="pokemon__type pokemon__type--${mainType}">
        ${mainTranslatedType}
      </p>
      <p class="pokemon__number">#${pokemon.id}</p>
    </div>
    <img class="pokemon__image" src="${pokemon.image}" alt="${pokemon.name}">
    <h2 class="pokemon__name">${pokemon.name}</h2>
  `;
  container.appendChild(card);
}
