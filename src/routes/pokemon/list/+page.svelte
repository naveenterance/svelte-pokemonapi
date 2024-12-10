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
				<img src={item.image} alt={item.name} width="50" height="50" />
				<a href={`/pokemon/info/${item.name}`} class="pokemon-link">{item.name}</a>
			</li>
		{/each}
	</ol>
{/await}
