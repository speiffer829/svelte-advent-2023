<main class="mx-auto max-w-4xl px-4 pt-16">
	<a
		href="/"
		title="go back"
		class="group flex w-fit gap-2 rounded-2xl p-4 transition-colors hover:bg-slate-600 hover:text-green-400"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-arrow-left transition-transform group-hover:-translate-x-2"
			><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg
		>
		<span class="block">Back</span>
	</a>
	<slot />
</main>
