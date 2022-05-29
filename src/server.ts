import { HttpServer } from "./http-server";
import { AppDataSource } from "./data-source";
import { WebSocketServer } from "./ws-server";

AppDataSource.initialize()
    .then(() => {
        const httpServer = new HttpServer();
        const server = httpServer.start();
        const wsServer = new WebSocketServer(server);
        wsServer.start();
    })
    .catch((error) => console.log(error));
