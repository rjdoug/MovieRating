import { json, type RequestHandler } from '@sveltejs/kit';
import { mysqlconn } from '$lib/db/sql';
import type { PostRating } from '$lib/types';
import { get } from 'svelte/store';
import { userID } from '$lib/stores';

//  Gets all ratings for a user and merges movie with row cause no point without movie at this stage
// TODO: have the endpoint handle getting the userID rather than passing it in. No-one should be able to access an endpoint and specify the userID
export const GET: RequestHandler = async ({ params }) => {
	const [rows, columns] = await mysqlconn.query(
		`SELECT * FROM ratings 
	    WHERE userID = ?;
`,
		[params.user]
	);
	return json(rows);
};

export const POST: RequestHandler = async ({ request }) => {
	const data = (await request.json()) as PostRating;
	data.userID = get(userID);
	// Check if a rating already exists for this user and movie
	const existingRating = await mysqlconn.query(
		`SELECT * FROM ratings WHERE userID = ? AND movieID = ?`,
		[data.userID, data.movieID]
	);

	try {
		// check if rows are zero - [0] is row dummy
		if (existingRating[0].length === 0) {
			// Insert new rating if it doesn't exist
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
			return new Response(JSON.stringify('Rating added'), {
				status: 201 // Created
			});
		} else {
			// Update existing rating
			await mysqlconn.query(
				`UPDATE ratings SET originality = ?, acting = ?, storyline = ?, pacing = ?, soundtrack = ?,
                 replay = ?, cinematography = ?, emotionalImpact = ?, enjoyment = ?, totalRating = ?
                 WHERE userID = ? AND movieID = ?`,
				[
					data.originality,
					data.acting,
					data.storyline,
					data.pacing,
					data.soundtrack,
					data.replay,
					data.cinematography,
					data.emotionalImpact,
					data.enjoyment,
					data.overallRating,
					data.userID,
					data.movieID
				]
			);
			return new Response(JSON.stringify('Rating updated'), {
				status: 200 // OK
			});
		}
	} catch (error) {
		console.error('Error adding/updating rating:', error);
		return new Response('Error adding/updating rating', { status: 500 });
	}
};
