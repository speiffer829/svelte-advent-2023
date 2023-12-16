export const load: PageLoad = async () => {
	try {
		const req = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		if (!req.ok) throw new Error('oh snap!');
		const kids = await req.json();

		return {
			kids
		};
	} catch (error) {
		console.error('oh snap!', error);
	}
};
