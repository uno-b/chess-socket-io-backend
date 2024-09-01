type PieceProps = {
  player: number;
  iconUrl: string;
};

const Piece = ({ player, iconUrl }: PieceProps) => {
  const style = { backgroundImage: `url('${iconUrl}')` };

  return {
    player,
    style,
  };
};

export default Piece;
