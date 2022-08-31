<script lang="ts">
	import PomodoroIcon from '$lib/components/PomodoroIcon.svelte';
	import TimerIcon from '$lib/components/TimerIcon.svelte';
</script>

<main class="h-full bg-blue-600 p-4">
	<h1 class="text-center text-4xl text-white font-bold">Google Day App</h1>
	<div class="flex mt-4 gap-4">
		<a
			href="/tools/pomodoro"
			class="rounded shadow-sm bg-blue-500 max-w-sm w-full p-4 grid place-items-center text-white hover:bg-blue-400 transition-all"
		>
			Pomodoro
			<PomodoroIcon class="w-8" />
		</a>
		<a
			href="/tools/timer"
			class="rounded shadow-sm bg-blue-500 max-w-sm w-full p-4 grid place-items-center text-white hover:bg-blue-400 transition-all"
		>
			Timer
			<TimerIcon class="w-8 " />
		</a>
	</div>
</main>
