import { CryptoEntity } from "../database/entities/crypto.entity";
import { AppDataSource } from "../data-source";

export const CryptoRepository = AppDataSource.getRepository(CryptoEntity);