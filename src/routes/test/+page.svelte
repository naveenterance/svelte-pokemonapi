<script>
	import LazyImage from './lazyImage.svelte';
	let limit = 20;
	let pokemonList = [];
	let loading = true;

	// Fetch Pokémon data from the API
	async function fetchPokemon() {
		loading = true;
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
			const data = await response.json();
			const pokemonData = await Promise.all(
				data.results.map(async (pokemon) => {
					const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
					return {
						name: pokemon.name,
						image: pokemonDetails.sprites.front_default
					};
				})
			);
			pokemonList = pokemonData;
		} catch (error) {
			console.error('Error fetching Pokémon data', error);
		} finally {
			loading = false;
		}
	}

	const fetchMore = () => {
		limit += 20; // Increase the limit by 20
		fetchPokemon(); // Fetch new set of Pokémon
	};

	// Trigger fetchMore on scroll
	const onScroll = (event) => {
		const scrollHeight = event.target.scrollHeight; // Total content height
		const scrollTop = event.target.scrollTop; // Current scroll position
		const clientHeight = event.target.clientHeight; // Visible part of the element

		const isNearBottom = scrollHeight - scrollTop <= clientHeight * 4;

		if (isNearBottom && !loading) {
			fetchMore();
		}
	};

	// Initial fetch
	fetchPokemon();
</script>

<main>
	<h1>Pokémon List</h1>

	<!-- {#if loading}
		<p>Loading...</p>
	{:else} -->
	<ul on:scroll={onScroll}>
		{#each pokemonList as pokemon}
			<li>
				<LazyImage src={pokemon.image} alt={pokemon.name} />
				{pokemon.name}
			</li>
		{/each}
	</ul>
	{#if loading}
		<p>Loading...</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
	}
	ul {
		max-height: 400px;
		overflow-y: scroll;
		border: 1px solid #ccc;
		padding: 0;
	}
	li {
		list-style: none;
		display: flex;
		align-items: center;
		padding: 10px;
	}
</style>
