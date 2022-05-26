import { DataSource } from "typeorm";
import { CryptoEntity } from "./database/entities/crypto.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "scraping",
    synchronize: true,
    logging: true,
    entities: [CryptoEntity],
    subscribers: [],
    migrations: [],
});
