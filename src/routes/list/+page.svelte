<script>
	let { data } = $props();
	$inspect(data);
</script>

<h1>Pokemon</h1>

{#if data.error}
	<p>Error loading Pokémon: {data.error}</p>
{:else}
	<ul>
		{#each data.items as item}
			<li>
				<a href={`/${item.name}`} class="pokemon-link">{item.name}</a>
			</li>
		{/each}
	</ul>
{/if}
