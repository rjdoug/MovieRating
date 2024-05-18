import { userID } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import type { DB_Rating, RatingAndMovie, TMDBMovie } from '$lib/types';
import categories from '$lib/data/ratings.json';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const uid = get(userID);
		let response = await fetch(`/api/${uid}/ratings/${params.movieID}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch rating: ${response.statusText}`);
		}

		const ratings: DB_Rating[] = await response.json();
		if (ratings.length > 1)
			console.error(
				`Was meant to receive a single rating, but got multiple. User: ${uid}, Movie: ${params.movieID}`
			);
		if (ratings.length < 1)
			throw Error(`No rating returned for user: ${uid} and movie ${params.movieID}`);

		response = await fetch(`/api/movies/${ratings[0].movieID}`);
		if (!response.ok) throw new Error(`cannot find movie: ${ratings[0].movieID}`);

		const movie: TMDBMovie = await response.json();

		return {
			rating: {
				...ratings[0],
				movie
			} as RatingAndMovie,
			categories
		};
	} catch (error: unknown) {
		console.error('Error fetching rating:', error);
		throw error;
	}
};
