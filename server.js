const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Handle the received message as needed
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
        wss.emit('connection', socket, request);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});