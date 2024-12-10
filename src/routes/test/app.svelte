<script>
	import Observer from './lazyImage.svelte';
	import { writable } from 'svelte/store';

	const isInView = writable(false); // Writable store for visibility

	// Reactive debug log
	$: console.log($isInView ? 'In View' : 'Out of View');
</script>

<Observer isVisible={isInView}>
	<p>This component tracks if it's visible in the viewport.</p>
</Observer>
