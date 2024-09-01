// @ts-nocheck
import diagonalDictionaryTLBR from '../dictionaries/diagonalTopLeftBottomRight';
import diagonalDictionaryTRBL from '../dictionaries/diagonalTopRightBottomLeft';
import rowDictionary from '../dictionaries/row';
import columnDictionary from '../dictionaries/column';
import { Square } from '../types/chess';

export const isSameRow = (src: number, dest: number): boolean => {
  return !!(rowDictionary[src] && rowDictionary[src][dest]);
};

export const isSameColumn = (src: number, dest: number): boolean => {
  return !!(columnDictionary[src] && columnDictionary[src][dest]);
};

export const isSameDiagonal = (src: number, dest: number): boolean => {
  return !!(
    (diagonalDictionaryTLBR[src] && diagonalDictionaryTLBR[src][dest]) ||
    (diagonalDictionaryTRBL[src] && diagonalDictionaryTRBL[src][dest])
  );
};

export const isPathClean = (
  srcToDestPath: number[],
  squares: Square[]
): boolean => {
  return srcToDestPath.reduce((acc, curr) => !squares[curr] && acc, true);
};
