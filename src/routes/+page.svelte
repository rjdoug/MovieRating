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
	@media (min-width: 481px) {
		/* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
	}
	@media (min-width: 641px) {
		/* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
	}
	@media (min-width: 961px) {
		/* tablet, landscape iPad, lo-res laptops ands desktops */
	}

	@media (min-width: 1281px) {
		/* hi-res laptops and desktops */
	}

	h1 {
		font-size: 3.5rem;
		font-weight: 600;
		font-size: var(--font-size-h1);
		margin-top: 1rem;
		color: var(--color-title-primary);
	}
	rating-table {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		align-items: start;
		margin-top: 1.5rem;
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
		/* Force img to fit to 278px - Mostly the standard, but will zoom anything that doesn't fit */
		object-fit: cover;
		height: auto;
		width: 11.5em;
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
		display: flex;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	@media (min-width: 320px) {
		/* smartphones, iPhone, portrait 480x320 phones */
		rating-table {
			justify-content: space-evenly;
		}

		movie-poster {
			margin-bottom: 16px;
		}

		.poster-img {
			object-fit: cover;
			height: auto;
			width: 11.5em;
		}
	}

	@media (min-width: 1025px) {
		/* big landscape tablets, laptops, and desktops */
		rating-table {
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
		}
	}
</style>
