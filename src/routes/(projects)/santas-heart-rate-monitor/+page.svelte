<script lang="ts">
	let data_points = $state<number[]>([]);

	let ten_sec_avg = $derived(data_points.slice(-10).reduce((acc, i) => acc + i, 0) / 10);
	let thirty_sec_avg = $derived(data_points.slice(-30).reduce((acc, i) => acc + i, 0) / 30);
	let sixty_sec_avg = $derived(data_points.slice(-60).reduce((acc, i) => acc + i, 0) / 60);

	$effect(() => {
		const interval = setInterval(async () => {
			const req = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
			const res = await req.json();

			data_points.push(res.heartRate);
		}, 1000);
	});
</script>

<svelte:head>
	<title>Santa's Heart Rate Monitor (SHRM™)</title>
</svelte:head>

<main>
	<h1>Santa's Heart Rate Monitor (SHRM™)</h1>

	<p>Current HR: {data_points.at(-1)}</p>
	<p>10s Avg.: {ten_sec_avg.toFixed(2)}</p>
	<p>30s Avg.: {thirty_sec_avg.toFixed(2)}</p>
	<p>60s Avg.: {sixty_sec_avg.toFixed(2)}</p>
</main>
