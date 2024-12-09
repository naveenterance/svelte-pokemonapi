// import type { PageLoad } from './$types';

// export const load: PageLoad = async ({ fetch, params }) => {
// 	try {
// 		const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20000');
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch Pokémon data');
// 		}
// 		const jsonData = await response.json();
// 		return {
// 			items: jsonData.results
// 		};
// 	} catch (error) {
// 		console.error(error);
// 		return {
// 			items: [],
// 			error: error.message
// 		};
// 	}
// };

// src/routes/+page.ts
import type { PageLoad } from './$types';

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

	const itemsWithImages = await Promise.all(
		jsonData.results.map(async (pokemon: { name: string; url: string }) => {
			const pokemonResponse = await fetch(pokemon.url);
			if (!pokemonResponse.ok) {
				throw new Error(`Failed to fetch Pokémon details for ${pokemon.name}`);
			}
			const pokemonData = await pokemonResponse.json();
			return {
				name: pokemon.name,
				image: pokemonData.sprites.front_default
			};
		})
	);

	return {
		items: itemsWithImages
	};
}

export const load: PageLoad = async ({ fetch }) => {
	return {
		streamed: { pokemon: fetchPokemon({ fetch }) }
	};
};
