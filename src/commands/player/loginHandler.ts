import { InMessageObject, OutLoginDataObject, OutLoginObject } from '../../utilities/types';
import { getRandomNumber } from '../../utilities/data';

export const loginHandler = (inLoginObject: InMessageObject) => {
    const inName: string = JSON.parse(inLoginObject.data).name;
    const index: number = getRandomNumber();
    const outLoginDataObject: OutLoginDataObject = {
        name: inName,
        index: index,
        error: inName ? false : true,
        errorText: 'Name is not found',
    };

    const outLoginDataJSON: string = JSON.stringify(outLoginDataObject);
    const outLoginObject: OutLoginObject = { ...inLoginObject, data: outLoginDataJSON };
    const outLoginJSON: string = JSON.stringify(outLoginObject);

    return {outLoginJSON, outLoginDataObject};
};
