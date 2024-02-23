import { InMessageObject, OutMessageObject, OutStartGameDataObject, Ship } from '../../utilities/types';

export const startGameHandler = (inAddShipObject: InMessageObject) => {
    const inShipsArr: Ship[] = JSON.parse(inAddShipObject.data).ships;
    const inIndexPlayer: number = JSON.parse(inAddShipObject.data).indexPlayer;

    const outStartGameDataObject: OutStartGameDataObject = {
        ships: [...inShipsArr],
        currentPlayerIndex: inIndexPlayer,
    };

    const outStartGameObject: OutMessageObject = { type: 'start_game', data: JSON.stringify(outStartGameDataObject), id: 0 };
    const outStartGameJSON: string = JSON.stringify(outStartGameObject);
    return outStartGameJSON
};
