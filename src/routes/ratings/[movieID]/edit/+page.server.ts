import type { PageServerLoad } from './$types';
import ratings from '$lib/data/ratings.json';
import { userID } from '$lib/stores';
import { get } from 'svelte/store';
import type { TMDBMovie, Weight } from '$lib/types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	let response = await fetch(`/api/${get(userID)}/weights`);
	const weights: Weight[] = await response.json();

	response = await fetch(`/api/movies/${params.movieID}`);
	const movie: TMDBMovie = await response.json();

	if (weights.length < 1) {
		throw console.error('No weights found');
	} else if (weights.length > 1) {
		console.error('More that 1 lot of weightings found. Selecting 0 index');
	}

	if (!parseInt(params.movieID)) throw console.error('Parsing movieID');

	return {
		ratings,
		weights: weights[0],
		movie: movie
	};
};
