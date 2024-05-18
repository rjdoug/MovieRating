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

<rating-table>
	{#if data.ratings}
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
		{/each}
	{/if}
</rating-table>

<button-wrap>
	<SimpleButton onClick={() => goto(data.url?.href + '/new')} {onKeyUp}>New Rating</SimpleButton>
</button-wrap>

<style>
	rating-table {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		align-items: start;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	movie-poster {
		width: 185px;
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
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
		transition: opacity 0.5s ease;
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 0;
		padding-top: 1rem;
		display: flex;
		justify-content: center;
		/* align with top of poster */
		margin-top: -304px;
		height: 278px;
		width: 100%;
	}

	movie-title {
		color: white;
		font-weight: bold;
		font-size: 18px;
		text-align: center;
		padding: 0 0.5rem;
	}

	poster-overlay:hover {
		opacity: 1;
	}

	button-wrap {
		margin-top: 2rem;
	}
</style>
