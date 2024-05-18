import { userID } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import type { DB_Rating, Rating, RatingAndMovie, TMDBMovie } from '$lib/types';


export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const uid = get(userID);
		const response = await fetch(`/api/${uid}/ratings`);

		if (!response.ok) {
			throw new Error(`Failed to fetch ratings: ${response.statusText}`);
		}

		const ratings: Rating[] = await response.json();

		// convert DB_Rating to Rating
		// Export to global function

		// Use categories type to pull out categories

		// Create new object using label from json and value of category



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
