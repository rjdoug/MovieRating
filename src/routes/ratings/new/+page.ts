import type { PageLoad } from './$types';
import ratings from '$lib/data/ratings.json';
import { userID } from '$lib/stores';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/${get(userID)}/weights`);
	const weights: Weight[] = await response.json();

	return {
		ratings,
		weights
	};
};
