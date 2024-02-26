import { getRandomNumber, indexGenerator } from '../../../db/data';
import { UserDataResponse, RoomDbType, OutUpdRoomObject, RoomUserType, UserData } from '../../../db/types';
import { db } from '../../../db/data';
import { jsonStringifier } from '../../utils/jsonHandler';
import {roomDb} from "../../../db/room.db";
import {EVENT_TYPES} from "../../../constants/event-type.constant";

export const updateRoomCommand = () => {
   const availableRooms = roomDb.getAvailableRooms();

   return jsonStringifier(EVENT_TYPES.UPDATE_ROOM, availableRooms);
};


export const createRoom = () => {
    // db.users.forEach()
}