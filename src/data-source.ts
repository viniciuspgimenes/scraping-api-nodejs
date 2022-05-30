import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Crypto } from "./database/entities/crypto";
import { CryptoVariation } from "./database/entities/crypto-variation";

dotenv.config({ path: __dirname + '/../.env' });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Crypto, CryptoVariation],
    subscribers: [],
    migrations: [],
});
