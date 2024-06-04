<script lang="ts">
	import { goto } from '$app/navigation';
	import type { KeyVal, TMDBMovie } from './types';
	import { buildTMDBImgUrl } from './utils';

	type Data = {
		movie: TMDBMovie;
		totalRating?: KeyVal;
	};

	export let data: Data[];
</script>

<rating-table
	style={data.length
		? ''
		: `
                display: flex;
                align-items: center;
                padding: 5rem 0;
        `}
>
	{#each data as d}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<movie-poster on:click={() => goto(`/ratings/${d.movie.id}`)}>
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
	rating-table {
		display: grid;
		width: 100%;
		margin-top: 1.5rem;
		grid-template-columns: repeat(2, 1fr);
		padding: 0 12px;
		gap: 6px;
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
		rating-table {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 992px) {
		rating-table {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	@media (min-width: 1200px) {
		rating-table {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	@media (min-width: 1600px) {
		rating-table {
			grid-template-columns: repeat(7, 1fr);
			padding: 0 20px;
			gap: 10px;
		}

		/* big landscape tablets, laptops, and desktops */
		/* rating-table {
			min-height: 300px;
			gap: 16px;
			padding: 1rem;
			justify-content: start;
		}

		movie-poster {
			margin-bottom: 2rem;
		}

		.poster-img {
			width: 14em;
		} */
	}
</style>
