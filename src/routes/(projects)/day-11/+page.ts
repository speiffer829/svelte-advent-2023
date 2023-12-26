import type { PageLoad } from './$types';

type NameType = {
	firstNames: string[];
	lastNames: string[];
};

export const load = (async () => {
	const req = await fetch('https://advent.sveltesociety.dev/data/2023/day-eleven.json');
	const res: NameType = await req.json();
	return { names: res };
}) satisfies PageLoad;
