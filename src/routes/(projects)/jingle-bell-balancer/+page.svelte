<script lang="ts">
	import Donut from '$lib/Donut.svelte';

	type Kid = {
		name: string;
		weight: number;
		id?: string;
	};

	type Props = {
		data: {
			kids: Kid[];
		};
	};
	let { data } = $props<Props>();

	const kids: Kid[] = data.kids.map((kid) => ({
		...kid,
		id: Math.random().toString(36).substring(7)
	}));

	let chosen_kids = $state<Kid[]>([]);
	let total_weight = $derived(chosen_kids.reduce((acc, kid) => acc + kid.weight, 0));
	let progress = $derived(Math.round((total_weight / 100) * 100));

	function handle_kid_pick(kid: Kid) {
		// remove kid if already picked otherwise add them
		if (chosen_kids.some((i) => i.id === kid.id)) {
			chosen_kids = chosen_kids.filter((k) => k.id !== kid.id);
		} else {
			chosen_kids = [...chosen_kids, kid];
		}
	}
</script>

<main>
	<h1>Sleigh Balancer</h1>
	<div class="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
		<aside class="relative lg:col-span-2">
			<div class="sticky top-4 text-center">
				<div class="mx-auto w-fit">
					<Donut size={'200'} {progress} />
				</div>
				<p class="mt-5 text-3xl">
					{Math.round(total_weight)}kg <span class="text-lg">/ 100kg</span>
				</p>
				<p class="mt-5 text-2xl">
					{Math.round(100 - total_weight)}kg remaining
				</p>
			</div>
		</aside>
		<section class="md:col-span-2 lg:col-span-3">
			<ul>
				{#each kids as kid (kid.id)}
					{@const is_chosen = chosen_kids.some((i) => i.id === kid.id)}
					<li class="">
						<button
							title="add kid"
							onclick={() => handle_kid_pick(kid)}
							class:chosen={is_chosen}
							disabled={total_weight + kid.weight > 100 && !is_chosen}
						>
							<span class="indicator">
								{#if is_chosen}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-minus"><path d="M5 12h14" /></svg
									>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg
									>
								{/if}
							</span>
							<span class="flex-grow py-4 text-left">{kid.name}</span>
							<span class="flex-grow-0 p-4 text-right">{kid.weight}kg</span>
						</button>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>

<style lang="postcss">
	li > button {
		--lighter-color: theme('colors.slate.300');
		--light-color: theme('colors.slate.500');
		--dark-color: theme('colors.slate.800');
		--darkest-color: theme('colors.slate.950');

		width: 100%;
		background-color: var(--light-color);
		color: var(--darkest-color);
		display: flex;
		margin-bottom: theme('spacing.4');
		border-radius: theme('borderRadius.2xl');
		gap: theme('spacing.3');
		overflow: hidden;
		font-weight: theme('fontWeight.bold');
		transition: all 250ms;

		&:disabled {
			--lighter-color: theme('colors.red.300');
			--light-color: theme('colors.red.500');
			--dark-color: theme('colors.red.800');
			--darkest-color: theme('colors.red.950');
			pointer-events: none;
		}

		&.chosen {
			--lighter-color: theme('colors.emerald.300');
			--light-color: theme('colors.emerald.500');
			--dark-color: theme('colors.emerald.800');
			--darkest-color: theme('colors.emerald.950');
		}

		.indicator {
			padding: theme('spacing.4');
			transition: theme('transitionProperty.colors');
			transition-duration: 300ms;
		}
		&:hover .indicator {
			background-color: var(--dark-color);
			color: var(--lighter-color);
		}
	}
</style>
