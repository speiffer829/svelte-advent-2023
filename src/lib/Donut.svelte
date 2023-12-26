<script lang="ts">
	type Props = {
		progress?: number;
		other_progress?: number;
		radius?: number;
		size?: number | string;
		show_number?: boolean;
	};

	let {
		progress = 0,
		other_progress = 0,
		radius = 45,
		size = 100,
		show_number = true
	} = $props<Props>();

	const circumference = $derived(2 * Math.PI * radius);
	const dash_offset = $derived(circumference - (progress / 100) * circumference);
	const other_dash_offset = $derived(
		circumference - ((other_progress + progress) / 100) * circumference
	);

	$inspect(dash_offset, other_dash_offset);
</script>

<svg width={size} height={size} viewBox="0 0 100 100">
	<circle cx="50" cy="50" r={radius} fill="transparent" class="full-circle" stroke-width="10" />

	<circle
		cx="50"
		cy="50"
		r={radius}
		fill="transparent"
		class="other-progress-circle stroke-red-400 transition-all"
		stroke-width="10"
		stroke-dasharray={circumference}
		stroke-dashoffset={other_dash_offset}
		transform="rotate(-90 50 50)"
		stroke-linecap="round"
	/>
	<circle
		cx="50"
		cy="50"
		r={radius}
		fill="transparent"
		class="progress-circle stroke-green-400 transition-all"
		stroke-width="10"
		stroke-dasharray={circumference}
		stroke-dashoffset={dash_offset}
		transform="rotate(-90 50 50)"
		stroke-linecap="round"
	/>

	{#if show_number}
		<text fill="currentColor" x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="1.5em">
			{progress}%
		</text>
	{/if}
</svg>

<style>
	.full-circle {
		stroke: var(--circle-color, theme('colors.slate.500'));
	}

	.progress-circle {
		stroke: var(--progress-color, theme('colors.green.400'));
	}

	.other-progress-circle {
		stroke: var(--other-progress-color, theme('colors.red.400'));
	}
</style>
