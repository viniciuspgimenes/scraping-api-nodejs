import { AppDataSource } from "../data-source";
import { CryptoVariation } from "../database/entities/crypto-variation";

export const CryptoVariationRepository = AppDataSource.getRepository(CryptoVariation);