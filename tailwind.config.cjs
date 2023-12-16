/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				serif: ['Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', 'P052', 'serif'],
				sans: ['system-ui', 'sans-serif']
			}
		}
	},

	plugins: []
};

module.exports = config;
