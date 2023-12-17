<script lang="ts">
	import { backOut, quintInOut } from 'svelte/easing';
	let cookie_count = $state(0);

	function spin(
		node: HTMLElement,
		params: { duration: number; deg?: number; easing?: (t: number) => number } = {
			duration: 300,
			deg: 720,
			easing: quintInOut
		}
	) {
		const { duration, deg = 360, easing = quintInOut } = params;
		return {
			duration,
			deg,
			easing,
			css: (t: number) => {
				const eased = easing(t);
				return `
                    transform: rotate(${eased * deg}deg) scale(${eased});
                `;
			}
		};
	}

	function handle_keydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
			cookie_count++;
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
			cookie_count === 0 ? cookie_count : cookie_count--;
		}
	}
</script>

<svelte:window onkeydown={handle_keydown} />
<main>
	<h1 class="">Cookie Counter</h1>
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
			<div class="text-5xl" transition:spin={{ duration: 450, easing: backOut }}>🍪</div>
		{/each}
	</div>
</main>
