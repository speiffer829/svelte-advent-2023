<script lang="ts">
	const numbers = Array.from({ length: 24 }, (_, i) => i + 1);
	const raw_deck = [...numbers, ...numbers];

	type CardType = {
		number: number;
		id: string;
	};

	function get_url(number: number) {
		return `https://advent.sveltesociety.dev/data/2023/day-eight/${number}.png`;
	}

	let deck = $state<CardType[]>(
		[...raw_deck]
			.map((item) => ({ number: item, id: Math.random().toString(36).substring(2) }))
			.sort(() => Math.random() - 0.5)
	);

	$inspect(deck);

	let picked = $state<CardType[]>([]);
	let matched = $state<number[]>([]);

	$inspect(matched);

	function handle_click(card: CardType) {
		if (picked.length < 2) picked.push(card);

		if (picked.length === 2 && picked[0].number === picked[1].number) {
			matched = [...matched, picked[0].number];
			picked = [];
			return;
		}
		if (picked.length === 2) {
			setTimeout(() => {
				picked = [];
			}, 1000);
		}
	}
</script>

<main>
	<h1>Deck Of Doubles</h1>

	<div class="grid grid-cols-6 gap-4 pb-12">
		{#key deck}
			{#each deck as card (card.id)}
				<button
					class="overflow-clip rounded-xl border-2 border-dashed border-white transition-all duration-200 hover:border-sky-400"
					onclick={() => handle_click(card)}
					class:active={picked.some((item) => item.id === card.id)}
					class:matched={matched.includes(card.number)}
					data-id={card.id}
					data-number={card.number}
					title={`${card.number}`}
				>
					<img
						src={get_url(card.number)}
						alt="card"
						class="translate-y-full transition-all duration-300"
					/>
				</button>
			{/each}
		{/key}
	</div>
</main>

<style lang="postcss">
	.active,
	.matched {
		img {
			transform: translateY(0);
		}
	}

	.matched {
		border-color: theme('colors.green.400');
	}
</style>
