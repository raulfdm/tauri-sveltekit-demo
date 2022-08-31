<script>
	import { onMount, onDestroy } from 'svelte';
	import { useMachine } from '@xstate/svelte';
	import { browser } from '$app/environment';
	import { timerMachine } from '$lib/machines/timer';
	import { secondsToMinutesFormatted } from '$lib/utils/time';

	const { state, send } = useMachine(timerMachine);

	onMount(() => {
		if (browser) {
			document.querySelector('body')?.classList.add('bg-emerald-700');
		}
	});

	onDestroy(() => {
		if (browser) {
			document.querySelector('body')?.classList.remove('bg-emerald-700');
		}
	});
</script>

<h1 class="text-center text-4xl font-bold">Timer</h1>

<div>
	{#if $state.matches('configuring')}
		<input
			type="number"
			class="bg-transparent border rounded-sm px-4 py-2 text-lg outline-gray-50"
			value={$state.context.time}
			on:input={(event) => {
				const { value } = event.target;
				send({ type: 'CHANGE_TIME', time: value });
			}}
		/>
	{:else}
		<span
			class="text-5xl cursor-pointer"
			on:click={() => {
				send({ type: 'CONFIGURE' });
			}}>{secondsToMinutesFormatted($state.context.overlap)}</span
		>
	{/if}

	<hr class="opacity-50 my-4" />
	<div>
		<button
			class="bg-emerald-600 hover:bg-emerald-500"
			on:click={() => {
				send({ type: 'TOGGLE' });
			}}
		>
			{#if $state.matches('running')}
				Stop
			{:else}
				Start
			{/if}
		</button>
		<button
			class="bg-white text-emerald-600 hover:bg-emerald-50"
			on:click={() => {
				send({ type: 'RESET' });
			}}>Reset</button
		>
	</div>
</div>

<style>
	input {
	}
	button {
		@apply py-1.5 px-3 rounded transition-colors w-24;
	}
</style>
