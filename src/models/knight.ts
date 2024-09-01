import Piece from './piece';
import { isSameRow } from '../utils/functions';
import { getSrcToDestPathType, isMovePossibleType } from '../types/piece';

type Squares = Array<any>;

const Knight = (player: number) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg';

  const piece = Piece({ player, iconUrl });

  const isMovePossible: isMovePossibleType = (src, dest) => {
    return (
      (src - 17 === dest && !isSameRow(src, dest)) ||
      (src - 10 === dest && !isSameRow(src, dest)) ||
      (src + 6 === dest && !isSameRow(src, dest)) ||
      (src + 15 === dest && !isSameRow(src, dest)) ||
      (src - 15 === dest && !isSameRow(src, dest)) ||
      (src - 6 === dest && !isSameRow(src, dest)) ||
      (src + 10 === dest && !isSameRow(src, dest)) ||
      (src + 17 === dest && !isSameRow(src, dest))
    );
  };

  const getSrcToDestPath: getSrcToDestPathType = (src, dest): number[] => {
    return [];
  };

  return {
    type: 'knight',
    player: piece.player,
    isMovePossible: isMovePossible,
    getSrcToDestPath: getSrcToDestPath,
    style: piece.style,
  };
};

export default Knight;
