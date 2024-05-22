import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	let query = url.searchParams.get('query');
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2M5YjM4NjhkNWJmMjNmMzM4ZTE3MDExOGE4ODhhMCIsInN1YiI6IjY0MDE2ZWQ0Njk5ZmI3MDA5NjAwNTAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.liZ4W1N7X0IG0tlilxUjOmoAb3tQ4mdg7i9q77UcHeA'
		}
	};

	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=e3c9b3868d5bf23f338e170118a888a0`,
		options
	);

	const movies = await res.json();

	return json(movies);
};
