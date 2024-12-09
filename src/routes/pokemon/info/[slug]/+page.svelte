<script>
	let { data } = $props();
</script>

<h1>Pokemon</h1>

{#await data.streamed.pokemon}
	<p>Loading...</p>
{:then value}
	<article>
		<h2>{value.pokemon.name}</h2>
		<img src={value.pokemon.sprites.front_default} alt={value.pokemon.name} />
		<p><strong>Height:</strong> {value.pokemon.height}</p>
		<p><strong>Weight:</strong> {value.pokemon.weight}</p>
		<p><strong>Abilities:</strong></p>
		<ul>
			{#each value.pokemon.abilities as ability}
				<li>{ability.ability.name}</li>
			{/each}
		</ul>
	</article>
{/await}
