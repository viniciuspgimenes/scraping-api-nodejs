import { Crypto } from "../database/entities/crypto";
import { AppDataSource } from "../data-source";

export const CryptoRepository = AppDataSource.getRepository(Crypto);