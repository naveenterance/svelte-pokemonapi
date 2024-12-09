<script>
	export let data;
</script>

{#if data.error}
	<p>Error loading Pokémon details: {data.error}</p>
{:else if !data.pokemon}
	<p>Loading...</p>
{:else}
	<article>
		<h2>{data.pokemon.name}</h2>
		<img src={data.pokemon.sprites.front_default} alt={data.pokemon.name} />
		<p><strong>Height:</strong> {data.pokemon.height}</p>
		<p><strong>Weight:</strong> {data.pokemon.weight}</p>
		<p><strong>Abilities:</strong></p>
		<ul>
			{#each data.pokemon.abilities as ability}
				<li>{ability.ability.name}</li>
			{/each}
		</ul>
	</article>
{/if}
