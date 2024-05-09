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

	console.log(data.ratings);
</script>

<rating-table>
	{#if data.ratings}
		{#each data.ratings as rating}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<movie-poster on:click={() => goto(`/ratings/${rating.movieID}/edit`)}>
				<img
					class="poster-img"
					src={buildTMDBImgUrl(rating.movie.poster_path)}
					alt={rating.movie.title + ' poster'}
				/>

				<total-rating>{rating.totalRating}/5</total-rating>
				<movie-title>{rating.movie.title}</movie-title>
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
		width: 185px;
		display: flex;
		flex-direction: column;
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
		font-size: 32px;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

	/* total-rating {
	position: relative;
		display: flex;
		opacity: 0;
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
	} */

	movie-title {
		font-size: 16px;
		font-weight: bold;
		transition: opacity 0.5s ease;
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 0;
		color: white;
		padding-top: 1rem;
		display: flex; /* Inherit flex display from parent */
		justify-content: center;
		text-align: center;
		/* align with top of poster */
		margin-top: -310px;
		height: 278px;
		width: 100%;
	}

	movie-title:hover {
		opacity: 1;
	}
</style>
