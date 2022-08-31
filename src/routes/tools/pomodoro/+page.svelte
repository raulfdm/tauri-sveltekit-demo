<script lang="ts">
	import { secondsToMinutesFormatted } from '$lib/utils/time';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { useMachine } from '@xstate/svelte';
	import { createPomodoroMachine, pomodoroTabMachine } from '$lib/machines/pomodoro';

	const initialTimeInSeconds = 25 * 60;

	// const machine = createPomodoroMachine(initialTimeInSeconds);
	const { state, send } = useMachine(pomodoroTabMachine);

	$: {
		console.log($state.children);
	}

	onMount(() => {
		if (browser) {
			document.querySelector('body')?.classList.add('bg-purple-600');
		}
	});

	onDestroy(() => {
		if (browser) {
			document.querySelector('body')?.classList.remove('bg-purple-600');
		}
	});
</script>

<div class="flex flex-col max-w-md mx-auto justify-center items-center">
	<nav>
		<button on:click={() => send({ type: 'POMODORO' })}>Pomodoro</button>
		<button on:click={() => send({ type: 'BREAK' })}>Break</button>
	</nav>
	<div />
	<button on:click={() => send({ type: 'TEST' })}>TEST</button>
	<!-- <span class="text-8xl mb-4">{secondsToMinutesFormatted($state.context.overlap)}</span>
	<button
		class="bg-white rounded-sm w-28 text-violet-600 px-4 py-2 text-2xl"
		on:click={() => send({ type: 'TOGGLE' })}
	>
		{#if $state.matches('idle')}
			Start
		{:else if $state.matches('running')}
			Pause
		{:else if $state.matches('paused')}
			Resume
		{/if}
	</button> -->
</div>

<svelte:body class="bg-red-500" />
