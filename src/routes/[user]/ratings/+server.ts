import type { RequestHandler } from '@sveltejs/kit';
import { mysqlconn } from '$lib/db/sql';

//  Gets all ratings for a user and merges movie with row cause no point without movie at this stage
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
