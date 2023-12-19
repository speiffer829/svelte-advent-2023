<script lang="ts">
	import { morse_dictionary } from './morse_dictionary';

	let message = $state('Merry Christmas, ya filthy animal');

	let morse_translation = $derived(generate_morse(message));

	function generate_morse(_message: string): string {
		return _message
			.toUpperCase()
			.split(' ')
			.map((word) => {
				return word
					.split('')
					.map((char) => {
						if (morse_dictionary[char as keyof typeof morse_dictionary]) {
							return morse_dictionary[char as keyof typeof morse_dictionary];
						} else {
							// Handle characters not in the dictionary
							return '';
						}
					})
					.join(' '); // Join characters with a space (short pause)
			})
			.join(' / '); // Join words with a slash (long pause)
	}
</script>

<svelte:head>
	<title>Morse Code Translator</title>
</svelte:head>

<main>
	<h1>Morse Code Translator</h1>
	<input type="text" bind:value={message} />

	{#if morse_translation}
		<div class="mt-5 rounded-xl bg-slate-800 p-4 text-3xl text-slate-200">
			<p>{morse_translation}</p>
		</div>
	{/if}
</main>
