import { Client } from '../app/entities/Client';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'facul_api-mysql',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [Client],
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: []
});
