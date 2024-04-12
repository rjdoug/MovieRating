<script lang="ts">
	import { goto } from '$app/navigation';
	import SimpleButton from '$lib/SimpleButton.svelte';
	import { userID } from '$lib/stores.js';
	import type { Categories, PostRating, TMDBMovieList } from '$lib/types.js';
	import { buildTMDBImgUrl, calcOverallRating, createEmptyRating } from '$lib/utils.js';
	import 'iconify-icon';
	import { get } from 'svelte/store';
	import { Search } from 'carbon-components-svelte';

	// data.ratings - ratings.json
	export let data;

	// These indexes are used to keep track of what category rating we are up to
	let currentIndex = 0;
	let maxIndex = data.ratings.length - 1;
	let selectedIndex = 0;

	// Rating for each category
	const ratings = createEmptyRating();

	// I'm so sorry for this
	let completed = false;

	let overallRating = 0;

	let movieSelected = false;

	// Data for current category we are up to
	$: category = data.ratings[currentIndex];

	let searchValue = 'Rick and Morty';
	let movieList: TMDBMovieList = {
		page: 1,
		results: [],
		total_pages: 1,
		total_results: 0
	};

	// Typecasting being a prick in svelte, so placing function here
	function onKeyUp(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			goto(data.url?.href + '/new');
		}
	}

	async function onSearchKeyUp(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			await searchMovies(searchValue);
		}
	}

	async function searchMovies(query: string) {
		const res = await fetch(`/movies?query=${encodeURIComponent(query)}`);
		const mList: TMDBMovieList = await res.json();
		movieList = mList;
		console.log(movieList);
	}

	/**
	 * Appends the current selected option on event into ratings variable. If final category then calculate overall rating and post
	 * @param event
	 */
	function handleSubmit(event: Event) {
		try {
			event.preventDefault();
			const formData = new FormData(event.target as HTMLFormElement);
			const selectedOption = formData.get('option') as string;

			// store selected rating (option)
			// convert to lowercase or it creates a new field
			/* TODO: this whole thing is a bit of a mess where it's relying on the json to be spelt correctly and such. 
				If it isn't it will create a new property on object. Not good */
			ratings[category.key as keyof Categories] = parseInt(selectedOption);

			// If last option
			if (currentIndex != maxIndex) currentIndex++;
			else {
				// TODO: check length of ratings is same as data.ratings. IF not then json keys are incorrect
				overallRating = calcOverallRating(data.weights, ratings);

				// need to create a new movie if it doesn't exist, get the id and continue.
				// Otherwise you need to have a way to select movie and get id that way.
				const postRating: PostRating = {
					...ratings,
					overallRating: overallRating
				};

				addRating(postRating);
			}

			// reset options selection for next page
			selectedIndex = 0;
		} catch (error: any) {
			console.error('submitting category ratings', error.message);
			throw error;
		}
	}

	async function addRating(rating: PostRating) {
		const response = await fetch(`/api/${get(userID)}/ratings`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(rating)
		});

		if (!response.ok) {
			// Handle errors gracefully
			console.error('Error creating post:', await response.text());
			return;
		}
	}
</script>

<!-- TODO: Eventually all of this crap will be moved to it's own page where /movieID/rating/edit or something of the sorts -->

{#if movieSelected}
	{#if !completed}
		<category-title>{category.category}</category-title>
		<category-description>{category.description}</category-description>
		<!-- <category-weight>{category.weight}</category-weight> -->

		<category-rating>
			<form on:submit={handleSubmit}>
				<category-options>
					{#each category.options as option, index}
						<label>
							<input
								type="radio"
								name="option"
								value={option.value}
								checked={index === selectedIndex}
								on:change={() => (selectedIndex = index)}
							/>
							{index + 1}.
							{option.label}
						</label>
					{/each}
				</category-options>
				<button type="submit">{maxIndex === currentIndex ? 'Finish' : 'Next'}</button>
			</form>
			<icon-park-outline-check-one />
		</category-rating>
	{:else}
		<!-- I think we should just have a separate page where we get query the db to get the data out. Too complex
	too try pulling the data out of our poorly formed data structures -->
		<completed-card>
			<completed-message>Rating for *movie* successfully added</completed-message>
			<completed-icon>
				<iconify-icon class="check-one" icon="icon-park-outline:check-one"></iconify-icon>
			</completed-icon>
			<completed-ratings>
				<total-rating>Total Rating: {overallRating}/5</total-rating>
			</completed-ratings>
			<navigation-buttons>
				<SimpleButton onClick={() => goto('/')} {onKeyUp}>Home</SimpleButton>
				<SimpleButton onClick={() => console.log(data.url)} {onKeyUp}>View</SimpleButton>
			</navigation-buttons>
		</completed-card>
	{/if}
{:else}
	<Search bind:value={searchValue} on:keyup={(event) => onSearchKeyUp(event)} />
	<movie-table>
		{#each movieList.results as movie}
			<movie-poster on:click={() => console.log(movie)}>
				<img
					class="poster"
					src={buildTMDBImgUrl(movie.poster_path)}
					alt={movie.title + ' poster'}
				/>
			</movie-poster>
		{/each}
	</movie-table>
{/if}

<style>
	category-title {
		font-size: 3rem;
		font-weight: bold;
		margin: 1rem 0;
	}

	category-description {
		width: 40%;
		text-align: justify;
		text-align-last: center;
		line-height: 1.3rem;
		font-size: 1.1rem;
		font-style: italic;
	}

	category-rating {
		min-width: 40%;
	}

	category-options {
		display: flex;
		flex-direction: column;
		margin: 2rem 0;
	}

	category-options > label:hover {
		background-color: #e4e4e4;
	}

	category-options > label {
		border: 1px solid rgb(202, 197, 197);
		padding: 1rem;
		cursor: pointer;
	}

	category-options > label:not(:last-child) {
		border-bottom: none;
	}

	button {
		border: 1px solid #194f92;
		border-radius: 5px;
		color: #194f92;
		background-color: transparent;
		padding: 0.7rem 1rem;
		margin: 0;
		background-color: #cbd5f0;
		cursor: pointer;
		width: 100%;
	}

	button:hover {
		background-color: #a0b0df;
		cursor: pointer;
	}

	/* Style the completed-card element */
	completed-card {
		background-color: rgb(255, 253, 253);
		border-radius: 5px;
		padding: 25px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;
	}

	/* Style the completed-message element */
	completed-message {
		font-weight: bold;
		margin-bottom: 20px;
	}

	completed-icon {
		margin-bottom: 20px;
	}

	.check-one {
		font-size: 60px;
		color: green;
	}

	/* Style the total-rating element */
	total-rating {
		display: flex;
		align-items: center;
	}

	navigation-buttons {
		display: flex;
		gap: 1rem;
		margin: 10px 0;
	}

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
