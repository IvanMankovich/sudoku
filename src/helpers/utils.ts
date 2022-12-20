import { gridIndexes } from "../constants/boardGeneratorConstants";

export function getRandomElem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const getRowRestricted = (row: number, secret: string): number[] => {
  const result: number[] = secret
    .slice(row * 9, row * 9 + 9)
    .split("")
    .filter((n: string) => n !== "0")
    .map((n: string) => +n);

  return result;
};

export const getColRestricted = (col: number, secret: string): number[] => {
  const result: number[] = [];
  for (let i = 0; i < 9; i++) {
    const temp = secret[i * 9 + col];
    if (temp !== "0") {
      result.push(+temp);
    }
  }
  return result;
};

export const getSquareRestricted = (
  row: number,
  col: number,
  secret: string
): number[] => {
  const startRowCell: number = getStartCell(row);
  const startColCell: number = getStartCell(col);

  const result: number[] = [];

  for (let i = 0; i < 3; i++) {
    result.push(
      ...secret
        .slice(
          startRowCell * 9 + startColCell + i * 9,
          startRowCell * 9 + startColCell + 3 + i * 9
        )
        .split("")
        .filter((n: string) => n !== "0")
        .map((n: string) => +n)
    );
  }

  return result;
};

export const getStartCell = (currentCellInd: number): number => {
  const startCell: number = currentCellInd > 5 ? 6 : currentCellInd < 3 ? 0 : 3;
  return startCell;
};

export const removeFromArray = (
  original: number[],
  removable: number[]
): number[] => {
  return original.filter((num: number): boolean => !removable.includes(num));
};

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRange(min: number, max: number): number[] {
  let result: number[] = [];
  let startNum: number = min;

  while (startNum <= max) {
    result.push(startNum);
    ++startNum;
  }
  return result;
}

export function getGrid(): string[] {
  let result: string[] = [];
  for (let i = 0; i < 81; i++) {
    result.push("-");
  }
  return result;
}

export const getSquareIndexes = (currInd: number): number[] => {
  const result: number[] = [];
  const areaRowInd: number = Math.floor(currInd / 27);
  const squareIndex: number = getSquareIndex(currInd, areaRowInd);
  const base: number = areaRowInd * 27 + squareIndex * 3;

  for (let i = 0; i < 3; i++) {
    result.push(
      ...gridIndexes.map((num: number): number => base + num + i * 9)
    );
  }

  return result;

  function getSquareIndex(currInd: number, rowAreaInd: number): number {
    let inInRowArea: number = currInd - rowAreaInd * 27;

    while (inInRowArea >= 9) {
      inInRowArea = inInRowArea - 9;
    }

    return Math.floor(inInRowArea / 3);
  }
};

export const getRowIndexes = (currInd: number): number[] => {
  const result: number[] = [];
  const row: number = Math.floor(currInd / 9) * 9;

  for (let i = 0; i < 9; i++) {
    result.push(row + i);
  }

  return result;
};

export const getColIndexes = (currInd: number): number[] => {
  const result: number[] = [];
  const col: number = currInd - Math.floor(currInd / 9) * 9;

  for (let i = 0; i < 9; i++) {
    result.push(9 * i + col);
  }

  return result;
};
