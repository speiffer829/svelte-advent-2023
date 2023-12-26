<script lang="ts">
	import type { PageData } from './$types';
	import GarbageText from '$lib/GarbageText.svelte';

	let { data } = $props<{ data: PageData }>();

	let value = $state('');
	let first_name = $derived<string>(generate_name('first', value));
	let last_name = $derived<string>(generate_name('last', value));

	function generate_name(name_place: 'first' | 'last', name: string): string {
		if (!name) return '';
		const { names } = data;

		const { firstNames, lastNames } = names;
		const num = hash_to_number(name);
		let value: string = '';
		if (name_place === 'first') value = firstNames[num];
		if (name_place === 'last') value = lastNames[num];
		return value;
	}

	function hash_to_number(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash += str.charCodeAt(i);
		}
		return hash % 61;
	}
</script>

<main>
	<h1>Elf Name Generator</h1>
	<input type="text" class="mb-6" bind:value />
	<p class="pl-4 text-4xl text-green-400">
		<GarbageText text={first_name || 'Elf'} />
	</p>
	<p class="pl-4 text-4xl text-red-400">
		<GarbageText text={last_name || 'Name'} />
	</p>
</main>
