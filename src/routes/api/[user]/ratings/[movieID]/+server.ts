import { mysqlconn } from '$lib/db/sql';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const [rows, columns] = await mysqlconn.query(
		`SELECT * FROM ratings
        WHERE userID = ?
        AND movieID = ?;
`,
		[params.user, params.movieID]
	);
	return json(rows);
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const result = await mysqlconn.query(`DELETE FROM ratings WHERE userID = ? AND movieID = ?`, [
			params.user,
			params.movieID
		]);

		// Check for successful deletion (affected rows)
		if (result.affectedRows === 0) {
			throw new Error(`No ratings found for user ${params.user} and movie ${params.movieID}`);
		}

		return new Response('Sucessfully deleted rating', { status: 204 });
	} catch (error: unknown) {
		console.error('Error deleting rating:', error);
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}
};
