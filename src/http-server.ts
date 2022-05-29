import { CryptoController } from "./controllers/crypto.controller";
import express from "express";
import cors from "cors";
import * as http from "http";

export class HttpServer {
    private readonly app: express.Application;
    private readonly server: http.Server;

    constructor() {
        const express = require('express');
        this.app = express();
        this.server = http.createServer(this.app);
        this.configureServer();
        this.configureRoutes();
    }

    /**
     * Method to configure the server.
     */
    private configureServer() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    /**
     * Method to configure the routes.
     */
    private configureRoutes() {
        const cryptoController = new CryptoController();
        this.app.use('/api/cryptos', cryptoController.router);
    }

    /**
     * Method used to start the server
     */
    public start(): http.Server {
        const port = process.env.HTTP_PORT || 8000;
        this.server.listen(port, () => {
            console.log(`listening on *:${port}`);
        });
        return this.server;
    }
}