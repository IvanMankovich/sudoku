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

  if (row === 1 && col === 7) {
    debugger;
  }

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
