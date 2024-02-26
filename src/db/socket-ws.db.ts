import {IWS} from "./types";

export class SocketWsDb {
    private socketWs: Record<string, IWS> = {};

    getClientWs(socketId: string) {
        return this.socketWs[socketId];
    }

    addWebSocketClient(socketId: string, websocketClient: IWS) {
        // first client joins in the room
        this.socketWs = {
            ...this.socketWs,
            [socketId]: websocketClient
        }

        return this.socketWs;
    }
}

export const socketWsDb = new SocketWsDb()