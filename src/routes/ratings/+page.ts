import type { PageLoad } from './$types';


export const load: PageLoad = async ({ url, fetch }) => {
	try {
		const response = await fetch(`/ratings`);

		if (!response.ok) {
			// Handle errors appropriately, e.g., throw an error or return a specific object
			throw new Error(`Failed to fetch ratings: ${response.statusText}`);
		}

		const data: Rating[] = await response.json();
	
		return {
			ratings: data, 
			url
		};
	} catch (error) {
		console.error('Error fetching ratings:', error);
	}
};
