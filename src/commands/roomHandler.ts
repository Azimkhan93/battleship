import { getRandomNumber } from '../utilities/data';
import { OutLoginDataObject, OutUpdRoomDataObject, OutUpdRoomObject } from '../utilities/types';
// export const createRoom = () => {};

export const updateRoom = (roomUsers: OutLoginDataObject[], roomsDataArr: OutUpdRoomDataObject[]) => {
    const roomId: number = getRandomNumber();
    let userData: OutLoginDataObject | null;
    
    if (roomUsers.length !== 0) {
        userData = roomUsers[roomUsers.length - 1];
        const outUpdRoomDataObject: OutUpdRoomDataObject = {
            roomId: roomId,
            roomUsers: [
                {
                    name: userData.name,
                    index: userData.index,
                },
            ],
        };
        roomsDataArr.push(outUpdRoomDataObject);
    } else {
        userData = null;
    }
    console.log('roomdataarr: ', roomsDataArr);
    const outUpdRoomDataArrJSON: string = JSON.stringify(roomsDataArr);
    const outUpdRoomObject: OutUpdRoomObject = { type: 'update_room', data: outUpdRoomDataArrJSON, id: 0 };
    const outUpdRoomJSON: string = JSON.stringify(outUpdRoomObject);
    return outUpdRoomJSON;
};
