import {UserDbType} from '../../../db/types';
import {roomDb} from "../../../db/room.db";

export const addUserToRoomCommand = (
    roomId: number,
    userData: UserDbType
) => {
    const availableRoom = roomDb.getAvailableRoom(roomId);

    if (availableRoom) {
        // room has less than 2 player, so we can join as a player to the room
        const existingUserInRoom = availableRoom.roomUsers.find((user) => user.name === userData.name)

        if (!existingUserInRoom) {
            // if user is not in this room already, we add them to this room
            roomDb.addUserToRoom(roomId, {
                name: userData.name,
                index: userData.index
            });
        }
    }
};
