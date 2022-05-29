import { Server } from "socket.io";
import * as http from "http";
import { CryptoService } from "./services/crypto.service";

export class WebSocketServer {
    private io: Server;
    public cryptoService: CryptoService;

    constructor(server: http.Server) {
        this.io = new Server(server);
        this.cryptoService = new CryptoService();
    }

    public start(): void {
        this.startCryptoSocket();
        this.configureCryptoNotifications();
    }

    private startCryptoSocket() {
        this.io.on('connection', (socket) => {
            console.log(`new user connected: ${socket.id}`);
            socket.on('disconnect', () => {
                console.log(`user disconnected: ${socket.id}`);
            });
        });
    }

    private configureCryptoNotifications() {
        setInterval(async () => {
            if (this.io.sockets.sockets.size > 0) {
                const cryptosWithValue = await this.cryptoService.getAllCryptosWithCurrentValue();
                this.io.sockets.emit('cryptoValueRefresh', cryptosWithValue);
            }
        }, 1000);
    }
}
