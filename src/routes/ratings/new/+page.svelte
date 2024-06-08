<script lang="ts">
	import { goto } from '$app/navigation';
	import MovieTable from '$lib/MovieTable.svelte';
	import type { TMDBMovieList } from '$lib/types.js';
	import { buildTMDBImgUrl } from '$lib/utils.js';
	import { Search } from 'carbon-components-svelte';
	import 'iconify-icon';

	let searchValue = '';
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
	 * @param {string} query The search string
	 * @returns {TMDBMovieList} Movie list
	 */
	async function searchMovies(query: string) {
		const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
		const mList: TMDBMovieList = await res.json();
		return mList;
	}
</script>

<Search bind:value={searchValue} on:keyup={(event) => onSearchKeyUp(event)} />
<MovieTable
	data={{ movies: movieList.results.map((movie) => ({ movie })), onSelectPath: '/ratings/*/edit' }}
>
	<empty-table>
		<h2>No Movies Found</h2>
		<p>Search for a movie to find some</p>
	</empty-table>
</MovieTable>

<style>
	empty-table {
		text-align: center;
	}
</style>
