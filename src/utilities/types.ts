export type InLoginObject = {
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

export type OutLoginObject = InLoginObject;
export type InMessageObject = InLoginObject;

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
    id: number
};

// export type outUpdRoomDataJSON ={
//   type: "update_room",
//   data: 
//   id: 0,
// }
