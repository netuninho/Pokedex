// Função para buscar pokémons da API

export async function fetchPokemons(offset, limit) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  const promises = data.results.map(async (pokemon) => {
    const pokeRes = await fetch(pokemon.url);
    const pokeData = await pokeRes.json();
    return {
      id: pokeData.id,
      name: pokeData.name,
      types: pokeData.types.map(t => t.type.name),
      image: pokeData.sprites.other['official-artwork'].front_default
    };
  });

  return { pokemons: await Promise.all(promises), total: data.count };
}
