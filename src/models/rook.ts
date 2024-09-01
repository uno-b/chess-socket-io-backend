import Piece from './piece';
import { isSameRow, isSameColumn, isPathClean } from '../utils/functions';
import { getSrcToDestPathType, isMovePossibleType } from '../types/piece';

const Rook = (player: 1 | 2) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';

  const piece = Piece({ player, iconUrl });

  const isMovePossible: isMovePossibleType = (src, dest, squares) => {
    return (
      isPathClean(getSrcToDestPath(src, dest), squares) &&
      (isSameColumn(src, dest) || isSameRow(src, dest))
    );
  };

  const getSrcToDestPath: getSrcToDestPathType = (src, dest) => {
    const path = [];
    let pathStart, pathEnd, incrementBy;

    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }

    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else {
      incrementBy = 1;
      pathStart += 1;
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

export default Rook;
