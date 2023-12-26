<script lang="ts">
	import { untrack } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly, scale, slide } from 'svelte/transition';

	let { data } = $props();

	type KidType = {
		id: string;
		name: string;
		tally: number;
	};

	const kids = data.kids.map((kid: KidType) => {
		const id = Math.random().toString(36).substring(7);
		return {
			...kid,
			id
		};
	});

	let sort_order = $state('none');
	let search_value = $state('');
	let filtered_kids: KidType[] | [] = $derived(handle_kid_filter());

	function handle_kid_filter(): KidType[] | [] {
		if (!kids) return [];

		let _kids: KidType[] = [];

		// arrange from sort order
		if (sort_order === 'worst') {
			_kids = [...kids].sort((a: KidType, b: KidType) => {
				return a.tally - b.tally;
			});
		} else if (sort_order === 'best') {
			_kids = [...kids].sort((a: KidType, b: KidType) => {
				return b.tally - a.tally;
			});
		} else if (sort_order === 'none') {
			_kids = [...kids];
		}

		if (search_value === '') {
			return _kids;
		}

		return _kids.filter((kid: KidType) => {
			return kid.name.toLowerCase().includes(search_value.toLowerCase());
		});
		// fuzzy search data.kids based off search_value
	}
</script>

<main class="">
	<h1 class="">Tally Dashboard</h1>

	<input
		type="search"
		class=" mt-6 w-full rounded-3xl border-2 border-slate-800 bg-slate-500 px-4 py-4 text-2xl text-slate-950"
		bind:value={search_value}
		placeholder="Search for a naughty kid"
	/>

	<div class="mt-4 flex gap-3">
		<button
			class="btn"
			class:active_btn={sort_order === 'worst'}
			onclick={() => (sort_order = 'worst')}>Worst To Best</button
		>
		<button
			class="btn"
			class:active_btn={sort_order === 'best'}
			onclick={() => (sort_order = 'best')}>Best To Worst</button
		>
		{#if sort_order !== 'none'}
			<button class="btn" onclick={() => (sort_order = 'none')}>Reset</button>
		{/if}
	</div>

	<ul class="py-5">
		{#each filtered_kids as kid (kid.id)}
			<li
				class="group mb-4 flex items-center rounded-3xl bg-slate-800 p-4 text-xl text-red-400"
				class:good-kid={kid.tally >= 0}
				animate:flip={{ duration: 500 }}
			>
				<span class="flex-1">{kid.name}</span>
				<span
					class="circle flex aspect-square w-10 items-center justify-center rounded-full bg-red-400 text-red-950"
					>{kid.tally}</span
				>
			</li>
		{:else}
			<li>no kids</li>
		{/each}
	</ul>
</main>

<style lang="postcss">
	.good-kid {
		background-color: theme('colors.slate.800');
		color: theme('colors.green.400');
	}
	.good-kid .circle {
		background-color: theme('colors.green.400');
		color: theme('colors.green.800');
		font-family: theme('fontFamily.sans');
	}

	.active_btn {
		background-color: theme('colors.green.400');
		color: theme('colors.slate.800');
	}
</style>
