import { InLoginObject, OutLoginDataObject, OutLoginObject } from '../utilities/types';
import { randomNum } from '../utilities/data';
export const loginHandler = (inLoginObject: InLoginObject) => {
    const inName: string = JSON.parse(inLoginObject.data).name;

    const outLoginDataObject: OutLoginDataObject = {
        name: inName,
        index: randomNum,
        error: inName ? false : true,
        errorText: 'Name is not found',
    };

    const outLoginDataJSON: string = JSON.stringify(outLoginDataObject);

    const outLoginObject: OutLoginObject = { ...inLoginObject, data: outLoginDataJSON };
    const outLoginJSON: string = JSON.stringify(outLoginObject);

    return outLoginJSON;
};
