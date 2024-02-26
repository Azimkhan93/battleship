import WebSocket from 'ws';

export type InMessageObject = {
    type: string;
    data: string;
    id: number;
};

export type OutMessageObject = InMessageObject;

export type OutUserData = {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
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

export type OutUpdWinnerDataObject = {
    name: string;
    wins: number;
};

export type Position = {
    x: number;
    y: number;
};

export type Ship = {
    position: Position;
    direction: boolean;
    length: number;
    type: 'small' | 'medium' | 'large' | 'huge';
};

export type InShips = {
    gameId: number;
    ships: Ship[];
    indexPlayer: number;
};

export type OutStartGameDataObject = {
    ships: Ship[];
    currentPlayerIndex: number;
};

export type RoomUser = {
    name: string;
    index: number;
};

export type RoomData = {
    roomId: number;
    roomUsers: RoomUser[];
};

export type UserData = {
    name: string;
    password: string
}

export type UserDataDB = {
    name: string,
    password: string,
    index: number,
    socket: string | null,
}

export type DB = {
    users: UserDataDB[];
    rooms: RoomData[]
}


export interface IWS extends WebSocket {
    id: string;
}  