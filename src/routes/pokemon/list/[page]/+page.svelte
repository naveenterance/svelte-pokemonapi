<script>
	import { goto } from '$app/navigation';
	const { data } = $props();

	let limit = $state(data.limit);
	let loading = $state(false);

	function loadMore() {
		if (loading) return;
		loading = true;
		limit += 10;
		goto(`${limit}`).then(() => (loading = false));
	}
	$inspect(loading);

	function onScroll(event) {
		const container = event.target;
		const scrollHeight = container.scrollHeight;
		const scrollTop = container.scrollTop;
		const clientHeight = container.clientHeight;

		const isNearBottom = scrollHeight - scrollTop <= clientHeight * 1;

		if (isNearBottom && !loading) {
			loadMore();
		}
	}
</script>

{#if loading}
	<h1 class="absolute top-20">Loading ------</h1>
{/if}

<ul onscroll={onScroll}>
	{#each data.pokemon.items as item}
		<li>
			<img src={item.image} alt={`Sprite of ${item.name}`} width="50" height="50" />
			<a href={`/pokemon/info/${item.name}`} class="pokemon-link">{item.name}</a>
		</li>
	{/each}
</ul>

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
