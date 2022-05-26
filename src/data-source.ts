import { DataSource } from "typeorm";
import { Crypto } from "./database/entities/crypto";
import { CryptoVariation } from "./database/entities/crypto-variation";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "scraping",
    synchronize: true,
    logging: true,
    entities: [Crypto, CryptoVariation],
    subscribers: [],
    migrations: [],
});
