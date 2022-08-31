<script lang="ts">
	import { invoke } from '@tauri-apps/api';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	let name: string;
	let message: string;

	onMount(() => {
		if (browser) {
			document.querySelector('body')?.classList.add('bg-rust');
		}
	});

	onDestroy(() => {
		if (browser) {
			document.querySelector('body')?.classList.remove('bg-rust');
		}
	});

	async function onSend() {
		const response = await invoke<string>('greet', { name });
		message = response;
	}
</script>

<div>
	<h1 class="text-center text-4xl mb-4 font-bold">Rust Integration</h1>

	<div class="my-auto min-w-max flex gap-2">
		<input type="text" class="bg-transparent border outline-gray-50 w-min p-2" bind:value={name} />
		<button on:click={onSend} class="rounded bg-white send-btn py-2 px-3">Send to rust</button>
	</div>

	{#if message}
		<p>{message}</p>
	{/if}
</div>

<style>
	:global(.bg-rust) {
		background-color: #dc3618;
	}

	.send-btn {
		color: #dc3618;
	}
</style>
