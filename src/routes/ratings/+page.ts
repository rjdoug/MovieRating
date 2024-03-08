import type { PageLoad } from './$types';
import ratings from '$lib/data/ratings.json';

export const load: PageLoad = async ({ url }) => {
	return {
		url,
		ratings
	};
};
