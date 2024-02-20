import { InLoginObject, OutLoginDataObject, OutLoginObject } from '../utilities/types';
import { getRandomNumber } from '../utilities/data';

export const loginHandler = (inLoginObject: InLoginObject) => {
    const inName: string = JSON.parse(inLoginObject.data).name;
    const index: number = getRandomNumber();
    const outLoginDataObject: OutLoginDataObject = {
        name: inName,
        index: index,
        error: inName ? false : true,
        errorText: 'Name is not found',
    };

    const outLoginDataJSON: string = JSON.stringify(outLoginDataObject);
    console.log('userdata1 ', outLoginDataObject)
    const outLoginObject: OutLoginObject = { ...inLoginObject, data: outLoginDataJSON };
    console.log('userdata2 ', outLoginDataObject)
    const outLoginJSON: string = JSON.stringify(outLoginObject);
    console.log('userdata3 ', outLoginDataObject)

    return {outLoginJSON, outLoginDataObject};
};
