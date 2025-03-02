import { DataSource } from 'typeorm';
import config from '../../../../config/config.json' with { type: 'json' };

const AppDataSource = new DataSource({
	type: 'postgres',
	host: config.db.host ?? 'localhost',
	port: Number(config.db.port ?? 5432),
	username: config.db.user,
	password: config.db.pass,
	database: config.db.name ?? 'askjs',

	entities: ['./built/entities/*.js'],
	migrations: ['./built/migrations/*.js']
});

export default AppDataSource;
