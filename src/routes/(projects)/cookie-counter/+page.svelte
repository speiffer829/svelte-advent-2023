<script lang="ts">
	let cookie_count = $state(0);

	function spin(node: HTMLElement, params: { duration: number }) {
		return {
			duration: params.duration,
			css: (t: number) => {
				const eased = t * t * t;
				return `
					transform: rotate(${eased * 720}deg) scale(${eased});
				`;
			}
		};
	}
</script>

<div class="flex items-center justify-center gap-4">
	<button class="btn text-3xl" onclick={() => cookie_count++}> + </button>
	<p class="min-w-[100px] text-center text-4xl">{cookie_count}</p>
	<button class="btn text-3xl" onclick={() => (cookie_count === 0 ? cookie_count : cookie_count--)}>
		-
	</button>
</div>
<div
	class="mx-auto mt-6 grid max-w-md grid-cols-5 gap-4 rounded-xl border-2 border-dashed border-white bg-slate-800 p-4 text-center"
>
	{#each Array.from({ length: cookie_count }) as _, i}
		<div class="text-5xl" transition:spin={{ duration: 450 }}>🍪</div>
	{/each}
</div>
