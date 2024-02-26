import {
  InMessageObject,
  OutCreateGameDataObject,
  OutMessageObject,
  OutUpdRoomDataObject,
  PlayerType
} from '../../../db/types';
import { getRandomNumber } from '../../../db/data';
import {userDb} from "../../../db/user.db";
import {roomDb} from "../../../db/room.db";
import {EVENT_TYPES} from "../../../constants/event-type.constant";

export const createGameCommand = (roomId: number) => {
  const idGame: number = getRandomNumber();
  const idPlayer1: number = getRandomNumber();
  const idPlayer2: number = getRandomNumber();

  const outCreateGameDataArray: OutCreateGameDataObject[] = [
    {
      idGame: idGame,
      idPlayer: idPlayer1,
    },
    {
      idGame: idGame,
      idPlayer: idPlayer2,
    }
  ]

  const usersInRoom = roomDb.getUserListFromRoom(roomId);

  if(!usersInRoom) {
    throw Error('No users in room')
  }

  const firstUserName = usersInRoom[0].name;
  const secondUserName = usersInRoom[1].name;

  const firstUser = userDb.getUser(firstUserName)
  const secondUser = userDb.getUser(secondUserName)

  const player1 :PlayerType = {
    id: idPlayer1,
    socket: firstUser?.socket || '',
    ships: null
  }

  const player2: PlayerType = {
    id: idPlayer2,
    socket: secondUser?.socket || '',
    ships: null
  }

  roomDb.setRoomPlayers(roomId, player1, player2, idGame);

  const outCreateGameDataPlayer1JSON: string = JSON.stringify(outCreateGameDataArray[0]);
  const outCreateGameDataPlayer2JSON: string = JSON.stringify(outCreateGameDataArray[1]);

  const outCreateGamePlayer1Object:  OutMessageObject = { type: EVENT_TYPES.CREATE_GAME, data: outCreateGameDataPlayer1JSON, id: 0 };
  const outCreateGamePlayer2Object:  OutMessageObject = { type: EVENT_TYPES.CREATE_GAME, data: outCreateGameDataPlayer2JSON, id: 0 };

  const outCreateGamePlayer1JSON: string = JSON.stringify(outCreateGamePlayer1Object);
  const outCreateGamePlayer2JSON: string = JSON.stringify(outCreateGamePlayer2Object);


  return {
    outCreateGamePlayer1JSON,
    outCreateGamePlayer2JSON,
    socket1: firstUser?.socket || '',
    socket2: secondUser?.socket || '',
  }
}