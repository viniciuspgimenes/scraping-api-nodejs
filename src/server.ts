import express, { Request, Response } from 'express';
import { CryptoController } from "./controllers/crypto.controller";
import { createConnection } from "typeorm";
import { AppDataSource } from "./data-source";
import { CryptoEntity } from "./database/entities/crypto.entity";

class Server {
    private cryptoController: CryptoController;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configureServer();
        this.cryptoController = new CryptoController();
        this.configureRoutes();
    }

    /**
     * Method to configure the server.
     */
    private configureServer() {
        this.app.set('port', process.env.PORT || 3000);
    }

    /**
     * Method to configure the routes.
     */
    private configureRoutes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });
        this.app.use('/api/cryptos', this.cryptoController.router);
    }

    /**
     * Method used to start the server
     */
    public start() {
        const port = this.app.get('port');
        this.app.listen(port, () => {
            console.log(`Server is listening on port ${port}.`)
        });
    }
}

AppDataSource.initialize()
    .then(() => {
        const server = new Server();
        server.start();
    })
    .catch((error) => console.log(error));
