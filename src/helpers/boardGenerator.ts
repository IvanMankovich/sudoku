import { getRandomElem } from "./utils";
import {
  numbers,
  rotation,
  gridIndexes,
} from "../constants/boardGeneratorConstants";

export class BoardGenerator {
  private board: string[][] = [];
  private _boardSecret: [][] = [];
  _secret: string = "";
  _squares: string[] = [];
  _key: string = "";

  constructor() {
    this.board = [];
    this._boardSecret = [];
    this.generateSecret();
    this.generateBoardPreset(this._secret);

    let a = [];
    for (let bbb = 9; bbb > 0; bbb--) {
      a[bbb - 1] = `${this._secret.slice(9 * (bbb - 1), 9 * bbb)}`;
    }
    console.log("before", a);

    let b = [];
    this._secret = this.randomizeBoard(this._secret);
    for (let bbb = 9; bbb > 0; bbb--) {
      b[bbb - 1] = `${this._secret.slice(9 * (bbb - 1), 9 * bbb)}`;
    }
    console.log("after", b);
  }

  generateSecret(): void {
    let tempNumbers: number[] = numbers.slice();
    for (let j = 0; j < 9; j++) {
      const tempNum = getRandomElem(tempNumbers);
      this._secret = `${this._secret}${tempNum}`;
      tempNumbers = tempNumbers.filter((n: number) => n !== tempNum);
    }
  }

  generateBoardPreset(secret: string): void {
    let result: string = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const addPart = `${secret.slice(i + j * 3, 9)}${secret.slice(
          0,
          i + j * 3
        )}`;
        result = `${result}${addPart}`;
      }
    }

    this._secret = result.slice();
  }

  rotateBoard(board: string): string {
    let result: string[] = [];
    const roationAngle: number = getRandomElem(rotation);
    const getCurrentInd = (currentCol: number, currentRow: number): number =>
      currentCol + 9 * currentRow;

    switch (roationAngle) {
      case 90:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (currentCol + 1) - currentRow - 1;
            const currentInd: number = getCurrentInd(currentCol, currentRow);
            result[newIndex] = board[currentInd];
          }
        }
        break;
      case 180:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (9 - currentRow) - currentCol - 1;
            const currentInd: number = getCurrentInd(currentCol, currentRow);
            result[newIndex] = board[currentInd];
          }
        }
        break;
      case 270:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (9 - currentCol) - (9 - currentRow);
            const currentInd: number = getCurrentInd(currentCol, currentRow);
            result[newIndex] = board[currentInd];
          }
        }
        break;
      default:
        return board;
    }

    return result.join("");
  }

  swapSmallColumns(board: string): string {
    let result: string[] = board.slice().split("");
    let indexes: number[] = gridIndexes.slice();
    const selectedAreaIndex: number = getRandomElem(indexes);
    const selectedPrimaryCol: number = getRandomElem(indexes);
    indexes = indexes.filter(
      (num: number): boolean => num !== selectedPrimaryCol
    );
    const selectedSecondaryCol: number = getRandomElem(indexes);
    for (let currentRow = 0; currentRow < 9; currentRow++) {
      const base: number = 3 * selectedAreaIndex + 9 * currentRow;
      const prevInd: number = selectedPrimaryCol + base;
      const secInd: number = selectedSecondaryCol + base;
      const temp: string = result[prevInd];
      result[prevInd] = result[secInd];
      result[secInd] = temp;
    }

    return result.join("");
  }

  swapSmallRows(board: string): string {
    let indexes: number[] = gridIndexes.slice();
    const base: number = 27 * getRandomElem(indexes);
    const selectedPrimaryRow: number = getRandomElem(indexes);
    indexes = indexes.filter(
      (num: number): boolean => num !== selectedPrimaryRow
    );
    const selectedSecondaryRow: number = getRandomElem(indexes);
    const prevInd: number = base + 9 * selectedPrimaryRow;
    const secInd: number = base + 9 * selectedSecondaryRow;
    const firstPart: string = board.slice(prevInd, prevInd + 9);
    const secondPart: string = board.slice(secInd, secInd + 9);

    return selectedPrimaryRow < selectedSecondaryRow
      ? `${board.slice(0, prevInd)}${secondPart}${board.slice(
          prevInd + 9,
          secInd
        )}${firstPart}${board.slice(secInd + 9)}`
      : `${board.slice(0, secInd)}${firstPart}${board.slice(
          secInd + 9,
          prevInd
        )}${secondPart}${board.slice(prevInd + 9)}`;
  }

  swapAreaColumns(board: string): string {
    let result: string[] = [];
    let indexes: number[] = gridIndexes.slice();
    const selectedPrimaryCol: number = getRandomElem(indexes);
    indexes = indexes.filter(
      (num: number): boolean => num !== selectedPrimaryCol
    );
    const selectedSecondaryCol: number = getRandomElem(indexes);
    for (let currentRow = 0; currentRow < 9; currentRow++) {
      const base: number = currentRow * 9;
      const prevInd: number = base + selectedPrimaryCol * 3;
      const secInd: number = base + selectedSecondaryCol * 3;
      const firstPartEndInd: number = prevInd + 3;
      const secondPartEndInd: number = secInd + 3;
      const endInd: number = base + 9;
      const firstPart: string = board.slice(prevInd, firstPartEndInd);
      const secondPart: string = board.slice(secInd, secondPartEndInd);
      if (selectedPrimaryCol < selectedSecondaryCol) {
        const start: string = board.slice(base, prevInd);
        const mid: string = board.slice(firstPartEndInd, secInd);
        const end: string = board.slice(secondPartEndInd, endInd);
        result.push(`${start}${secondPart}${mid}${firstPart}${end}`);
      } else {
        const start: string = board.slice(base, secInd);
        const mid: string = board.slice(secondPartEndInd, prevInd);
        const end: string = board.slice(firstPartEndInd, endInd);
        result.push(`${start}${firstPart}${mid}${secondPart}${end}`);
      }
    }

    return result.join("");
  }

  swapAreaRows(board: string): string {
    let indexes: number[] = gridIndexes.slice();
    const firstReplacableArea: number = getRandomElem(indexes);
    indexes = indexes.filter(
      (num: number): boolean => num !== firstReplacableArea
    );
    const secondReplacableArea: number = getRandomElem(indexes);
    const firstPartStartInd: number = firstReplacableArea * 27;
    indexes = indexes.filter(
      (num: number): boolean => num !== firstPartStartInd
    );
    const secondPartStartInd: number = secondReplacableArea * 27;
    const firstPartEndInd: number = firstPartStartInd + 27;

    const firstPart = board.slice(firstPartStartInd, firstPartEndInd);
    const secondPartEndInd: number = secondPartStartInd + 27;

    const secondPart = board.slice(secondPartStartInd, secondPartEndInd);

    if (firstPartStartInd < secondPartStartInd) {
      const start: string = board.slice(0, firstPartStartInd);
      const mid: string = board.slice(firstPartEndInd, secondPartStartInd);
      const end: string = board.slice(secondPartEndInd);
      return `${start}${firstPart}${mid}${secondPart}${end}`;
    } else {
      const start: string = board.slice(0, secondPartStartInd);
      const mid: string = board.slice(secondPartEndInd, firstPartStartInd);
      const end: string = board.slice(firstPartEndInd);
      return `${start}${firstPart}${mid}${secondPart}${end}`;
    }
  }

  randomizeBoard(board: string): string {
    let result: string = board.slice();

    const randomizeFunctions: ((board: string) => string)[] = [
      this.rotateBoard,
      this.swapSmallColumns,
      this.swapSmallRows,
      this.swapAreaColumns,
      this.swapAreaRows,
    ];

    for (let i = 0; i < 10; i++) {
      console.log();
      const aaa = getRandomElem(randomizeFunctions)(result);
      console.log(aaa, aaa === result);
      result = aaa;
    }

    return result;
  }

  checkBoard() {
    console.log("checkBoard");
    return null;
  }
}