import { Request, Response, Router } from "express";
import { CryptoService } from "../services/crypto.service";
import { CreateCryptoRequest } from "../models/crypto.model";
import { CreateCryptoVariationRequest } from "../models/crypto-variation.model";

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

    public findCrypto = async (req: Request, res: Response) => {
        const cryptoId = req.params.id as unknown as number;
        res.send(await this.cryptoService.findCrypto(cryptoId));
    }

    public createCrypto = async (req: Request, res: Response) => {
        const request = req.body as CreateCryptoRequest;
        const newCrypto = await this.cryptoService.createCrypto(request);
        res.send(newCrypto);
    }

    public createCryptoVariation = async (req: Request, res: Response) => {
        const cryptoId = req.params.id as unknown as number;
        const request = req.body as CreateCryptoVariationRequest;
        const newCrypto = await this.cryptoService.createCryptoVariation(cryptoId, request);
        res.send(newCrypto);
    }

    public getAllCryptoVariations = async (req: Request, res: Response) => {
        const cryptoId = req.params.id as unknown as number;
        const cryptoWithVariations = await this.cryptoService.getAllCryptoVariations(cryptoId);
        res.send(cryptoWithVariations);
    }

    public configureRoutes() {
        this.router.get('/', this.getAllCryptos);
        this.router.post('/', this.createCrypto);
        this.router.get('/:id', this.findCrypto);
        this.router.get('/:id/variations', this.getAllCryptoVariations);
        this.router.post('/:id/variations', this.createCryptoVariation);
    }

}