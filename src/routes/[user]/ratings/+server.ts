import type { RequestHandler } from '@sveltejs/kit';
import { mysqlconn } from '$lib/db/sql';
import type { PostRating } from '$lib/types';
import { get } from 'svelte/store';
import { userID } from '$lib/stores';

//  Gets all ratings for a user and merges movie with row cause no point without movie at this stage
// TODO: have the endpoint handle getting the userID rather than passing it in. No-one should be able to access an endpoint and specify the userID
export const GET: RequestHandler = async ({ params }) => {
	const [rows, columns] = await mysqlconn.query(
		`SELECT * FROM ratings 
    INNER JOIN movies ON ratings.movieID = movies.id
    WHERE userID = ?;
`,
		[params.user]
	);
	// Assuming rows contains the actual data
	return new Response(JSON.stringify(rows), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const data = (await request.json()) as PostRating;
	data.userID = get(userID);
	// TODO: Dummy data - need to pass in movieID
	data.movieID = 1;

	try {
		await mysqlconn.query(
			`INSERT INTO ratings (userID, movieID, originality, acting, storyline, pacing, soundtrack,
			 replay, cinematography, emotionalImpact, enjoyment, totalRating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				data.userID,
				data.movieID,
				data.originality,
				data.acting,
				data.storyline,
				data.pacing,
				data.soundtrack,
				data.replay,
				data.cinematography,
				data.emotionalImpact,
				data.enjoyment,
				data.overallRating
			]
		);

		return new Response(JSON.stringify('f'), {
			status: 201 // Created
		});
	} catch (error) {
		console.error('Error creating post:', error);
		return new Response('Error creating post', { status: 500 });
	}
};
