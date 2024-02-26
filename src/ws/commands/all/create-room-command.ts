import {getRandomNumber, indexGenerator} from '../../../db/data';
import {UserDataResponse, RoomDbType, OutUpdRoomObject, RoomUserType, UserData, UserDbType} from '../../../db/types';
import {db} from '../../../db/data';
import {jsonStringifier} from '../../utils/jsonHandler';
import {roomDb} from "../../../db/room.db";

export function createRoomCommand(userData: UserDbType): number | null {
    const existingRoomWithThisUser = roomDb.getUserFromAllRooms(userData.name);

    if (existingRoomWithThisUser) {
        return null;
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

    return newRoom.roomId;
}
