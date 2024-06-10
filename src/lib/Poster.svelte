<script lang="ts">
	import { goto } from '$app/navigation';
	import type { KeyVal, TMDBMovie } from './types';
	import { buildTMDBImgUrl } from './utils';

	type Data = {
		movie: TMDBMovie;
		totalRating?: KeyVal;
		onSelectPath: string;
	};

	export let data: Data;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<movie-poster on:click={() => goto(data.onSelectPath)}>
	<img
		class="poster-img"
		src={buildTMDBImgUrl(data.movie.poster_path)}
		alt={data.movie.title + ' poster'}
	/>

	{#if data.totalRating}
		<total-rating>{data.totalRating?.value * 2}/10</total-rating>
	{/if}

	<poster-overlay>
		<movie-title>{data.movie.title}</movie-title>
	</poster-overlay>
</movie-poster>

<style>
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
</style>
