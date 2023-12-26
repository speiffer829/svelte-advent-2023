<script lang="ts">
	import Donut from '$lib/Donut.svelte';
	import type { PageData } from './$types';
	import Question from './Question.svelte';

	let { data } = $props<{ data: PageData }>();

	let right_count = $state(0);
	let wrong_count = $state(0);

	let total_done = $derived(right_count + wrong_count);
	let progress = $derived((right_count / data.questions.length) * 100);
	let other_progress = $derived((wrong_count / data.questions.length) * 100);
</script>

<svelte:head>
	<title>Santa's Quiz</title>
</svelte:head>

<main>
	<h1>Santa's Quiz</h1>

	<div
		class="sticky top-0 z-10 flex items-center justify-between bg-slate-700/50 py-4 backdrop-blur"
	>
		<div class="w-10 text-green-400" class:text-green-400={progress === 100}>
			<Donut {progress} {other_progress} size={'100%'} show_number={false} />
		</div>
		<div class="flex gap-4">
			<span class="text-red-400">
				<span>Wrong:</span>
				{wrong_count}
			</span>
			<span class="text-green-400">
				<span>Right:</span>
				{right_count}
			</span>
		</div>
	</div>
	<div class="grid gap-10 md:grid-cols-2">
		{#each data.questions as question}
			<Question {question} onright={() => right_count++} onwrong={() => wrong_count++} />
		{/each}
	</div>
</main>
