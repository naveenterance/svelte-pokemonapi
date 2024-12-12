<script>
	let { src, alt, height, width } = $props();

	let loaded = $state(false);
	let imageRef = $state();

	$effect(() => {
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
		<img {src} {alt} {height} {width} />
	{:else}
		<p>Loading...</p>
	{/if}
</div>
