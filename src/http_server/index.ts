import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import WebSocket from 'ws';
import { loginHandler } from '../commands/loginHandler';
import { randomID } from '../utilities/data';
import { InMessageObject, OutLoginDataObject, OutUpdRoomDataObject } from '../utilities/types';
import { updateRoom } from '../commands/roomHandler';

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
const roomsDataArr: OutUpdRoomDataObject[] = [];
const roomUsers: OutLoginDataObject[] = [];

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

                const outUpdRoomRegMessageJSON = updateRoom(roomUsers, roomsDataArr);
                ws.send(outUpdRoomRegMessageJSON);

                roomUsers.push(userData);
                break;
            case 'create_room':
                const outUpdRoomCRMessageJSON: string = updateRoom(roomUsers, roomsDataArr);
                ws.send(outUpdRoomCRMessageJSON as string);
                break;
            default:
                console.log('Not found err');
        }

        console.log(inMessageJSON);
    });
});
