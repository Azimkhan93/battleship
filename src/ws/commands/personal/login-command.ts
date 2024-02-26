import {UserData, UserDataResponse, UserDbType} from '../../../db/types';
import {indexGenerator} from '../../../db/data';
import {jsonStringifier} from '../../utils/jsonHandler';
import {userDb} from "../../../db/user.db";

export const loginCommand = (userData: UserData, socketId: string): string => {
    const user = userDb.getUser(userData.name);

    if (!user) {
        // user is not found in the db. Adding it to the DB
        const newUser: UserDbType = {
            gameId: null,
            playerId: null,
            name: userData.name,
            password: userData.password,
            socket: socketId,
            index: indexGenerator()
        };

        userDb.addUser(newUser);

        const userDataResponse: UserDataResponse = {
            name: newUser.name,
            index: newUser.index,
            error: false,
            errorText: '',
        };

        return jsonStringifier('reg', userDataResponse);
    }

    if (userData.password === user.password) {
        // user was found and password is correct. Return the existing user
        const userDataResponse: UserDataResponse = {
            name: user.name,
            index: user.index,
            error: false,
            errorText: ''
        }

        return jsonStringifier('reg', userDataResponse);
    }

    // user was found, BUT password is incorrect. Return the error
    const userDataResponse: UserDataResponse = {
        name: user.name,
        index: -1,
        error: true,
        errorText: 'Password is incorrect'
    }

    return jsonStringifier('reg', userDataResponse);

};