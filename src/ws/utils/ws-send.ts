import {WebSocketServer, OPEN} from "ws";
import {IWS} from "../../db/types";

export function sendAll(wsServer: WebSocketServer, message: string) {
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === OPEN) {
            client.send(message);
        }
    });
}

export function sendRoom(roomWsClients: IWS[], message: string) {
    roomWsClients.forEach(function each(client) {
        if (client.readyState === OPEN) {
            client.send(message);
        }
    })
}

export default {}