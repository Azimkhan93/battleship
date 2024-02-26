import {WebSocketServer, OPEN} from "ws";

export function sendAll(wsServer: WebSocketServer, message: string) {
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === OPEN) {
            client.send(message);
        }
    });
}

export default {}