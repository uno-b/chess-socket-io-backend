import Piece from './piece';
import { isSameDiagonal, isSameRow } from '../utils/functions';
import { getSrcToDestPathType, isMovePossibleType } from '../types/piece';

type Squares = Array<any>;

const King = (player: number) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';

  const piece = Piece({ player, iconUrl });

  const isMovePossible: isMovePossibleType = (src, dest): boolean => {
    return (
      (src - 9 === dest && isSameDiagonal(src, dest)) ||
      src - 8 === dest ||
      (src - 7 === dest && isSameDiagonal(src, dest)) ||
      (src + 1 === dest && isSameRow(src, dest)) ||
      (src + 9 === dest && isSameDiagonal(src, dest)) ||
      src + 8 === dest ||
      (src + 7 === dest && isSameDiagonal(src, dest)) ||
      (src - 1 === dest && isSameRow(src, dest))
    );
  };

  const getSrcToDestPath: getSrcToDestPathType = (
    src: number,
    dest: number
  ): number[] => {
    return [];
  };

  return {
    type: 'king',
    player: piece.player,
    isMovePossible: isMovePossible,
    getSrcToDestPath: getSrcToDestPath,
    style: piece.style,
  };
};

export default King;
