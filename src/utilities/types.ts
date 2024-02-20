export type InMessageObject = {
    type: string;
    data: string;
    id: number;
};

export type OutLoginDataObject = {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
};

export type OutLoginObject = InMessageObject;

type UserDataForRoom = {
    name: string;
    index: number;
};

export type OutUpdRoomDataObject = {
    roomId: number;
    roomUsers: UserDataForRoom[];
};

export type OutUpdRoomObject = {
    type: string;
    data: string | string[];
    id: number;
};

export type OutCreateGameDataObject = {
    idGame: number;
    idPlayer: number;
};

export type OutCreateGameObject = InMessageObject;
