import {  InMessageObject, OutCreateGameDataObject, OutMessageObject, OutUpdRoomDataObject } from '../../utilities/types';
import { getRandomNumber } from '../../utilities/data';
export const addUserHandler = (inAddUserObject: InMessageObject, roomsDataArr: OutUpdRoomDataObject[]) => {
const inIndexRoom: number = JSON.parse(inAddUserObject.data).indexRoom;
const idGame: number = getRandomNumber();
const idPlayer: number = getRandomNumber();

const outCreateGameDataObject: OutCreateGameDataObject = {
  idGame: idGame,
  idPlayer: idPlayer,
};


const outCreateGameDataJSON: string = JSON.stringify(outCreateGameDataObject);
const outCreateGameObject:  OutMessageObject = { type: 'create_game', data: outCreateGameDataJSON, id: 0 };
const outCreateGameJSON: string = JSON.stringify(outCreateGameObject);

roomsDataArr = roomsDataArr.filter((room)=> room.roomId !== inIndexRoom)
console.log(roomsDataArr)
return outCreateGameJSON;
}