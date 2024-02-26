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

export const attackCommand = (playerId: number, ships: Ship[]) => {

}