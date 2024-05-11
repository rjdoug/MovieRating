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
