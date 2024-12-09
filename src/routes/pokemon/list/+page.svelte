<script>
	let { data } = $props();
</script>

<h1>Pokemon</h1>

{#await data.streamed.pokemon}
	<p>Loading...</p>
{:then value}
	<ol>
		{#each value.items as item}
			<li>
				<a href={`/pokemon/info/${item.name}`} class="pokemon-link">{item.name}</a>
			</li>
		{/each}
	</ol>
{/await}
