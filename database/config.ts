import * as dotenv from 'dotenv';
dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

export const DatabaseConfig = [
    {
        type: 'mysql',
        database: DB_NAME,
        port: parseInt(DB_PORT) || 3306,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: DB_HOST,
        socketPath: null,
        synchronize: false,
        migrationsRun: false,
        migrations: ['database/migrations/**/*{.ts,.js}'],
        cli: { migrationsDir: 'database/migrations' },
    },
    {
        name: 'seed',
        type: 'mysql',
        database: DB_NAME,
        port: parseInt(DB_PORT) || 3306,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: DB_HOST,
        socketPath: null,
        synchronize: false,
        migrationsRun: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['database/seedings/**/*{.ts,.js}'],
        cli: {
            migrationsDir: 'database/seeds',
        },
    },
];

export default DatabaseConfig;
