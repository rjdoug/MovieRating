<script lang="ts">
	import Poster from './Poster.svelte';
	import type { KeyVal, TMDBMovie } from './types';

	type Data = {
		movies: { movie: TMDBMovie; totalRating?: KeyVal }[];
		// If a wildcard (*) is specified in string, it will be replaced with the movieID
		onSelectPathTemplate: string;
	};

	export let data: Data;

	function buildRedirectPath(pathTemplate: string, movieID: string): string {
		return pathTemplate.replace('*', movieID);
	}
</script>

<!-- This is a weird one. If I tried to use class={!data.length ? 'empty' : 'grid'}
    And any combination of doing that with a function, reactive statement or onMount
    led to the css style not being able to update itself when it needed to change.

    It should be noted thta the way the classes are applied like this in svelte are
    the same as reactive statements - only updates when the variable changes 

    I'm pretty confident if reformat this to use a reactive statement to get the data
    opposed to it being passed in, the first options would work. -->
<rating-table class:empty={!data.movies.length} class:grid={!!data.movies.length}>
	{#each data.movies as d}
		<Poster
			data={{
				...d,
				onSelectPath: buildRedirectPath(data.onSelectPathTemplate, d.movie.id.toString())
			}}
		/>
	{:else}
		<!-- Empty table -->
		<slot />
	{/each}
</rating-table>

<style>
	.empty {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 200px; /* Adjust based on your requirements */
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 6px;
	}

	rating-table {
		width: 100%;
		margin-top: 1.5rem;
		padding: 0 12px;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 992px) {
		.grid {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	@media (min-width: 1200px) {
		.grid {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	@media (min-width: 1600px) {
		.grid {
			grid-template-columns: repeat(8, 1fr);
			padding: 0 20px;
			gap: 10px;
		}
	}
</style>
