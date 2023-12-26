<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Answer {
		text: string;
		correct: boolean;
	}

	interface Question {
		question: string;
		answers: Answer[];
	}

	interface Props {
		question: Question;
		onwrong?: () => void;
		onright?: () => void;
	}
	let { question, onright = () => {}, onwrong = () => {} } = $props<Props>();

	let chosen = $state<Answer>();
	let is_correct = $state<boolean>();

	function shuffled_answers(answers: Answer[]): Answer[] {
		return answers.sort(() => Math.random() - 0.5);
	}

	function handle_click(answer: Answer) {
		chosen = answer;
		is_correct = answer.correct;
		if (answer.correct) onright();
		else onwrong();
	}
</script>

<div>
	<h2 class="mb-4 text-xl">{question.question}</h2>
	<ul>
		{#each shuffled_answers(question.answers) as answer}
			<li>
				<button
					onclick={() => handle_click(answer)}
					class="mb-2 flex w-full gap-2 rounded-lg py-2 text-left text-slate-300"
					disabled={!!chosen}
					class:!opacity-50={chosen?.text !== answer.text && !!chosen}
					class:!text-green-400={chosen?.text && answer.correct}
					class:!text-red-400={chosen?.text === answer.text && !answer.correct}
				>
					<span
						class="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-clip rounded-md border-2 border-slate-500 p-1 text-slate-800"
						class:bg-current={chosen?.text.length}
					>
						{#if answer.correct && chosen?.text}
							<svg
								in:fly={{ y: 50, duration: 250 }}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke-width="4"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-check stroke-green-400"><path d="M20 6 9 17l-5-5" /></svg
							>
						{:else if !answer.correct && chosen?.text}
							<svg
								in:fly={{ y: 50, duration: 250 }}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke-width="4"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-x stroke-red-400"
								><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
							>
						{/if}
					</span>
					{answer.text}
				</button>
			</li>
		{/each}
	</ul>
</div>
