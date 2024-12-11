async function fetchPokemon({
	fetch,
	limit,
	offset
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
	limit: number;
	offset: number;
}) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

	if (!response.ok) {
		throw new Error('Failed to fetch Pokémon data');
	}
	const jsonData = await response.json();
	const itemsWithImages = jsonData.results.map(
		(pokemon: { name: string; url: string }, index: number) => {
			const id = offset + index + 1;
			const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
			return {
				...pokemon,
				image
			};
		}
	);
	return {
		items: itemsWithImages
	};
}

export const load = async ({ fetch }) => {
	return {
		pokemon: await fetchPokemon({ fetch, limit: 20, offset: 0 }),
		streamed: { pokemon: fetchPokemon({ fetch, limit: 20000, offset: 20 }) }
	};
};
