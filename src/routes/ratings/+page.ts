import { userStore } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	try {
		const uid = get(userStore);
		const response = await fetch(`/${uid}/ratings`);

		if (!response.ok) {
			// Handle errors appropriately, e.g., throw an error or return a specific object
			throw new Error(`Failed to fetch ratings: ${response.statusText}`);
		}

		const ratings: Rating[] = await response.json();

		return {
			ratings: ratings,
			url
		};
	} catch (error) {
		console.error('Error fetching ratings:', error);
	}
};
