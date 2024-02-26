import {PlayerType, RoomDbType, RoomUserType, Ship, UserDbType} from "./types";

class RoomDb {
    private rooms: RoomDbType[] = []

    getAvailableRooms(): RoomDbType[] {
        return this.rooms.filter((room: RoomDbType) => room.roomUsers.length < 2);
    }

    getAvailableRoom(roomId: number): RoomDbType | undefined {
        return this.rooms.find((room: RoomDbType) => (
            room.roomId === roomId &&
            room.roomUsers.length < 2
        ));
    }

    getRoom(roomId: number): RoomDbType | undefined {
        return this.rooms.find((room: RoomDbType) => room.roomId === roomId);
    }

    getRoomList(): RoomDbType[] {
        return this.rooms;
    }

    createRoom(room: RoomDbType): RoomDbType {
        this.rooms.push(room);
        return room;
    }

    setRoomPlayers(roomId: number, player1: PlayerType, player2: PlayerType, gameId: number): void {
        this.rooms = this.rooms.map(room => {
            if (room.roomId === roomId) {
                return {
                    ...room,
                    player1,
                    player2,
                    gameId
                }
            }

            return room;
        })
    }

    updateRoom(roomId: number, updatedRoom: Partial<RoomDbType>) {
        this.rooms = this.rooms.map(room => {
            if (room.roomId === roomId) {
                return {
                    ...room,
                    ...updatedRoom
                }
            }

            return room;
        });
    }
    getUserFromRoom(roomId: number, userName: string): RoomUserType | null {
        const room = this.rooms.find(room => roomId === room.roomId);
        if (!room) {
            // roomId is not valid. Room is not found
            return null;
        }

        const user = room.roomUsers.find(user => userName === user.name);

        return user || null
    }

    getUserListFromRoom(roomId: number): RoomUserType[] | null {
        const room = this.rooms.find(room => roomId === room.roomId);
        if (!room) {
            // roomId is not valid. Room is not found
            return null;
        }

        return room.roomUsers;
    }

    getUserFromAllRooms(userName: string): RoomDbType | null {
        for (const room of this.rooms) {
            if (room.roomUsers.find(user => userName === user.name)) {
                return room;
            }
        }

        return null;
    }

    addUserToRoom(roomId: number, user: RoomUserType) {
        this.rooms = this.rooms.map((room: RoomDbType) => {
            if (room.roomId) {
                const newRoomUsers = [...room.roomUsers, user]

                return {...room, roomUsers: newRoomUsers}
            }

            return room;
        })
    }

    getRoomBySocketId(socketId: string) {
        const room = this.rooms.find(room => {
            return room.player1?.socket === socketId || room.player2?.socket === socketId
        })

        return room
    }
}


export const roomDb = new RoomDb()