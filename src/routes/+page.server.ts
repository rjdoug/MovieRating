import { userID } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import type { DB_Rating, RatingAndMovie, TMDBMovie } from '$lib/types';
import { transformRating } from '$lib/utils';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const uid = get(userID);
		const response = await fetch(`/api/${uid}/ratings`);

		if (!response.ok) {
			throw new Error(`Failed to fetch ratings: ${response.statusText}`);
		}

		const dbRatings: DB_Rating[] = await response.json();

		const ratings = await transformRating(dbRatings);

		// Merge rating and movie ito one
		const ratingsAndMovie: RatingAndMovie[] = await Promise.all(
			ratings.map(async (rating) => {
				const response = await fetch(`/api/movies/${rating.movieID}`);
				if (!response.ok) console.error(`cannot find movie: ${rating.movieID}`);

				const movie: TMDBMovie = await response.json();

				return {
					...rating,
					movie
				};
			})
		);

		return {
			ratings: ratingsAndMovie
		};
	} catch (error) {
		console.error('Error fetching ratings:', error);
		throw error;
	}
};
