import { DataSource } from "typeorm"

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST || 'localhost',
                port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
                username: process.env.POSTGRES_USER || 'user',
                password: process.env.POSTGRES_PASSWORD || 'password',
                database: process.env.POSTGRES_DB || 'teddy_db',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: process.env.NODE_ENV !== 'production',
            })
            return dataSource.initialize();
        }
    }
]