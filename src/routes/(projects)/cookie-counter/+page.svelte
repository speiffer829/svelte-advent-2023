<script lang="ts">
	let cookie_count = $state(0);

	function spin(
		node: HTMLElement,
		params: { duration: number; deg?: number } = { duration: 300, deg: 720 }
	) {
		const { duration, deg = 360 } = params;
		return {
			duration,
			deg,
			css: (t: number) => {
				const eased = t * t * t;
				return `
					transform: rotate(${eased * deg}deg) scale(${eased});
				`;
			}
		};
	}
</script>

<main>
	<h1 class="text-center text-5xl font-bold uppercase">Tally Dashboard</h1>
	<div class="flex items-center justify-center gap-4">
		<button
			class="btn text-3xl"
			onclick={() => (cookie_count === 0 ? cookie_count : cookie_count--)}
		>
			-
		</button>
		<p class="min-w-[100px] text-center text-4xl">{cookie_count}</p>
		<button class="btn text-3xl" onclick={() => cookie_count++}> + </button>
	</div>
	<div
		class="mx-auto mt-6 grid max-w-md grid-cols-5 gap-4 rounded-xl border-2 border-dashed border-white bg-slate-800 p-4 text-center"
	>
		{#each Array.from({ length: cookie_count }) as _, i}
			<div class="text-5xl" transition:spin={{ duration: 450 }}>🍪</div>
		{/each}
	</div>
</main>
