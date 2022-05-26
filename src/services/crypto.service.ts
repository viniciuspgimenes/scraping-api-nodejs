import { CryptoRepository } from "../repository/crypto.repository";
import { CryptoEntity } from "../database/entities/crypto.entity";
import { CreateCryptoRequest } from "../models/crypto.model";

export class CryptoService {
    public getAllCryptos = async () => await CryptoRepository.find();
    public createCrypto = async (request: CreateCryptoRequest) => {
        const crypto = new CryptoEntity();
        crypto.name = request.name;
        crypto.shortName = request.shortName;
        return CryptoRepository.insert(crypto)
            .then(() => {
                return crypto;
            })
            .catch(error => {
                return { error: error.message };
            })
    };
}