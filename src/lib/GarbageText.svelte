<script lang="ts">
	import { tick, untrack } from 'svelte';

	let { text } = $props<{ text: string }>();

	let displayed_text = $state('');
	const random_chars = '!@#$%^&*()_-+=[]{}|;:,.<>?/~`';
	const duration = 700;
	let interval = $state<number>();

	$effect(() => {
		text;

		untrack(() => {
			if (text) {
				clearInterval(interval);
				displayed_text = '';
				decode_text();
			}
		});
	});

	async function decode_text() {
		const update_interval = duration / text.length;
		let index = 0;

		interval = setInterval(() => {
			displayed_text = text
				.split('')
				.map((char, i) => (i < index ? char : random_char()))
				.join('');
			index++;
			if (index > text.length) clearInterval(interval);
		}, update_interval);

		await tick(); // Ensures the DOM is updated after the reactive statement
	}

	function random_char() {
		return random_chars[Math.floor(Math.random() * random_chars.length)];
	}
</script>

<span>{displayed_text}</span>
