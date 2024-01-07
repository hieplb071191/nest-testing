import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const datasource: DataSourceOptions= {
	type: 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: Number(process.env.POSTGRES_PORT) || 5432,
	username: process.env.POSTGRES_USER || 'postgres',
	password: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : '0711',
	database: process.env.POSTGRES_DB || 'nest-testing',
	entities: ['dist/models/*.entity{.ts,.js}'],
	synchronize: false,
};

export default new DataSource({...datasource,migrations: ["dist/migrations/*{.ts,.js}"], migrationsRun: true})

