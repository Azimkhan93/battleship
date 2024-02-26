import {
  InMessageObject,
  OutCreateGameDataObject,
  OutMessageObject,
  OutUpdRoomDataObject,
  Ship
} from '../../../db/types';
import { getRandomNumber } from '../../../db/data';
import {userDb} from "../../../db/user.db";
import {roomDb} from "../../../db/room.db";
import {EVENT_TYPES} from "../../../constants/event-type.constant";

export const addShipsCommand = (roomId: number, playerId: number, shipArray: Ship[]) => {
  const room = roomDb.getRoom(roomId);

  if (!room) {
      throw Error('No room found')
  }

  const isPlayer1 = playerId === room.player1?.id;
  const player1Ships = room.player1?.ships || null;
  const player2Ships = room.player2?.ships || null;

  const newPlayer1 = room.player1 ? {
      ...room.player1,
      ships: isPlayer1 ? shipArray : player1Ships
  } : undefined

  const newPlayer2 = room.player2 ? {
      ...room.player2,
      ships: !isPlayer1 ? shipArray : player2Ships
  } : undefined


  const updatedRoom = {
      player1: newPlayer1,
      player2: newPlayer2
  }

  roomDb.updateRoom(roomId, updatedRoom);

  if(updatedRoom.player1?.ships?.length && updatedRoom.player2?.ships?.length) {
      return { isBothPlayersSetUpShips: true }
  }

  return { isBothPlayersSetUpShips: false }
}