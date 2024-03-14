import { userID } from '$lib/stores';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, fetch }) => {
	try {
		// split on each path route. Remove falsey ie ''
		let pathArr = url.pathname.split('/').filter(Boolean);

		// empty path if none
		if (!pathArr.length) pathArr = [''];

		// Add userID to store for use later
		// DEV: manually provided but in future will work get after authentication
		userID.set(1);

		return {
			path: pathArr
		};
	} catch (error: any) {
		// Handle the error here, you can log it or re-throw it if necessary
		console.error('Error occurred:', error.message);
		throw error;
	}
};
