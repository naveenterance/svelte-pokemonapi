export async function load() {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20000');
		if (!response.ok) {
			throw new Error('Failed to fetch Pokémon data');
		}
		const jsonData = await response.json();
		return {
			items: jsonData.results
		};
	} catch (error) {
		console.error(error);
		return {
			items: [],
			error: error.message
		};
	}
}
