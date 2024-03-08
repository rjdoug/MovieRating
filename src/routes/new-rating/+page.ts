import type { PageLoad } from './$types';
import data from '$lib/data/ratings.json';

export const load: PageLoad = async () => {
	console.log(data);
};
