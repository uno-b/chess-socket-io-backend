// @ts-nocheck
import { Socket } from 'socket.io';

import initialiseChessBoard from './services/initializeBoardService';
import { GameState, Piece, Square } from './types/chess';
import King from './models/king';

let waitingPlayer: Socket | null = null;
const games: Record<string, GameState> = {};

function createGame(player1: Socket, player2: Socket): string {
  const gameId = `${player1.id}-${player2.id}`;
  const initialBoard: Square[] = initialiseChessBoard();

  const starterGameState: GameState = {
    players: [player1, player2],
    whiteFallenSoldiers: [],
    blackFallenSoldiers: [],
    squares: initialBoard,
    turn: 1, // Player 1 starts
    statusMsg: '',
  };
  games[gameId] = { ...starterGameState };

  player1.join(gameId);
  player2.join(gameId);

  player1.emit('gameStart', { gameId, player: 1 });
  player2.emit('gameStart', { gameId, player: 2 });

  const sendData = {
    blackFallenSoldiers: starterGameState.blackFallenSoldiers,
    whiteFallenSoldiers: starterGameState.whiteFallenSoldiers,
    squares: starterGameState.squares,
    turn: starterGameState.turn,
    statusMsg: starterGameState.statusMsg,
  };

  player1.emit('gameState', sendData);
  player2.emit('gameState', sendData);

  console.log(`Game started between ${player1.id} and ${player2.id}`);

  return gameId;
}

function addPlayerToQueue(socket: Socket): void {
  if (waitingPlayer) {
    if (socket === waitingPlayer.id) return;

    createGame(waitingPlayer, socket);
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    socket.emit('waitingForOpponent');
    console.log(`Player ${socket.id} is waiting for an opponent`);
  }
}

// use only after validation
const getNewGameState = (
  game: GameState,
  source: number,
  dest: number
): GameState => {
  const squaresCopy = [...game.squares];

  if (squaresCopy[source]) {
    squaresCopy[source].style = {
      ...squaresCopy[source]?.style,
      backgroundColor: '',
    };
  }

  const newWhiteFallenSoldiers: Piece[] = [];
  const newBlackFallenSoldiers: Piece[] = [];

  if (squaresCopy[dest] !== null) {
    if (squaresCopy[dest]?.player === 1) {
      newWhiteFallenSoldiers.push(squaresCopy[dest]!);
    } else {
      newBlackFallenSoldiers.push(squaresCopy[dest]!);
    }
  }

  squaresCopy[dest] = squaresCopy[source];
  squaresCopy[source] = null;

  return {
    ...game,
    squares: squaresCopy,
    whiteFallenSoldiers: [
      ...game.whiteFallenSoldiers,
      ...newWhiteFallenSoldiers,
    ],
    blackFallenSoldiers: [
      ...game.blackFallenSoldiers,
      ...newBlackFallenSoldiers,
    ],
    turn: game.turn === 1 ? 2 : 1,
    statusMsg: '',
  };
};

const getKingPosition = (squares: Square[], player: number): number | null => {
  return squares.reduce(
    (acc, curr, i) => acc || (curr?.player === player && curr && i),
    null
  );
};

const isCheckForPlayer = (squares: Square[], player: number): boolean => {
  const opponent = player === 1 ? 2 : 1;
  const playersKingPosition = getKingPosition(squares, player);

  const canPieceKillPlayersKing = (piece: Piece, i: number) => {
    return (
      piece.type === 'king' &&
      piece.isMovePossible(playersKingPosition || -1, i, squares)
    );
  };

  return squares.reduce<boolean>((acc, curr, idx) => {
    if (curr && curr.player === opponent) {
      return acc || canPieceKillPlayersKing(curr, idx);
    }
    return acc;
  }, false);
};

function makeMove(
  gameId: string,
  socket: Socket,
  move: { source: number; dest: number }
): void {
  const game = games[gameId];
  if (!game) return;

  const { source, dest } = move;

  const playerIndex = game.turn === 1 ? 0 : 1;

  if (game.players[playerIndex].id === socket.id) {
    const squaresCopy = [...game.squares] as Square[];

    const isDestEnemyOccupied = Boolean(squaresCopy[dest]);
    const isMovePossible =
      squaresCopy[source]?.isMovePossible(source, dest, isDestEnemyOccupied) ||
      false;

    if (isMovePossible) {
      const newWhiteFallenSoldiers: Piece[] = [];
      const newBlackFallenSoldiers: Piece[] = [];
      if (squaresCopy[dest] !== null) {
        if (squaresCopy[dest]?.player === 1) {
          newWhiteFallenSoldiers.push(squaresCopy[dest]);
        } else {
          newBlackFallenSoldiers.push(squaresCopy[dest]);
        }
      }

      squaresCopy[dest] = squaresCopy[source];
      squaresCopy[source] = null;

      const isCheckMe = isCheckForPlayer(squaresCopy, playerIndex);

      if (isCheckMe) {
        socket.emit(
          'error',
          'Wrong selection. Choose valid source and destination again. Now you have a check!'
        );
      } else {
        const newGameState = getNewGameState(game, source, dest);

        const sendData = {
          blackFallenSoldiers: newGameState.blackFallenSoldiers,
          whiteFallenSoldiers: newGameState.whiteFallenSoldiers,
          squares: newGameState.squares,
          turn: newGameState.turn,
          statusMsg: newGameState.statusMsg,
        };

        games[gameId] = { ...newGameState };

        game.players.forEach((player) => {
          player.emit('gameState', sendData);
        });
      }
    } else {
      socket.emit(
        'error',
        'Wrong selection. Choose valid source and destination again.'
      );
    }
  } else {
    const player = game.players.find((p) => p.id === socket.id);
    player?.emit('error', 'Not your turn!');
  }
}

function removePlayer(socket: Socket): void {
  if (waitingPlayer?.id === socket.id) {
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
