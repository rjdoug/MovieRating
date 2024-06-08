<script lang="ts">
	import { goto } from '$app/navigation';
	//
	import type { KeyVal, TMDBMovie } from './types';
	import { buildTMDBImgUrl } from './utils';

	type Data = {
		movies: { movie: TMDBMovie; totalRating?: KeyVal }[];
		// If a wildcard (*) is specified in string, it will be replaced with the movieID
		onSelectPath: string;
	};

	export let data: Data;

	function buildRedirectPath(pathTemplate: string, movieID: string): string {
		let x = pathTemplate.replace('*', movieID);
		console.log(x);
		return x;
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<movie-poster
			on:click={() => goto(buildRedirectPath(data.onSelectPath, d.movie.id.toString()))}
		>
			<img
				class="poster-img"
				src={buildTMDBImgUrl(d.movie.poster_path)}
				alt={d.movie.title + ' poster'}
			/>

			{#if d.totalRating}
				<total-rating>{d.totalRating?.value}/5</total-rating>
			{/if}

			<poster-overlay>
				<movie-title>{d.movie.title}</movie-title>
			</poster-overlay>
		</movie-poster>
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

	movie-poster {
		display: flex;
		flex-direction: column;
		position: relative;

		border: 1px solid var(--color-border);
		border-radius: 10px;

		overflow: hidden;
		transition: box-shadow 0.3s ease;
	}

	.poster-img {
		object-fit: cover;
	}

	total-rating {
		display: flex;
		background-color: rgba(0, 0, 0, 0.4);
		color: white;
		font-size: 26px;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

	poster-overlay {
		display: flex;
		position: absolute;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		padding-top: 1rem;

		transition: opacity 0.5s ease;
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 0;
		@media (min-width: 320px) {
			/* smartphones, iPhone, portrait 480x320 phones */
		}
		z-index: 1;
	}

	poster-overlay:hover {
		opacity: 1;
	}

	movie-title {
		color: white;
		font-weight: bold;
		font-size: 1.3rem;
		text-align: center;
		padding: 0 0.5rem;
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
			grid-template-columns: repeat(7, 1fr);
			padding: 0 20px;
			gap: 10px;
		}
	}
</style>
