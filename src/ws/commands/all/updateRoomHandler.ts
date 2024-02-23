import { getRandomNumber } from '../../utilities/data';
import { OutUserData, RoomData, OutUpdRoomObject, RoomUser } from '../../utilities/types';

export const updateRoomHandler = (
    loggedUsers: OutUserData[],
    roomsDataArr: RoomData[],
    roomUsers: RoomUser[],
    roomId: number | null
) => {
    roomsDataArr = roomsDataArr.filter((roomData) => {
        roomData.roomUsers.length === 2;
    });

    roomUsers = [];

    roomUsers = roomsDataArr.flatMap((roomData) => roomData.roomUsers);
    let userData: OutUserData | null;

    userData = loggedUsers[loggedUsers.length - 1];

    if (typeof roomId === 'number') {
        const outUpdRoomDataObject: RoomData = {
            roomId: roomId,
            roomUsers: [
                {
                    name: userData.name,
                    index: userData.index,
                },
            ],
        };
        roomsDataArr.push(outUpdRoomDataObject);
    }

    console.log('roomdataarr: ', roomsDataArr);
    const outUpdRoomDataArrJSON: string = JSON.stringify(roomsDataArr);
    const outUpdRoomObject: OutUpdRoomObject = { type: 'update_room', data: outUpdRoomDataArrJSON, id: 0 };
    const outUpdRoomJSON: string = JSON.stringify(outUpdRoomObject);
    return outUpdRoomJSON;
};
