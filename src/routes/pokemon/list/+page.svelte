<script>
	import { goto } from '$app/navigation';
	export let data;

	let limit = data.limit;
	let loading = false; // Track if a load operation is in progress

	// Function to load more Pokémon
	function loadMore() {
		if (loading) return; // Prevent multiple concurrent loads
		loading = true;
		limit += 10;

		// Use `goto` to update the URL and trigger data fetching
		goto(`?limit=${limit}`);
		loading = false;
	}

	// Handle scroll events for infinite scrolling
	function onScroll(event) {
		const container = event.target;
		const scrollHeight = container.scrollHeight; // Total height of the content
		const scrollTop = container.scrollTop; // Current scroll position
		const clientHeight = container.clientHeight; // Visible part of the container

		const isNearBottom = scrollHeight - scrollTop <= clientHeight * 1;

		if (isNearBottom && !loading) {
			loadMore();
		}
	}
</script>

<!-- <h1>Pokemon</h1>

{#if loading}
	<p>Loading...</p>
{:else} -->
<ul on:scroll={onScroll}>
	{#each data.pokemon.items as item}
		<li>
			<img src={item.image} alt={`Sprite of ${item.name}`} width="50" height="50" />
			<a href={`/pokemon/info/${item.name}`} class="pokemon-link">{item.name}</a>
		</li>
	{/each}
</ul>

<!-- <button on:click={loadMore} disabled={loading}>
		{loading ? 'Loading...' : 'Load More'}
	</button>
{/if} -->

<style>
	ul {
		height: 100vh;
		overflow-y: auto;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	li {
		margin: 0.5em 0;
		display: flex;
		align-items: center;
	}
	img {
		margin-right: 0.5em;
	}
</style>
