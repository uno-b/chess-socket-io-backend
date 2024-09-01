import Piece from './piece';
import { isSameDiagonal, isPathClean } from '../utils/functions';
import { Square } from '../types/chess';
import { getSrcToDestPathType, isMovePossibleType } from '../types/piece';

const Bishop = (player: number) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';

  const piece = Piece({ player, iconUrl });

  const isMovePossible: isMovePossibleType = (src, dest, squares) => {
    return (
      isPathClean(getSrcToDestPath(src, dest), squares) &&
      isSameDiagonal(src, dest)
    );
  };

  const getSrcToDestPath: getSrcToDestPathType = (
    src: number,
    dest: number
  ): number[] => {
    const path: number[] = [];
    let pathStart: number, pathEnd: number, incrementBy: number;

    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }

    if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else {
      incrementBy = 7;
      pathStart += 7;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  };

  return {
    type: 'bishop',
    player: piece.player,
    isMovePossible: isMovePossible,
    getSrcToDestPath: getSrcToDestPath,
    style: piece.style,
  };
};

export default Bishop;
