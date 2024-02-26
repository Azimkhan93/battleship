import WebSocket, {WebSocketServer} from 'ws';
import crypto from 'crypto'
import {loginCommand} from './commands/personal/login-command';
import {getRandomNumber, randomID} from '../db/data';
import {
    InMessageObject,
    UserData,
    UserDataResponse,
    RoomDbType,
    OutUpdWinnerDataObject,
    RoomUserType,
    IWS
} from '../db/types';
import {updateRoomCommand} from './commands/all/update-room-command';
import {updateWinnersCommand} from './commands/all/update-winners-command';
import {createGameCommand} from './commands/gameRoom/create-game-command';
import {startGameCommand} from './commands/gameRoom/start-game-command';
import {db} from '../db/data';
import {EVENT_TYPES} from "../constants/event-type.constant";
import {sendAll, sendRoom} from "./utils/ws-send";
import {createRoomCommand} from "./commands/all/create-room-command";
import {addUserToRoomCommand} from "./commands/all/add-user-to-room-command";
import {userDb} from "../db/user.db";
import {roomDb} from "../db/room.db";
import {roomWsDb} from "../db/room-ws.db";
import {socketWsDb} from "../db/socket-ws.db";

export const createWsServer = () => {
    const wsServer = new WebSocketServer({port: 3000});
    wsServer.on('connection', (ws: IWS) => {
        const socketId = crypto.randomUUID();
        console.log('New client connected', socketId);

        ws.on('message', (message) => {
            console.log(`Message from user with ${socketId} was received`);

            const inMessageJSON: string = message.toString('utf-8');
            const inMessageObject: InMessageObject = JSON.parse(inMessageJSON);
            const type: string = inMessageObject.type;

            switch (type) {
                case EVENT_TYPES.REG: {
                    const inMessageData = JSON.parse(inMessageObject.data);
                    const loginRes = loginCommand(inMessageData, socketId);
                    ws.send(loginRes);

                    const updateRoomRes = updateRoomCommand();
                    const updateWinnersRes = updateWinnersCommand();

                    sendAll(wsServer, updateRoomRes);
                    sendAll(wsServer, updateWinnersRes);

                    break;
                }

                case EVENT_TYPES.CREATE_ROOM: {
                    const user = userDb.getUserBySocketId(socketId);
                    const roomId = createRoomCommand(user);

                    if(roomId) {
                        roomWsDb.addWebSocketClientToRoom(roomId, ws)
                    }
                    socketWsDb.addWebSocketClient(socketId, ws);

                    const updateRoomRes = updateRoomCommand();
                    sendAll(wsServer, updateRoomRes);

                    break;
                }
                case EVENT_TYPES.ADD_USER_TO_ROOM: {
                    const user = userDb.getUserBySocketId(socketId);
                    const inMessageData = JSON.parse(inMessageObject.data);
                    const roomId = inMessageData.indexRoom;

                    addUserToRoomCommand(roomId, user);

                    roomWsDb.addWebSocketClientToRoom(roomId, ws);
                    socketWsDb.addWebSocketClient(socketId, ws);

                    const roomRes = updateRoomCommand();
                    sendAll(wsServer, roomRes);

                    const {
                        socket1,
                        socket2,
                        outCreateGamePlayer1JSON,
                        outCreateGamePlayer2JSON,
                    } = createGameCommand(inMessageData.indexRoom);


                    const ws1 = socketWsDb.getClientWs(socket1)
                    const ws2 = socketWsDb.getClientWs(socket2)

                    ws1.send(outCreateGamePlayer1JSON)
                    ws2.send(outCreateGamePlayer2JSON)

                    break;
                }
                case EVENT_TYPES.ADD_SHIPS: {
                    const outStartGameJSON = startGameCommand(inMessageObject);
                    ws.send(outStartGameJSON);
                    break;
                }
                case EVENT_TYPES.START_GAME: {
                    break;
                }
                case EVENT_TYPES.TURN: {
                    break;
                }
                case EVENT_TYPES.ATTACK: {
                    break;
                }
                case EVENT_TYPES.ATTACK_MISS: {
                    break;
                }
                case EVENT_TYPES.RANDOM_ATTACK: {
                    break;
                }
                case EVENT_TYPES.RANDOM_ATTACK_SHOOT: {
                    break;
                }
                case EVENT_TYPES.RANDOM_ATTACK_KILL: {
                    break;
                }
                case EVENT_TYPES.FINISH: {
                    break;
                }
                default:
                    console.log('Not found err');
            }

            // console.log(inMessageJSON);
        });
    });
};
export {WebSocketServer};
