import { userID } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import type { MovieRating } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const uid = get(userID);
		const response = await fetch(`/${uid}/ratings`);

		if (!response.ok) {
			throw new Error(`Failed to fetch ratings: ${response.statusText}`);
		}

		const ratings: MovieRating[] = await response.json();

		return {
			ratings: ratings
		};
	} catch (error) {
		console.error('Error fetching ratings:', error);
		throw error;
	}
};
