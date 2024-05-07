<script lang="ts">
	import { goto } from '$app/navigation';
	import type { TMDBMovieList } from '$lib/types.js';
	import { buildTMDBImgUrl } from '$lib/utils.js';
	import { Search } from 'carbon-components-svelte';
	import 'iconify-icon';

	// data.ratings - ratings.json
	export let data;

	let searchValue = 'Rick and Morty';
	let movieList: TMDBMovieList = {
		page: 1,
		results: [],
		total_pages: 1,
		total_results: 0
	};


	// Calls searchMovie when Enter key is hit
	async function onSearchKeyUp(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			movieList = await searchMovies(searchValue);
		}
	}

	/**
	 * Searches for media against TMDB and updates movieList
	 * 
	 * @param {string }query The search string
	 * @returns {TMDBMovieList} Movie list 
	 */
	async function searchMovies(query: string) {
		const res = await fetch(`/movies?query=${encodeURIComponent(query)}`);
		const mList: TMDBMovieList = await res.json();
		return mList;
	}

	
</script>

<Search bind:value={searchValue} on:keyup={(event) => onSearchKeyUp(event)} />
<movie-table>
	{#each movieList.results as movie}
		<movie-poster on:click={() => goto(`/ratings/${movie.id}/edit`)}>
			<img class="poster" src={buildTMDBImgUrl(movie.poster_path)} alt={movie.title + ' poster'} />
		</movie-poster>
	{/each}
</movie-table>

<style>
	

	movie-table {
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

	.poster:hover {
		opacity: 0.6;
		cursor: pointer;
	}
</style>
