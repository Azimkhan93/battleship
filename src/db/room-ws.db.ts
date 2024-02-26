import {IWS} from "./types";

export class RoomWsDb {
    private roomWsMap: Record<string, IWS[]> = {};

    getClientListInRoom(roomId: number) {
        return this.roomWsMap[roomId];
    }

    addWebSocketClientToRoom(roomId: number, websocketClient: IWS) {
        // add websocket client to the object.
        // Ideally, maximum clients in one room can be up to 2
        if (this.roomWsMap[roomId]) {
            // when we already have one client in the room, we add the second one
            const updatedRoom = [...this.roomWsMap[roomId], websocketClient]
            const updatedRoomWithUniqueClients = new Set(updatedRoom);
            const updatedRoomArray = Array.from(updatedRoomWithUniqueClients);

            this.roomWsMap = {
                ...this.roomWsMap,
                [roomId]: updatedRoomArray
            }

            return this.roomWsMap;
        }


        // first client joins in the room
        this.roomWsMap = {
            ...this.roomWsMap,
            [roomId]: [websocketClient]
        }

        return this.roomWsMap;
    }
}

export const roomWsDb = new RoomWsDb()