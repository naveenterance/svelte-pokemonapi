async function fetchPokemon({
	fetch
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
}) {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20000');
	if (!response.ok) {
		throw new Error('Failed to fetch Pokémon data');
	}
	const jsonData = await response.json();
	const itemsWithImages = jsonData.results.map(
		(pokemon: { name: string; url: string }, index: number) => {
			const id = index + 1;
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
		streamed: { pokemon: fetchPokemon({ fetch }) }
	};
};
