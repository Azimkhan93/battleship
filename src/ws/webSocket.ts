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
import {sendAll} from "./utils/ws-send";
import {createRoomCommand} from "./commands/all/create-room-command";
import {addUserToRoomCommand} from "./commands/all/add-user-to-room-command";
import {userDb} from "../db/user.db";

let roomUsers: RoomUserType[] = [];
const winnerData: OutUpdWinnerDataObject[] = [];
let roomId: number | null = null;

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

                    const roomRes = updateRoomCommand();
                    sendAll(wsServer, roomRes)
                    break;
                }
                case EVENT_TYPES.UPDATE_ROOM: {
                    break;
                }
                case EVENT_TYPES.UPDATE_WINNERS: {
                    break;
                }
                case EVENT_TYPES.CREATE_ROOM: {
                    const user = userDb.getUserBySocketId(socketId);
                    createRoomCommand(user);
                    const roomRes = updateRoomCommand();
                    sendAll(wsServer, roomRes)

                    break;
                }
                case EVENT_TYPES.ADD_USER_TO_ROOM: {
                    const user = userDb.getUserBySocketId(socketId);
                    const inMessageData = JSON.parse(inMessageObject.data);
                    addUserToRoomCommand(inMessageData.indexRoom, user);
                    const roomRes = updateRoomCommand();
                    sendAll(wsServer, roomRes);

                    break;
                }
                case EVENT_TYPES.CREATE_GAME: {
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
