<script lang="ts">
	import HomeCard from '$lib/components/HomeCard.svelte';

	import PomodoroIcon from '$lib/components/PomodoroIcon.svelte';
	import RustLogo from '$lib/components/RustLogo.svelte';
	import TimerIcon from '$lib/components/TimerIcon.svelte';
</script>

<main class="h-full bg-blue-600 p-4">
	<h1 class="text-center text-4xl text-white font-bold">Google Day App</h1>
	<div class="flex mt-4 gap-4">
		<HomeCard link="/tools/pomodoro">
			<svelte:fragment slot="title">Pomodoro</svelte:fragment>
			<PomodoroIcon slot="icon" class="w-14" />
		</HomeCard>
		<HomeCard link="/tools/timer">
			<svelte:fragment slot="title">Timer</svelte:fragment>
			<TimerIcon slot="icon" class="w-14" />
		</HomeCard>
		<HomeCard link="/tools/rust">
			<svelte:fragment slot="title">Rust Integration</svelte:fragment>
			<RustLogo slot="icon" class="w-20" />
		</HomeCard>
	</div>
</main>
