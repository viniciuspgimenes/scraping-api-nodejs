import { CryptoRepository } from "../repository/crypto.repository";
import { Crypto } from "../database/entities/crypto";
import { CreateCryptoRequest } from "../models/crypto.model";
import { CryptoVariationRepository } from "../repository/crypto-variation.repository";
import { CryptoVariation } from "../database/entities/crypto-variation";
import { CreateCryptoVariationRequest } from "../models/crypto-variation.model";

export class CryptoService {
    public getAllCryptos = async () => await CryptoRepository.find();
    public findCrypto = async (cryptoId: number) => {
        const crypto = (await CryptoRepository.find({ where: { id: cryptoId }, relations: ["variations"] })).pop();
        if (!crypto) {
            return { error: "Crypto not found" };
        }
        return crypto;
    }
    public createCrypto = async (request: CreateCryptoRequest) => {
        const crypto = new Crypto();
        crypto.name = request.name;
        crypto.shortName = request.shortName;
        crypto.createdAt = Date.now();
        return CryptoRepository.insert(crypto)
            .then(() => {
                return crypto;
            })
            .catch(error => {
                return { error: error.message };
            });
    };
    public createCryptoVariation = async (cryptoId: number, request: CreateCryptoVariationRequest) => {
        const crypto = (await CryptoRepository.find({ where: { id: cryptoId } })).pop();
        if (!crypto) {
            return { error: "Crypto not found" };
        }
        const variation = new CryptoVariation();
        variation.value = request.value;
        variation.extractedAt = request.extractedAt;
        variation.createdAt = Date.now();
        variation.crypto = crypto;
        return CryptoVariationRepository.insert(variation)
            .then(() => {
                return variation;
            })
            .catch(error => {
                return { error: error.message };
            });
    };

    public getAllCryptoVariations = async (cryptoId: number) => {
        const crypto = (await CryptoRepository.find({
            where: { id: cryptoId },
            relations: ["variations"]
        })).pop();
        if (!crypto) {
            return { error: "Crypto not found" };
        }
        return (await CryptoVariationRepository.find({ where: { crypto } }));
    }

    async getAllCryptosWithCurrentValue() {
        const query = `
            SELECT DISTINCT ON (c.id) c.id, c.name, c."shortName", cv.value
            FROM crypto c
                     JOIN crypto_variation cv
                          ON c.id = cv."cryptoId"
            ORDER BY c.id, cv."createdAt" DESC
        `;
        return await CryptoRepository.query(query);
    }
}