import type { PageLoad } from './$types';

interface Question {
	question: string;
	answers: {
		text: string;
		correct: boolean;
	}[];
}

export const load = (async () => {
	const req = await fetch('https://advent.sveltesociety.dev/data/2023/day-eighteen.json');
	const questions: Question[] = await req.json();
	return {
		questions
	};
}) satisfies PageLoad;
