import WebSocket from 'ws';

export type InMessageObject = {
    type: string;
    data: string;
    id: number;
};

export type OutMessageObject = InMessageObject;

export type UserDataResponse = {
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

export type RoomUserType = {
    name: string;
    index: number;
    socket: string | null;
};

export type RoomDbType = {
    roomId: number;
    roomUsers: RoomUserType[];
    gameBoard?: any[];
    player1?: PlayerType;
    player2?: PlayerType;
    gameId: number | null;
};

export type PlayerType = {
    id: number;
    socket: string;
    ships: Ship[] | null;
}

export type UserData = {
    name: string;
    password: string;
}

export type UserDbType = {
    playerId: number | null;
    gameId: number | null;
    name: string;
    password: string;
    index: number;
    socket: string | null;
}

export type WinnerDbType = {
   name: string;
   wins: number;
}

export type DB = {
    users: UserDbType[];
    rooms: RoomDbType[]
}

export type PlayerDbType = {
    id: string;
    socket: string;
    gameId: string;
}

export interface IWS extends WebSocket {
    id: string;
}

export type OutUpdRoomDataObject = {}