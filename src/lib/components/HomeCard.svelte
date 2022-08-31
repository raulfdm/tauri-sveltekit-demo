<script lang="ts">
	export let link: string;
</script>

<a
	href={link}
	class="rounded shadow-sm bg-blue-500 max-w-sm w-full p-4 grid place-items-center text-white hover:bg-blue-400 transition-all min-h-[150px]"
>
	<h2 class="text-xl font-semibold italic">
		<slot name="title">No Given Title</slot>
	</h2>
	<slot name="icon">No Given Icon</slot>
</a>
