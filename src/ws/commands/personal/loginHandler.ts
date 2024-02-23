import { InMessageObject, UserData, OutUserData, OutMessageObject } from '../../utilities/types';
import { getRandomNumber, indexGenerator } from '../../utilities/data';
import { db } from '../../utilities/data';
import { jsonStringifier } from '../../utilities/jsonHandler';
export const loginHandler = (userData: UserData, socketId: string): void | string => {
    let outData = '';
    let userFound = false; 
    db.users.forEach((user) => {
        if (user.name === userData.name && user.password === userData.password) {
            user.socket = socketId;
            user.index = indexGenerator();
            const outUserData: OutUserData = {
                name: user.name,
                index: user.index,
                error: false,
                errorText: 'Name or password is not correct',
            };
            outData = jsonStringifier('reg', outUserData);
            console.log('outData', outData);
            userFound = true;
            return outData;
        } else if (user.name === userData.name) {
            const outUserData: OutUserData = {
                name: userData.name,
                index: -1,
                error: true,
                errorText: 'Password is incorrect',
            };
            outData = jsonStringifier('reg', outUserData);
            console.log('outData', outData);
            userFound = true;
            return outData;
        }
    });


    if (!userFound) {
        const newUser = {
            name: userData.name,
            password: userData.password,
            socket: socketId,
            index: indexGenerator()
        };
        db.users.push(newUser);

        const outUserData: OutUserData = {
            name: newUser.name,
            index: newUser.index,
            error: false,
            errorText: 'Name or password is not correct',
        };
        outData = jsonStringifier('reg', outUserData);
        console.log('outData', outData);
    }
    console.log('db', db)
    return outData;
};