import { Request, Response, Router } from "express";
import { CryptoService } from "../services/crypto.service";
import { CreateCryptoRequest } from "../models/crypto.model";

export class CryptoController {
    public router: Router;
    public cryptoService: CryptoService;

    constructor() {
        this.router = Router();
        this.cryptoService = new CryptoService();
        this.configureRoutes();
    }

    public getAllCryptos = async (req: Request, res: Response) => {
        res.send(await this.cryptoService.getAllCryptos());
    }

    public createCrypto = async (req: Request, res: Response) => {
        const request = req.body as CreateCryptoRequest;
        const newCrypto = await this.cryptoService.createCrypto(request);
        res.send(newCrypto);
    }

    public configureRoutes() {
        this.router.get('/', this.getAllCryptos);
        this.router.post('/', this.createCrypto);
    }

}