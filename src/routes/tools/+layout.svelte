<script lang="ts">
	import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
	import { onDestroy, onMount } from 'svelte';
</script>

<main class="p-4 tools-container h-full text-white">
	<nav class="mb-4">
		<a href="/" class="flex gap-2"><ArrowLeftIcon class="w-4" /> Back to Apps Catalog</a>
	</nav>
	<slot />
</main>
