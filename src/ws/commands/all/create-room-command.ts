import { getRandomNumber, indexGenerator } from '../../../db/data';
import { UserDataResponse, RoomDbType, OutUpdRoomObject, RoomUserType, UserData, UserDbType } from '../../../db/types';
import { db } from '../../../db/data';
import { jsonStringifier } from '../../utils/jsonHandler';
import { roomDb } from '../../../db/room.db';

export const createRoomCommand = (userData: UserDbType) => {
    const existingRoomWithThisUser = roomDb.getUserFromAllRooms(userData.name);

    if (existingRoomWithThisUser) {
        // user was found in the existing room. Thus, we just return the room information
        const foundUser = existingRoomWithThisUser.roomUsers.find((user) => user.name === userData.name);

        if (!foundUser) {
            throw Error('User not found in this room.');
        }

        const outRoomData: RoomDbType = {
            roomId: existingRoomWithThisUser.roomId,
            roomUsers: [
                {
                    name: foundUser.name,
                    index: foundUser.index,
                },
            ],
        };

        return jsonStringifier('update_room', outRoomData);
    }

    // user is not found in any room. Thus, they can create a new room
    const newRoom: RoomDbType = {
        roomId: getRandomNumber(),
        roomUsers: [
            {
                name: userData.name,
                index: indexGenerator(),
            },
        ],
    };

    roomDb.createRoom(newRoom);

    return jsonStringifier('update_room', newRoom);
};
