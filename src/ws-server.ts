import { Server } from "socket.io";
import * as http from "http";

export class WebSocketServer {
    private io: Server;

    constructor(server: http.Server) {
        this.io = new Server(server);
    }

    public start(): void {
        this.io.on('connection', (socket) => {
            console.log('a user connected');
            socket.broadcast.emit('hi');
            socket.on('chat message', (msg) => {
                console.log('message: ' + msg);
            });
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}
