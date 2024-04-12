import type { PageLoad } from './$types';
import ratings from '$lib/data/ratings.json';
import { userID } from '$lib/stores';
import { get } from 'svelte/store';
import type { Weight } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/${get(userID)}/weights`);
	const weights: Weight[] = await response.json();

	if (weights.length < 1) {
		throw console.error('No weights found');
	} else if (weights.length > 1) {
		console.error('More that 1 lot of weightings found. Selecting 0 index');
	}

	return {
		ratings,
		weights: weights[0]
	};
};
