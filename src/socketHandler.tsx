import { Server, Socket } from 'socket.io';
import gameManager from './gameManager';

const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    socket.on('findGame', () => {
      gameManager.addPlayerToQueue(socket);
    });

    socket.on('makeMove', ({ gameId, move }: { gameId: string; move: any }) => {
      gameManager.makeMove(gameId, socket.id, move);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      gameManager.removePlayer(socket);
    });
  });
};

export default socketHandler;
