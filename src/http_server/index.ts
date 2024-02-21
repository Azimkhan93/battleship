import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { loginHandler } from '../commands/personal/loginHandler';
import { randomID } from '../utilities/data';
import { InMessageObject, OutLoginDataObject, OutUpdRoomDataObject, OutUpdWinnerDataObject } from '../utilities/types';
import { updateRoomHandler } from '../commands/all/updateRoomHandler';
import { updateWinnersHandler } from '../commands/all/updateWinnersHandler';
import { createGameHandler } from '../commands/gameRoom/createGameHandler';
import { startGameHandler } from '../commands/gameRoom/startGameHandler';

export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const wsServer = new WebSocketServer({ port: 3000 });
let roomsDataArr: OutUpdRoomDataObject[] = [];
const roomUsers: OutLoginDataObject[] = [];
const winnerData: OutUpdWinnerDataObject[] = []
roomsDataArr = roomsDataArr.filter((item) => item.roomUsers.length < 2);

wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('New client connected', randomID);
        const inMessageJSON: string = message.toString('utf-8');
        const inMessageObject: InMessageObject = JSON.parse(inMessageJSON);
        const type: string = inMessageObject.type;
        // ws.on('message', function message(data, isBinary) {
        //     wsServer.clients.forEach(function each(client) {
        //       if (client.readyState === WebSocket.OPEN) {
        //         client.send(data, { binary: isBinary });
        //       }
        //     });
        //   });
        switch (type) {
            case 'reg':
                const loginResp: { outLoginJSON: string; outLoginDataObject: OutLoginDataObject } =
                    loginHandler(inMessageObject);

                const outLoginMessageJSON: string = loginResp.outLoginJSON;
                ws.send(outLoginMessageJSON);

                const userData: OutLoginDataObject = loginResp.outLoginDataObject;

                const outUpdRoomRegMessageJSON = updateRoomHandler(roomUsers, roomsDataArr);
                const outUpdWinnersMessageJSON = updateWinnersHandler(inMessageObject, winnerData)

                ws.send(outUpdRoomRegMessageJSON);
                ws.send(outUpdWinnersMessageJSON);

                roomUsers.push(userData);
                break;
            case 'create_room':
                const outUpdRoomCRMessageJSON: string = updateRoomHandler(roomUsers, roomsDataArr);
                ws.send(outUpdRoomCRMessageJSON as string);
                break;
            case 'add_user_to_room':
                const outCreateGameJSON = createGameHandler(inMessageObject, roomsDataArr);
                console.log('outCreateGameJSON ', outCreateGameJSON);
                ws.send(outCreateGameJSON);

                break;
            case 'add_ships':
                const outStartGameJSON = startGameHandler(inMessageObject)
                ws.send(outStartGameJSON);
                break;
            default:
                console.log('Not found err');
        }

        console.log(inMessageJSON);
    });
});
