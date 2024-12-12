async function fetchCards({
	fetch
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
}) {
	const response = await fetch('https://api.hearthstonejson.com/v1/latest/enUS/cards.json');
	if (!response.ok) {
		throw new Error('Failed to fetch Pokémon data');
	}
	const jsonData = await response.json();
	const cards = jsonData.map((item) => ({ id: item.id, name: item.name }));
	return {
		items: cards
	};
}

export const load = async ({ fetch }) => {
	return {
		streamed: { cards: fetchCards({ fetch }) }
	};
};
