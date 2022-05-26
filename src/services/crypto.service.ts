import { CryptoRepository } from "../repository/crypto.repository";

export class CryptoService {
    public getAllCryptos = async () => await CryptoRepository.find();
}