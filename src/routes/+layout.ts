import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	try {
		// split on each path route. Remove falsey ie ''
		let pathArr = url.pathname.split('/').filter(Boolean);

		if (!pathArr.length) pathArr = [''];

		return {
			path: pathArr
		};
	} catch (error: any) {
		// Handle the error here, you can log it or re-throw it if necessary
		console.error('Error occurred:', error.message);
		throw error; // Rethrow the error to propagate
	}
};
