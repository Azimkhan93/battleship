import { InMessageObject, OutMessageObject, OutUpdWinnerDataObject } from '../../../db/types';

export const updateWinnersCommand = (inLoginObject: InMessageObject, winnerData: OutUpdWinnerDataObject[]) => {
    const inName: string = JSON.parse(inLoginObject.data).name;
    const outUpdWinnerDataObject: OutUpdWinnerDataObject = {
        name: inName,
        wins: 0,
    };

    const outUpdWinnerDataJSON: string = JSON.stringify(outUpdWinnerDataObject);
    winnerData.push(outUpdWinnerDataObject)
    const outUpdWinnerObject: OutMessageObject = { type: 'update_winners', data: JSON.stringify(winnerData), id:0 };
    const outUpdWinnerJSON: string = JSON.stringify(outUpdWinnerObject);
    return outUpdWinnerJSON;
};
