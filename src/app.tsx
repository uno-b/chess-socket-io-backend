import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './socketHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
