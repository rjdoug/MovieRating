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
			<movie-poster on:click={() => goto(`/ratings/${rating.movieID}/edit`)}>
				<img
					class="poster"
					src={buildTMDBImgUrl(rating.movie.poster_path)}
					alt={rating.movie.title + ' poster'}
				/>

				<total-rating>{rating.totalRating}/5</total-rating>
			</movie-poster>
		{/each}
	{/if}
</rating-table>

<SimpleButton onClick={() => goto(data.url?.href + '/new')} {onKeyUp}>New Rating</SimpleButton>

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
		/* Duplicating width and height so when there's an empty img then it follow constraints */
		height: 278px;
		width: 185px;
	}

	.poster {
		/* Force img to fit to 278px - Mostly the standard, but will zoom anything that doesn't fit */
		object-fit: cover;
		height: 278px;
		width: 185px;
	}

	total-rating {
		position: relative;
		display: flex;
		opacity: 0;
		/* 100% causes little line where it doesn't cover */
		top: -101%;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		color: white;
		font-size: 32px;
		align-items: center;
		justify-content: center;
		transition: opacity 0.5s ease;
		font-weight: bold;
	}

	total-rating:hover {
		opacity: 1;
	}
</style>
