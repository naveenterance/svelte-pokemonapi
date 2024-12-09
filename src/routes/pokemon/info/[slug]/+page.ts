import type { PageLoad } from './$types';

async function fetchPokemon({
	fetch,
	slug
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
	slug: string;
}) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
	if (!response.ok) {
		throw new Error('Failed to fetch Pokémon data');
	}
	const jsonData = await response.json();
	return { pokemon: jsonData };
}

export const load: PageLoad = async ({ fetch, params }) => {
	const { slug } = params;

	return {
		streamed: { pokemon: fetchPokemon({ fetch, slug }) }
	};
};
