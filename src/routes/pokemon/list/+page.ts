async function fetchPokemon({
	fetch,
	limit,
	offset = 0
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
	limit: number;
	offset?: number;
}) {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
	);
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

export const load = async ({ fetch, url }) => {
	const limitParam = url.searchParams.get('limit');
	const limit = limitParam ? parseInt(limitParam, 10) : 20;

	return {
		limit,
		pokemon: await fetchPokemon({ fetch, limit })
	};
};
