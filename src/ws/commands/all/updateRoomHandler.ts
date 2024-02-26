import { getRandomNumber, indexGenerator } from '../../utilities/data';
import { OutUserData, RoomData, OutUpdRoomObject, RoomUser, UserData } from '../../utilities/types';
import { db } from '../../utilities/data';
import { jsonStringifier } from '../../utilities/jsonHandler';

export const updateRoomHandler = (

) => {
    let outData = '';
    db.rooms.filter((room) => room.roomUsers.length < 2);
    db.rooms.forEach((room) => {
        outData = jsonStringifier('update_room', room);
        console.log('outData', outData);
        return outData;
    });
    return outData;
};


export const createRoom = () => {
    db.users.forEach()
}