import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import WebSocket from 'ws';
import { loginHandler } from '../commands/player/loginHandler';
import { randomID } from '../utilities/data';
import { InMessageObject, OutLoginDataObject, OutUpdRoomDataObject } from '../utilities/types';
import { updateHandler } from '../commands/room/updateHandler';
import { addUserHandler } from '../commands/room/addUserHandler';

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

const wsServer = new WebSocket.Server({ port: 3000 });
let roomsDataArr: OutUpdRoomDataObject[] = [];
const roomUsers: OutLoginDataObject[] = [];

roomsDataArr = roomsDataArr.filter((item) => item.roomUsers.length < 2);

wsServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: WebSocket.RawData) => {
        console.log('New client connected', randomID);
        const inMessageJSON: string = message.toString('utf-8');
        const inMessageObject: InMessageObject = JSON.parse(inMessageJSON);
        const type: string = inMessageObject.type;

        switch (type) {
            case 'reg':
                const loginResp: { outLoginJSON: string; outLoginDataObject: OutLoginDataObject } =
                    loginHandler(inMessageObject);

                const outLoginMessageJSON: string = loginResp.outLoginJSON;
                ws.send(outLoginMessageJSON);

                const userData: OutLoginDataObject = loginResp.outLoginDataObject;

                const outUpdRoomRegMessageJSON = updateHandler(roomUsers, roomsDataArr);
                ws.send(outUpdRoomRegMessageJSON);

                roomUsers.push(userData);
                break;
            case 'create_room':
                const outUpdRoomCRMessageJSON: string = updateHandler(roomUsers, roomsDataArr);
                ws.send(outUpdRoomCRMessageJSON as string);
                break;
            case 'add_user_to_room':
                const outCreateGameJSON = addUserHandler(inMessageObject, roomsDataArr);
                console.log('outCreateGameJSON ', outCreateGameJSON);
                ws.send(outCreateGameJSON);

                break;
            default:
                console.log('Not found err');
        }

        console.log(inMessageJSON);
    });
});
