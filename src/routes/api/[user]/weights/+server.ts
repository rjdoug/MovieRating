import type { RequestHandler } from '@sveltejs/kit';
import { mysqlconn } from '$lib/db/sql';
import { categories } from '$lib/utils';

//  Gets all weights for use
export const GET: RequestHandler = async ({ params }) => {
	// Needs to be properly sanatized, but my god is it a being a bastard when I try to spread
	const [rows, columns] = await mysqlconn.query(
		`SELECT ${categories.join(', ')} FROM weights WHERE userID = ?;
`,
		[params.user]
	);

	return new Response(JSON.stringify(rows), {
		headers: { 'Content-Type': 'application/json' }
	});
};
