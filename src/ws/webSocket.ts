import { WebSocketServer } from 'ws';
import { loginHandler } from './commands/personal/loginHandler';
import { getRandomNumber, randomID } from './utilities/data';
import { InMessageObject, UserData, OutUserData, RoomData, OutUpdWinnerDataObject, RoomUser } from './utilities/types';
import { updateRoomHandler } from './commands/all/updateRoomHandler';
import { updateWinnersHandler } from './commands/all/updateWinnersHandler';
import { createGameHandler } from './commands/gameRoom/createGameHandler';
import { startGameHandler } from './commands/gameRoom/startGameHandler';
import { db } from './utilities/data';

let roomUsers: RoomUser[] = [];
const winnerData: OutUpdWinnerDataObject[] = [];
let roomId: number | null = null;

export const createWsServer = () => {
    const wsServer = new WebSocketServer({ port: 3000 });
    wsServer.on('connection', (ws) => {
        const socketID = crypto.randomUUID();
        ws.on('message', (message) => {
            console.log('New client connected', socketID);
            
            const inMessageJSON: string = message.toString('utf-8');
            const inMessageObject: InMessageObject = JSON.parse(inMessageJSON);
            const inMessageData = JSON.parse(inMessageObject.data);
            const type: string = inMessageObject.type;
            
            switch (type) {
                case 'reg':
                    // roomId = getRandomNumber();
                    const loginResp = loginHandler(inMessageData, socketID) as string;
                    console.log('loginResp', loginResp);
                    ws.send(loginResp);

                    // const outLoginMessageJSON: string = loginResp.outLoginJSON;
                    // ws.send(outLoginMessageJSON);

                    // const userData: OutLoginDataObject = loginResp.outLoginDataObject;

                    // const outUpdRoomRegMessageJSON = updateRoomHandler(loggedUsers, roomsDataArr, roomUsers, roomId);
                    const outUpdWinnersMessageJSON = updateWinnersHandler(inMessageObject, winnerData);

                    // ws.send(outUpdRoomRegMessageJSON);
                    // ws.send(outUpdWinnersMessageJSON);

                    // loggedUsers.push(userData);
                    break;
                case 'create_room':
                    // roomId = getRandomNumber();
                    // const outUpdRoomCRMessageJSON: string = updateRoomHandler(
                    //     loggedUsers,
                    //     roomsDataArr,
                    //     roomUsers,
                    //     roomId
                    // );
                    // ws.send(outUpdRoomCRMessageJSON as string);
                    break;
                case 'add_user_to_room':
                    // const outCreateGameJSON = createGameHandler(inMessageObject, roomsDataArr);
                    // console.log('outCreateGameJSON ', outCreateGameJSON);
                    // ws.send(outCreateGameJSON);

                    break;
                case 'add_ships':
                    const outStartGameJSON = startGameHandler(inMessageObject);
                    ws.send(outStartGameJSON);
                    break;
                default:
                    console.log('Not found err');
            }

            // console.log(inMessageJSON);
        });
    });
};
export { WebSocketServer };
