<script lang="ts">
	import type { PageData } from './$types';
	type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

	interface Task {
		elf: string;
		task: TaskType;
		minutesTaken: number;
		date: string;
	}

	let { data }: { data: PageData } = $props();

	let tasks: Task[] = $state(data.tasks);

	let total_toys_wrapped = $derived(find_total_toys_wrapped());
	let avg_creation_time = $derived(find_avg_creation_time());
	let avg_wrapping_time = $derived(find_avg_wrapping_time());
	let total_time_wrapping = $derived(
		tasks
			.filter((task) => task.task === 'WRAPPED_PRESENT')
			.reduce((acc, curr) => acc + curr.minutesTaken, 0)
	);
	let total_time_creating = $derived(
		tasks
			.filter((task) => task.task === 'CREATED_TOY')
			.reduce((acc, curr) => acc + curr.minutesTaken, 0)
	);
	let avg_total_time = $derived((total_time_creating + total_time_wrapping) / tasks.length);
	let elf_productivity_array = $derived(find_elf_productivity_array());

	function find_elf_productivity_array(): {
		elf: string;
		total_gifts: number;
		avg_wrapping_time: number;
		avg_creation_time: number;
		avg_total_time: number;
	}[] {
		const elves = [...new Set(tasks.map((task) => task.elf))];
		return elves.map((elf) => {
			const elf_tasks = tasks.filter((task) => task.elf === elf);
			const avg_wrapping_time =
				elf_tasks
					.filter((task) => task.task === 'WRAPPED_PRESENT')
					.reduce((acc, curr) => acc + curr.minutesTaken, 0) /
				elf_tasks.filter((task) => task.task === 'WRAPPED_PRESENT').length;
			const avg_creation_time =
				elf_tasks
					.filter((task) => task.task === 'CREATED_TOY')
					.reduce((acc, curr) => acc + curr.minutesTaken, 0) /
				elf_tasks.filter((task) => task.task === 'CREATED_TOY').length;
			const avg_total_time = (avg_wrapping_time + avg_creation_time) / 2;
			const total_gifts = elf_tasks.filter((task) => task.task === 'WRAPPED_PRESENT').length;
			return { elf, avg_wrapping_time, avg_creation_time, avg_total_time, total_gifts };
		});
	}

	function find_total_toys_wrapped(): number {
		return tasks.filter((task) => task.task === 'WRAPPED_PRESENT').length;
	}

	function find_avg_creation_time(): number {
		return (
			tasks
				.filter((task) => task.task === 'CREATED_TOY')
				.reduce((acc, curr) => acc + curr.minutesTaken, 0) / tasks.length
		);
	}

	function find_avg_wrapping_time(): number {
		return (
			tasks
				.filter((task) => task.task === 'WRAPPED_PRESENT')
				.reduce((acc, curr) => acc + curr.minutesTaken, 0) / tasks.length
		);
	}
</script>

<main>
	<h1>Elf Productivity Monitor</h1>

	<section>
		<h2 class="mb-3 text-3xl">Averages</h2>
		<div class="avg_grid">
			<div class="">
				<h4 class="">Total Toys Wrapped</h4>
				<p class="">{total_toys_wrapped}</p>
			</div>
			<div class="">
				<h4 class="">Average Creation Time</h4>
				<p class="">{avg_creation_time.toFixed(2)} min</p>
			</div>

			<div class="">
				<h4 class="">Average Wrapping Time</h4>
				<p class="">{avg_wrapping_time.toFixed(2)} min</p>
			</div>
			<div class="">
				<h4 class="">Average Total Per Gift</h4>
				<p class="">{avg_total_time.toFixed(2)} min</p>
			</div>
		</div>
	</section>

	<section class="mt-14">
		<h2 class="mb-3 text-3xl">Elf Productivity</h2>
		{#each elf_productivity_array as elf}
			<div class=" mb-5">
				<h3 class="text-2xl">{elf.elf}</h3>
				<div class="avg_grid">
					<div class="">
						<h4>Total Gifts Wrapped</h4>
						<p class="text-white">{elf.total_gifts}</p>
					</div>
					<div class="">
						<h4>Average Wrapping Time</h4>
						<p class:bad={elf.avg_wrapping_time < avg_wrapping_time}>
							{elf.avg_wrapping_time.toFixed(2)} min
						</p>
					</div>
					<div class="">
						<h4>Average Creation Time</h4>
						<p class:bad={elf.avg_creation_time < avg_creation_time}>
							{elf.avg_creation_time.toFixed(2)} min
						</p>
					</div>
					<div class="">
						<h4>Average Total Per Gift</h4>
						<p class:bad={elf.avg_total_time > avg_total_time}>
							{elf.avg_total_time.toFixed(2)} min
						</p>
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>

<style lang="postcss">
	.avg_grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: theme(spacing.4);

		& > div {
			display: grid;
			grid-template-rows: subgrid;
			grid-row: span 2;
			font-weight: bold;
			border-radius: theme(borderRadius.lg);
			background-color: theme(colors.slate.600);
			padding: theme(spacing.3);

			h4 {
				font-size: theme(fontSize.lg);
			}

			p {
				font-size: theme(fontSize.3xl);
				color: theme(colors.green.400);

				&.bad {
					color: theme(colors.red.400);
				}

				&.text-white {
					color: theme(colors.sky.400);
				}
			}
		}
	}
</style>
