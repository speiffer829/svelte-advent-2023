<script>
	let foo = $state('bar');
</script>

<svelte:head>
	<title>Spenser's Svelte Advent 2023</title>
</svelte:head>

<header class="mx-auto max-w-4xl px-4 pt-16 text-green-400">
	<svg
		class="mx-auto"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
		height="148"
		width="148"
		><g
			><path
				d="M12.3 12A2 2 0 0 0 14 14.98h0.82a0.26 0.26 0 0 1 0.26 0.16 0.28 0.28 0 0 1 0 0.32 0.5 0.5 0 0 0 0 0.54 0.48 0.48 0 0 0 0.48 0.3l1.8 0c6.68 -0.22 14.92 -0.48 18.6 -2.46a2 2 0 0 0 -0.12 -2 58.98 58.98 0 0 0 -9.34 -10.2L25.62 0.8a2 2 0 0 0 -3.24 0l-0.88 0.82A59.68 59.68 0 0 0 12.3 12ZM24 8.48a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5Z"
				fill="currentColor"
				stroke-width="2"
			></path><path
				d="M8.34 22.86a2 2 0 0 0 0 2A2 2 0 0 0 10 26h3.48q-0.6 0.6 -1.2 1.32a0.52 0.52 0 0 0 0 0.54 0.48 0.48 0 0 0 0.46 0.28c10.22 -0.36 24 -2.6 26.98 -4a0.56 0.56 0 0 0 0.3 -0.54 2.42 2.42 0 0 0 -0.34 -0.86 78.9 78.9 0 0 0 -5.34 -6 0.48 0.48 0 0 0 -0.48 -0.14 80.34 80.34 0 0 1 -16.54 1.58l-4.92 0.2a0.5 0.5 0 0 0 -0.4 0.22q-2 2.2 -3.66 4.26ZM29 20a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5Zm-10 1.5a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.52Z"
				fill="currentColor"
				stroke-width="2"
			></path><path
				d="M41.66 35.86A66.86 66.86 0 0 0 36 27.56a0.48 0.48 0 0 0 -0.48 -0.16 150.9 150.9 0 0 1 -25.24 2.78 0.52 0.52 0 0 0 -0.4 0.2c-1.12 1.58 -2.26 3.36 -3.48 5.4a2 2 0 0 0 -0.18 2 2 2 0 0 0 1.78 1.12h13.5a0.5 0.5 0 0 1 0.5 0.5V46a2 2 0 0 0 4 0v-6.52a0.5 0.5 0 0 1 0.5 -0.5H40a2 2 0 0 0 1.78 -1.12 2 2 0 0 0 -0.12 -2ZM14.18 36a1.5 1.5 0 0 1 0 -3 1.5 1.5 0 0 1 0 3Zm8.92 -4.5a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.52Zm9.4 3.5a1.5 1.5 0 1 1 1.5 -1.5 1.5 1.5 0 0 1 -1.5 1.48Z"
				fill="currentColor"
				stroke-width="2"
			></path></g
		></svg
	>
	<h1 class="mt-6 text-center text-3xl uppercase text-white md:text-5xl">
		Spenser's Svelte Advent 2023
	</h1>
</header>

{#snippet link({ href, text })}
	<li>
		<a {href} class="block py-4 transition-colors hover:text-green-400" title={text}>{text}</a>
	</li>
{/snippet}

<main class="mx-auto max-w-4xl px-4 pt-16">
	<ol class="list-outside list-decimal pl-6 font-serif text-3xl">
		{@render link({ href: 'tally-dashboard', text: 'Tally Dashboard' })}
		{@render link({ href: 'cookie-counter', text: 'Cookie Counter' })}
		{@render link({ href: 'jingle-bell-balancer', text: 'Jingle Bell Balancer' })}
		{@render link({
			href: 'santas-heart-rate-monitor',
			text: "Santa's Heart Rate Monitor (SHRM™)"
		})}
		{@render link({ href: 'elf-productivity-monitor', text: 'Elf Productivity Monitor' })}
		{@render link({ href: 'metronome', text: 'Mistletoe Metronome' })}
		{@render link({ href: 'morse-code-translator', text: 'Morse Code Translator' })}
		{@render link({ href: 'deck-of-doubles', text: 'Deck Of Doubles' })}
	</ol>
</main>
