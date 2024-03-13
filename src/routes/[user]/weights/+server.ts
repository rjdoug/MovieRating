import type { RequestHandler } from '@sveltejs/kit';
import { mysqlconn } from '$lib/db/sql';

//  Gets all weights for use
export const GET: RequestHandler = async ({ params }) => {
	const [rows, columns] = await mysqlconn.query(
		`SELECT * FROM weights WHERE userID = ?;
`,
		[params.user]
	);

	return new Response(JSON.stringify(rows), {
		headers: { 'Content-Type': 'application/json' }
	});
};
