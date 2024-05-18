import { userID } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import type { DB_Rating, Rating, RatingAndMovie, TMDBMovie } from '$lib/types';
import categories from '$lib/data/ratings.json';
import { transformRating } from '$lib/utils';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const uid = get(userID);
		let response = await fetch(`/api/${uid}/ratings/${params.movieID}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch rating: ${response.statusText}`);
		}

		const dbRatings: DB_Rating[] = await response.json();
		if (dbRatings.length > 1)
			console.error(
				`Was meant to receive a single rating, but got multiple. User: ${uid}, Movie: ${params.movieID}`
			);
		if (dbRatings.length < 1)
			throw Error(`No rating returned for user: ${uid} and movie ${params.movieID}`);

		//  Get movie details of rating
		response = await fetch(`/api/movies/${dbRatings[0].movieID}`);
		if (!response.ok) throw new Error(`cannot find movie: ${dbRatings[0].movieID}`);

		const movie: TMDBMovie = await response.json();

		// Transform rating into frontend format
		const ratings = await transformRating(dbRatings);

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
