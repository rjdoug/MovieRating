<script lang="ts">
	import { goto } from '$app/navigation';
	import SimpleButton from '$lib/SimpleButton.svelte';
	import { buildTMDBImgUrl } from '$lib/utils.js';

	export let data;

	// Typecasting being a prick in svelte, so placing function here
	function onKeyUp(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			goto(data.url?.href + '/new');
		}
	}
</script>

<h1>Ratings</h1>
<rating-table>
	{#each data.ratings as rating}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<movie-poster on:click={() => goto(`/ratings/${rating.movieID}`)}>
			<img
				class="poster-img"
				src={buildTMDBImgUrl(rating.movie.poster_path)}
				alt={rating.movie.title + ' poster'}
			/>

			<total-rating>{rating.totalRating.value}/5</total-rating>

			<poster-overlay>
				<movie-title>{rating.movie.title}</movie-title>
			</poster-overlay>
		</movie-poster>
	{:else}
		<empty-table>
			<h2>No ratings completed</h2>
			<p>Add a new rating to begin</p>
		</empty-table>
	{/each}
</rating-table>

<button-wrap>
	<SimpleButton onClick={() => goto(data.url?.href + 'ratings/new')} {onKeyUp}
		>Add Rating</SimpleButton
	>
</button-wrap>

<style>
	h1 {
		font-size: 3.5rem;
		font-weight: 600;
		color: var(--color-heading);
		font-size: var(--font-size-h1);
	}
	rating-table {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		align-items: start;
		gap: 16px;
		margin-top: 1rem;
		min-height: 35vh;
		/* -1rem on bottom to offset the movie poster margin for last row */
		padding: 1rem;
	}

	movie-poster {
		display: flex;
		flex-direction: column;
		position: relative;

		width: 185px;
		border-radius: 3px;
		margin-bottom: 2rem;

		box-shadow: var(--box-shadow-action);
		overflow: hidden;
		transition: box-shadow 0.3s ease;
	}

	movie-poster:hover {
		box-shadow: var(--box-shadow-action-active);
	}

	.poster-img {
		/* Force img to fit to 278px - Mostly the standard, but will zoom anything that doesn't fit */
		object-fit: cover;
		height: 278px;
		width: 185px;
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

	empty-table {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	button-wrap {
		margin-top: 2rem;
	}
</style>
