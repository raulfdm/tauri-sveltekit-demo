<script lang="ts">
	import { secondsToMinutesFormatted } from '$lib/utils/time';
	import { onMount, onDestroy } from 'svelte';

	let initialTimeInSeconds = 25 * 60;

	onMount(() => {
		document.querySelector('body')?.classList.add('bg-purple-600');
	});

	onDestroy(() => {
		document.querySelector('body')?.classList.remove('bg-purple-600');
	});
</script>

<div class="flex flex-col max-w-md mx-auto justify-center items-center">
	<span class="text-8xl mb-4">{secondsToMinutesFormatted(initialTimeInSeconds)}</span>
	<button class="bg-white rounded-sm w-28 text-violet-600 px-4 py-2 text-2xl">Start</button>
</div>

<svelte:body class="bg-red-500" />
