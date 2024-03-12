import type { RequestHandler } from '@sveltejs/kit';
import { mysqlconn } from '$lib/db/sql';

export const GET: RequestHandler = async () => {
    const [rows, columns] = await mysqlconn.query('SELECT * FROM ratings');

    // Assuming rows contains the actual data
    return new Response(JSON.stringify(rows), {
        headers: { 'Content-Type': 'application/json' },
    });
};
