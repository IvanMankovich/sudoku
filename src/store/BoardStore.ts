import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import {
  getRandomElem,
  getRandomInt,
  getRange,
  getGrid,
  getRandomCellInd,
  getNumbersDictionary,
  indexToRowCol,
  isCellValid,
  getSquareIndexes,
  getRowIndexes,
  getColIndexes,
} from "../helpers/utils";
import {
  numbers,
  gridIndexes,
  difficultyParams,
  empty,
} from "../constants/boardGeneratorConstants";
import {
  DifficulityLevel,
  NumbersDictionary,
  RotationLevel,
} from "../types/types";
import { Timer } from "../helpers/Timer";

export class BoardStore {
  root: RootStore;

  /** generated board with empty cells */
  private board: string[] = [];
  /** generated initial board with empty cells */
  private initialBoard: string[] = [];
  /** board with filled cells */
  private boardSecret: string[] = [];
  /** current board state with user answer */
  boardAnswer: string[] = [];
  boardCheckAttempts: number = 0;
  /** current board state with user answer as string */
  private boardPreset: string = "";
  /** 9 char length string for board generation */
  private secret: string = "";
  difficultyLevel = DifficulityLevel.insane;
  /** current state with remaining numbers */
  remainingNumbers: NumbersDictionary = {};
  /** initial state with remaining numbers */
  remainingNumbersStored: NumbersDictionary = {};
  invalidCells: number[] = [];
  selectedSquareInd: number[] = [];
  selectedRowInd: number[] = [];
  selectedColInd: number[] = [];
  timer: Timer = new Timer();
  isSolved: boolean = false;
  isFilled: boolean = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  private generateSecret(): string {
    let result: string = "";
    let tempNumbers: number[] = numbers.slice();
    for (let j = 0; j < 9; j++) {
      const tempNum = getRandomElem(tempNumbers);
      result = `${result}${tempNum}`;
      tempNumbers = tempNumbers.filter((n: number) => n !== tempNum);
    }

    return result;
  }

  private generateBoardPreset(secret: string): string {
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

    return result.slice();
  }

  private rotateBoard(board: string): string {
    let result: string[] = [];
    const roationAngle: number = getRandomElem([
      RotationLevel.quarter,
      RotationLevel.half,
      RotationLevel.halfAndQuarter,
      RotationLevel.zero,
    ]);
    const getCurrentInd = (currentCol: number, currentRow: number): number =>
      currentCol + 9 * currentRow;

    switch (roationAngle) {
      case RotationLevel.quarter:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (currentCol + 1) - currentRow - 1;
            const currentInd: number = getCurrentInd(currentCol, currentRow);
            result[newIndex] = board[currentInd];
          }
        }
        break;
      case RotationLevel.half:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (9 - currentRow) - currentCol - 1;
            const currentInd: number = getCurrentInd(currentCol, currentRow);
            result[newIndex] = board[currentInd];
          }
        }
        break;
      case RotationLevel.halfAndQuarter:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (9 - currentCol) - (9 - currentRow);
            const currentInd: number = getCurrentInd(currentCol, currentRow);
            result[newIndex] = board[currentInd];
          }
        }
        break;
      case RotationLevel.zero:
      default:
        return board;
    }

    return result.join("");
  }

  private swapSmallColumns(board: string): string {
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

  private swapSmallRows(board: string): string {
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

  private swapAreaColumns(board: string): string {
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

  private swapAreaRows(board: string): string {
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

  private randomizeBoardPreset(board: string): string {
    let result: string = board.slice();

    const randomizeFunctions: ((board: string) => string)[] = [
      this.rotateBoard,
      this.swapSmallColumns,
      this.swapSmallRows,
      this.swapAreaColumns,
      this.swapAreaRows,
    ];

    for (let i = 0; i < 10; i++) {
      const temp: string = getRandomElem(randomizeFunctions)(result);
      result = temp;
    }

    return result;
  }

  private generateBoard(
    board: string,
    difficulityLevel: DifficulityLevel
  ): string[] {
    const result: string[] = getGrid();
    const visibleCells: number = getRandomInt(
      ...difficultyParams[difficulityLevel]
    );

    let availableIndexes: number[] = getRange(0, 80);
    const unusedNumbers: number[] = numbers.slice();

    const numbersDictionary: NumbersDictionary = getNumbersDictionary();
    for (let i = 0; i < visibleCells; i++) {
      const randomCellInd: number =
        i < 9
          ? getRandomCellInd(availableIndexes, unusedNumbers[i], board)
          : getRandomElem(availableIndexes);
      const currentNumber: string = board[randomCellInd];
      result[randomCellInd] = currentNumber;
      numbersDictionary[currentNumber] = numbersDictionary[currentNumber] - 1;
      availableIndexes = availableIndexes.filter(
        (num: number): boolean => num !== randomCellInd
      );
    }

    this.remainingNumbers = numbersDictionary;
    this.remainingNumbersStored = { ...numbersDictionary };
    return result;
  }

  private getSolvedBoardSecret(board: string): string[] {
    return board.split("");
  }

  generateNewBoard(difficultyLevel: DifficulityLevel): void {
    this.difficultyLevel = difficultyLevel;
    this.secret = this.generateSecret();
    this.boardPreset = this.generateBoardPreset(this.secret);
    this.boardPreset = this.randomizeBoardPreset(this.boardPreset);
    this.boardSecret = this.getSolvedBoardSecret(this.boardPreset);
    this.board = this.generateBoard(this.boardPreset, difficultyLevel);
    this.boardAnswer = this.board.slice();
    this.initialBoard = this.board.slice();
    this.isFilled = false;
    this.setSolvedState(false);
    this.timer.reset();
    this.timer.run();
  }

  clearBoard() {
    this.board = this.initialBoard.slice();
    this.boardAnswer = this.initialBoard.slice();
    this.remainingNumbers = { ...this.remainingNumbersStored };
  }

  acceptAttempt(ind: number, value: number): void {
    this.setRemainingNumbers(ind, value);
    this.boardAnswer[ind] = value.toString();
    this.updateFilledState();

    if (this.isFilled) {
      this.checkBoard();

      if (!this.invalidCells.length) {
        this.setSolvedState(true);
      }
    }
  }

  private setRemainingNumbers(ind: number, value: number): void {
    const prevCellValue: string = this.boardAnswer[ind];
    const isNewValueValid: boolean = Boolean(value);
    const changableNum: string = isNewValueValid
      ? value.toString()
      : prevCellValue;

    this.remainingNumbers[changableNum] =
      this.remainingNumbers[changableNum] + (isNewValueValid ? -1 : 1);
    if (isNewValueValid && +prevCellValue) {
      this.remainingNumbers[prevCellValue] =
        this.remainingNumbers[prevCellValue] + 1;
    }
  }

  getCellValueByInd(ind: number): string {
    return this.boardSecret[ind];
  }

  getBoardCellValueByInd(ind: number): string {
    return this.board[ind];
  }

  private _showBoardSecret(): void {
    this.board = this.boardPreset.split("");
    this.boardAnswer = this.boardPreset.split("");
    this.remainingNumbers = getNumbersDictionary(0);
  }

  checkBoard(): void {
    let splittedBoard: string[][] = [];
    for (let row = 0; row < 9; row++) {
      splittedBoard[row] = [...this.boardAnswer.slice(9 * row, 9 * (row + 1))];
    }
    let invalidCells: number[] = [];

    this.boardAnswer.forEach((cellValue: string, cellInd: number): void => {
      const { row, col } = indexToRowCol(cellInd);
      if (
        +cellValue &&
        !+this.board[cellInd] &&
        !isCellValid(splittedBoard, row, col, cellValue, cellInd)
      ) {
        invalidCells.push(cellInd);
      }
    });
    this.invalidCells = [...invalidCells];
  }

  getInvalidCells(): void {}

  onSelectCell(ind: number): void {
    this.selectedSquareInd = getSquareIndexes(ind);
    this.selectedRowInd = getRowIndexes(ind);
    this.selectedColInd = getColIndexes(ind);
    this.invalidCells = [];
  }

  onBlurCell(): void {
    this.selectedSquareInd = [];
    this.selectedRowInd = [];
    this.selectedColInd = [];
    this.invalidCells = [];

    if (this.isFilled) {
      this.checkBoard();
    }
  }

  getHint(): void {
    if (!this.isFilled) {
      const freeCellIndexes: number[] = [];
      this.boardAnswer.forEach((cellValue: string, ind: number): void => {
        cellValue === empty && freeCellIndexes.push(ind);
      });
      const randomCellInd: number = getRandomElem(freeCellIndexes);
      const value: string = this.getCellValueByInd(randomCellInd);
      this.acceptAttempt?.(randomCellInd, +value);
      this.board[randomCellInd] = value.toString();
    }
  }

  private updateFilledState(): void {
    this.isFilled = !this.boardAnswer.includes(empty);
  }

  private setSolvedState(state: boolean): void {
    this.isSolved = state;
  }
}
