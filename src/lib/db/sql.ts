import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'Siennabusk2014',
	database: 'MovieRating'
});
