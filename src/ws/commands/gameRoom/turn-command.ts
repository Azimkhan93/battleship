import {
  InMessageObject,
  OutCreateGameDataObject,
  OutMessageObject,
  OutUpdRoomDataObject,
  Ship
} from '../../../db/types';
import {getRandomNumber} from '../../../db/data';
import {userDb} from "../../../db/user.db";
import {roomDb} from "../../../db/room.db";
import {EVENT_TYPES} from "../../../constants/event-type.constant";

export const turnCommand = (playerId: number) => {
  const outTurnDataJSON: string = JSON.stringify({
      currentPlayer: playerId
  });
  const outTurnObject:  OutMessageObject = { type: EVENT_TYPES.TURN, data: outTurnDataJSON, id: 0 };

  return JSON.stringify(outTurnObject);
}