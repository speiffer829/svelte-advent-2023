import type { PageLoad } from './$types';

export const load = (async () => {
	type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

	interface Task {
		elf: string;
		task: TaskType;
		minutesTaken: number;
		date: string;
	}

	const req = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');
	const data: Task[] = await req.json();
	return {
		tasks: data
	};
}) satisfies PageLoad;
