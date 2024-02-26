import { getRandomNumber, indexGenerator } from '../../utilities/data';
import { OutUserData, RoomData, OutUpdRoomObject, RoomUser, UserData } from '../../utilities/types';
import { db } from '../../utilities/data';
import { jsonStringifier } from '../../utilities/jsonHandler';

export const updateRoomHandler = (
    userData: UserData
    // loggedUsers: OutUserData[],
    // roomsDataArr: RoomData[],
    // roomUsers: RoomUser[],
    // roomId: number | null
) => {
    // roomsDataArr = roomsDataArr.filter((roomData) => {
    //     roomData.roomUsers.length === 2;
    // });
    let outData = '';
    db.rooms.filter((room) => room.roomUsers.length < 2);
    db.rooms.forEach((room) => {
        if (room.roomUsers.find((user) => user.name === userData.name)) {
            const foundUser = room.roomUsers.find((user) => user.name === userData.name) as RoomUser;
            const outRoomData: RoomData = {
                roomId: room.roomId,
                roomUsers: [
                    {
                        name: foundUser.name,
                        index: foundUser.index,
                    },
                ],
            };
            outData = jsonStringifier('update_room', outRoomData);
            console.log('outData', outData);
            return outData;
        } else {
            const outRoomData: RoomData = {
                roomId: getRandomNumber(),
                roomUsers: [
                    {
                        name: userData.name,
                        index: indexGenerator(),
                    },
                ],
            };

            db.rooms.push(outRoomData);
            console.log('roomdb', db);
            outData = jsonStringifier('update_room', outRoomData);
            console.log('outData', outData);
            return outData;
        }
    });
    return outData;
};
