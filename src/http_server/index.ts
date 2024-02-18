import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import Websocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';

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

const wsServer = new WebSocketServer({ port: 3000});

wsServer.on('connection', (ws) => {
    const userID = crypto.randomUUID();
    console.log('New client connected', userID);
    ws.on('message', (message) => {
        const stringifiedMessage = message.toString('utf-8')        
        const parsedJSON = JSON.parse(stringifiedMessage)
        console.log(parsedJSON.data);
        ws.send(stringifiedMessage)
    })
});
