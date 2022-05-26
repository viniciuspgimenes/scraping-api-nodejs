import "reflect-metadata"
import { Request, Response, Router } from "express";
import { CryptoService } from "../services/crypto.service";

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

    public configureRoutes() {
        this.router.get('/', this.getAllCryptos);
    }

}