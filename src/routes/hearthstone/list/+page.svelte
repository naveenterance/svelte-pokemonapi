<script>
	import LazyImage from '$lib/components/LazyImage.svelte';
	let { data } = $props();
</script>

<h1>Hearthstone</h1>

{#await data.streamed.cards}
	<p>Loading...</p>
{:then value}
	<ol>
		{#each value.items as item}
			<li>
				<LazyImage
					src="https://art.hearthstonejson.com/v1/render/latest/enUS/512x/{item.id}.png"
					alt={`Sprite of ${item.name}`}
					height="50"
					width="50"
				/>
				https://art.hearthstonejson.com/v1/render/latest/enUS/512x/orig/{item.id}.png
			</li>
		{/each}
	</ol>
{/await}
