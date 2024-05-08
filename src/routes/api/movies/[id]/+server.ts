import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2M5YjM4NjhkNWJmMjNmMzM4ZTE3MDExOGE4ODhhMCIsInN1YiI6IjY0MDE2ZWQ0Njk5ZmI3MDA5NjAwNTAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.liZ4W1N7X0IG0tlilxUjOmoAb3tQ4mdg7i9q77UcHeA'
			}
		};

		const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}`, options);

		if (!response.ok) {
			throw new Error(`Failed to fetch movie. Status: ${response.status}`);
		}

		// Redefine response so headers are what we expect
		const movie = await response.json();
		// Create a Response object and return it
		return new Response(JSON.stringify(movie), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error: unknown) {
		console.error('Error occurred while getting movie from TMDB', error);
		// Create a Response object for the error
		return new Response('Failed to fetch movie from TMDB', { status: 500 });
	}
};
