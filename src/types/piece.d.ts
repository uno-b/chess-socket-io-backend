import { Square } from './chess';

export type isMovePossibleType = (
  src: number,
  dest: number,
  squares: Square[]
) => boolean;

export type getSrcToDestPathType = (
  src: number,
  dest: number,
  isDestEnemyOccupied?: boolean
) => number[];
