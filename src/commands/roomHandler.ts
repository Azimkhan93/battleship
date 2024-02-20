import { getRandomNumber } from '../utilities/data';
import { OutLoginDataObject, OutUpdRoomDataObject, OutUpdRoomObject } from '../utilities/types';
// export const createRoom = () => {};

export const updateRoom = (userData: OutLoginDataObject | [], roomsDataArr: OutUpdRoomDataObject[]) => {
    const roomId = getRandomNumber();
    const outUpdRoomDataObject: OutUpdRoomDataObject = {
        roomId: roomId,
        roomUsers: [
            {
                name: (userData as OutLoginDataObject).name,
                index: (userData as OutLoginDataObject).index,
            },
        ],
    };


    roomsDataArr.push(outUpdRoomDataObject);
    const transferData = (userData as []).length === 0 ? [] : outUpdRoomDataObject;
    const outUpdRoomDataArrJSON: string = JSON.stringify(roomsDataArr);
    const outUpdRoomObject: OutUpdRoomObject = { type: 'update_room', data: outUpdRoomDataArrJSON, id: 0 };
    const outUpdRoomJSON: string = JSON.stringify(outUpdRoomObject);
    return outUpdRoomJSON;
};
