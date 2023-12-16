<script lang="ts">
	type Props = {
		progress?: number;
		radius?: number;
		size?: number | string;
	};

	let { progress = 0, radius = 45, size = 100 } = $props<Props>();

	const circumference = 2 * Math.PI * radius;
</script>

<svg width={size} height={size} viewBox="0 0 100 100">
	<circle cx="50" cy="50" r={radius} fill="transparent" class="full-circle" stroke-width="10" />

	<circle
		cx="50"
		cy="50"
		r={radius}
		fill="transparent"
		class="progress-circle stroke-current transition-all"
		stroke-width="10"
		stroke-dasharray={circumference}
		stroke-dashoffset={circumference - (progress / 100) * circumference}
		transform="rotate(-90 50 50)"
		stroke-linecap="round"
	/>

	<text fill="currentColor" x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="1.5em">
		{progress}%
	</text>
</svg>

<style>
	.full-circle {
		stroke: var(--circle-color, theme('colors.slate.500'));
	}

	.progress-circle {
		stroke: var(--progress-color, theme('colors.green.400'));
	}
</style>
