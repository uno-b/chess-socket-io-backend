import Bishop from '../models/bishop';
import King from '../models/king';
import Knight from '../models/knight';
import Pawn from '../models/pawn';
import Queen from '../models/queen';
import Rook from '../models/rook';

export default function initialiseChessBoard() {
  const squares = Array(64).fill(null);

  for (let i = 8; i < 16; i++) {
    squares[i] = Pawn(2);
    squares[i + 40] = Pawn(1);
  }
  squares[0] = Rook(2);
  squares[7] = Rook(2);
  squares[56] = Rook(1);
  squares[63] = Rook(1);

  squares[1] = Knight(2);
  squares[6] = Knight(2);
  squares[57] = Knight(1);
  squares[62] = Knight(1);

  squares[2] = Bishop(2);
  squares[5] = Bishop(2);
  squares[58] = Bishop(1);
  squares[61] = Bishop(1);

  squares[3] = Queen(2);
  squares[4] = King(2);

  squares[59] = Queen(1);
  squares[60] = King(1);

  return squares;
}
