import { Socket } from 'socket.io';

interface Game {
  players: [Socket, Socket];
  board: any[];
  turn: number;
}

let waitingPlayer: Socket | null = null;
const games: Record<string, Game> = {};

function initialiseChessBoard(): any[] {
  return [];
}

function createGame(player1: Socket, player2: Socket): string {
  const gameId = `${player1.id}-${player2.id}`;
  const initialBoard = initialiseChessBoard();

  games[gameId] = {
    players: [player1, player2],
    board: initialBoard,
    turn: 1, // Player 1 starts
  };

  player1.join(gameId);
  player2.join(gameId);

  player1.emit('gameStart', { gameId, player: 1 });
  player2.emit('gameStart', { gameId, player: 2 });

  console.log(`Game started between ${player1.id} and ${player2.id}`);

  return gameId;
}

function addPlayerToQueue(socket: Socket): void {
  if (waitingPlayer) {
    createGame(waitingPlayer, socket);
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    socket.emit('waitingForOpponent');
    console.log(`Player ${socket.id} is waiting for an opponent`);
  }
}

function makeMove(gameId: string, playerId: string, move: any): void {
  const game = games[gameId];
  if (!game) return;

  const { source, destination } = move;
  const squares = [...game.board];
  const playerTurn = game.turn;

  const playerIndex = playerTurn === 1 ? 0 : 1;

  if (game.players[playerIndex].id === playerId) {
    squares[destination] = squares[source];
    squares[source] = null;

    game.board = squares;
    game.turn = playerTurn === 1 ? 2 : 1;

    game.players.forEach((player) => {
      player.emit('gameState', game);
    });
  } else {
    const player = game.players.find((p) => p.id === playerId);
    player?.emit('invalidMove', 'Not your turn!');
  }
}

function removePlayer(socket: Socket): void {
  if (waitingPlayer && waitingPlayer.id === socket.id) {
    waitingPlayer = null;
  }

  for (const gameId in games) {
    const game = games[gameId];
    if (game.players.includes(socket)) {
      game.players.forEach((player) => {
        player.emit('opponentDisconnected');
      });
      delete games[gameId];
      break;
    }
  }
}

export default {
  addPlayerToQueue,
  makeMove,
  removePlayer,
};
