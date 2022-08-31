<script>
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		document.querySelector('body')?.classList.add('bg-emerald-600');
	});

	onDestroy(() => {
		document.querySelector('body')?.classList.remove('bg-emerald-600');
	});
</script>

<h1>Timer</h1>
