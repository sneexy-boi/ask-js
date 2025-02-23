import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST ?? 'localhost',
	port: Number(process.env.DB_PORT ?? 5432),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME ?? 'askjs',

	entities: ['./built/entities/*.js'],
	migrations: ['./built/migrations/*.js']
});

export default AppDataSource;
