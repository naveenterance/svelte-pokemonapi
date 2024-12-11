<script>
	import { onMount } from 'svelte';

	export let src;
	export let alt = '';
	let loaded = false;
	let imageRef;

	onMount(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				loaded = true;
				observer.disconnect();
			}
		});

		if (imageRef) {
			observer.observe(imageRef);
		}

		return () => observer.disconnect();
	});
</script>

<div class="image-wrapper" bind:this={imageRef}>
	{#if loaded}
		<img {src} {alt} />
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
	img {
		width: 100;
		height: 100;
	}
</style>
