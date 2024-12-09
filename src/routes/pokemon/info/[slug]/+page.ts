export async function load({ params }) {
	const { slug } = params;
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
		if (!response.ok) {
			throw new Error('Failed to fetch Pokémon details');
		}
		const data = await response.json();
		return { pokemon: data };
	} catch (error) {
		console.error(error);
		return {
			pokemon: null,
			error: error.message
		};
	}
}
