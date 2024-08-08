// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

import { Mysql2Adapter } from '@lucia-auth/adapter-mysql';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'Siennabusk2014',
	database: 'MovieRating'
});

const adapter = new Mysql2Adapter(pool, {
	user: 'user',
	session: 'user_session'
});

// Initialize Lucia
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
});

// Type augmentation for Lucia
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
