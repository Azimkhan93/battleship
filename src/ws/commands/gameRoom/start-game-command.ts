import { OutMessageObject, OutStartGameDataObject, Ship } from '../../../db/types';
import {EVENT_TYPES} from "../../../constants/event-type.constant";

export const startGameCommand = (playerId: number, shipArray: Ship[]) => {
    const outStartGameDataObject: OutStartGameDataObject = {
        ships: [...shipArray],
        currentPlayerIndex: playerId,
    };

    const outStartGameObject: OutMessageObject = { type: EVENT_TYPES.START_GAME, data: JSON.stringify(outStartGameDataObject), id: 0 };
    return JSON.stringify(outStartGameObject);
};
