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
	return {
		items: jsonData.results
	};
}

export const load: PageLoad = async ({ fetch }) => {
	return {
		streamed: { pokemon: fetchPokemon({ fetch }) }
	};
};
