import { Socket } from 'socket.io';

export type Piece = {
  player: number;
  style: React.CSSProperties;
  isMovePossible: (
    src: number,
    dest: number,
    isDestEnemyOccupied: boolean | Square[]
  ) => boolean;
};

export type Square = Piece | null;

export type GameState = {
  players: [Socket, Socket];
  squares: Square[];
  whiteFallenSoldiers: Piece[];
  blackFallenSoldiers: Piece[];
  turn: 1 | 2;
  statusMsg: string;
};
