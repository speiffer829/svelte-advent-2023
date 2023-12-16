export const load: PageLoad = async () => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
	const data = await res.json();

	return {
		kids: data
	};
};
