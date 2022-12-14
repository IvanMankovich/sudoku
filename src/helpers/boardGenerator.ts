import {
  // getColRestricted,
  getRandomElem,
  // getRowRestricted,
  // getSquareRestricted,
  // removeFromArray,
} from "./utils";

export class BoardGenerator {
  private board: string[][] = [];
  private _boardSecret: [][] = [];
  _secret: string = "";
  _squares: string[] = [];
  _key: string = "";

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  rotation: number[] = [0, 90, 180, 270];

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
    let tempNumbers: number[] = this.numbers.slice();
    for (let j = 0; j < 9; j++) {
      const tempNum = getRandomElem(tempNumbers);
      this._secret = `${this._secret}${tempNum}`;
      tempNumbers = tempNumbers.filter((n: number) => n !== tempNum);
    }
  }

  generateBoardPreset(secret: string): void {
    let result: string = "";
    // let a = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // console.log(i, j);
        const addPart = `${secret.slice(i + j * 3, 9)}${secret.slice(
          0,
          i + j * 3
        )}`;
        result = `${result}${addPart}`;
      }
    }
    // for (let bbb = 9; bbb > 0; bbb--) {
    //   a[bbb - 1] = `${result.slice(9 * (bbb - 1), 9 * bbb)}`;
    // }
    // console.log(a);
    // console.log(result.length);
    this._secret = result.slice();
  }

  rotateBoard(board: string): string {
    let result: string[] = [];
    const roationAngle: number = getRandomElem(this.rotation);
    // const roationAngle: number = 270;

    switch (roationAngle) {
      case 90:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (currentCol + 1) - currentRow - 1;
            const currentInd: number = currentCol + 9 * currentRow;
            result[newIndex] = board[currentInd];
          }
        }
        break;
      case 180:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (9 - currentRow) - currentCol - 1;
            const currentInd: number = currentCol + 9 * currentRow;
            result[newIndex] = board[currentInd];
          }
        }
        break;
      case 270:
        for (let currentRow = 0; currentRow < 9; currentRow++) {
          for (let currentCol = 0; currentCol < 9; currentCol++) {
            const newIndex: number = 9 * (9 - currentCol) - (9 - currentRow);
            const currentInd: number = currentCol + 9 * currentRow;
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
    let result: string = board.slice();
    return result;
  }

  swapSmallRows(board: string): string {
    let result: string = board.slice();
    return result;
  }

  swapAreaColumns(board: string): string {
    let result: string = board.slice();
    return result;
  }

  swapAreaRows(board: string): string {
    let result: string = board.slice();
    return result;
  }

  randomizeBoard(board: string): string {
    let result: string = board.slice();
    result = this.rotateBoard(board);
    // const randomizeFunctions: ((board: string) => string)[] = [
    //   this.rotateBoard,
    //   this.swapSmallColumns,
    //   this.swapSmallRows,
    //   this.swapAreaColumns,
    //   this.swapAreaRows,
    // ];

    // for (let i = 0; i < 10; i++) {
    //   const func: (board: string) => void = getRandomElem(randomizeFunctions);
    //   func(this._secret);
    // }

    return result;
  }
  // private generateSecret(): void {
  //   // for (let i = 0; i < 9; i++) {
  //   //   let tempNumbers: number[] = this.numbers.slice();
  //   //   for (let j = 0; j < 9; j++) {
  //   //     if (!i) {
  //   //       const tempNum = getRandomElem(tempNumbers);
  //   //       this._secret = `${this._secret}${tempNum}`;
  //   //       tempNumbers = tempNumbers.filter((n: number) => n !== tempNum);
  //   //     } else {
  //   //       // get numbers form square
  //   //       // get numbers from row
  //   //       // get number from square
  //   //     }
  //   //   }
  //   // }

  //   for (let row = 0; row < 9; row++) {
  //     let tempNumbers: number[] = this.numbers.slice();

  //     // for (let col = 0; col < 9; col++) {
  //     //   const rowUsed = this.matrix[row].filter((n: number) => n !== null);
  //     //   const colUsed = [
  //     //     this.matrix[0][col],
  //     //     this.matrix[1][col],
  //     //     this.matrix[2][col],
  //     //     this.matrix[3][col],
  //     //     this.matrix[4][col],
  //     //     this.matrix[5][col],
  //     //     this.matrix[6][col],
  //     //     this.matrix[7][col],
  //     //     this.matrix[8][col],
  //     //   ];
  //     //   const usedNumbers = [...rowUsed, ...colUsed];
  //     //   let difference = tempNumbers.filter((x) => !usedNumbers.includes(x));
  //     //   const tempNum = getRandomElem(difference);
  //     //   this.matrix[row][col] = tempNum;
  //     //   tempNumbers = tempNumbers.filter((n: number) => n !== tempNum);
  //     // }
  //   }
  // }

  // generateSquare(rowRestrictions: any[] = [], colRestrictions: any[] = []) {
  //   for (let i = 0; i < 9; i++) {
  //     let tempNumbers: number[] = this.numbers.slice();
  //     for (let j = 0; j < 9; j++) {
  //       if (!i) {
  //         const tempNum = getRandomElem(tempNumbers);
  //         this._secret = `${this._secret}${tempNum}`;
  //         tempNumbers = tempNumbers.filter((n: number) => n !== tempNum);
  //       } else {
  //         // get numbers form square
  //         // get numbers from row
  //         // get number from square
  //       }
  //     }
  //   }
  // }

  // generateKey() {
  //   let tempNumbers: number[] = this.numbers.slice();
  //   for (let j = 0; j < 9; j++) {
  //     const tempNum = getRandomElem(tempNumbers);
  //     this._key = `${this._key}${tempNum}`;
  //     tempNumbers = tempNumbers.filter((n: number) => n !== tempNum);
  //   }
  // }

  // generateBoard() {
  //   let rowRestircted: number[] = [];
  //   let colRestircted: number[] = [];
  //   let squareRestricted: number[] = [];
  //   for (let row = 0; row < 9; row++) {
  //     for (let col = 0; col < 9; col++) {
  //       let availableRowNums: number[] = this.numbers.slice();

  //       // if (row === 1 && col === 7) {
  //       //   debugger;
  //       // }
  //       rowRestircted = getRowRestricted(row, this._secret);
  //       colRestircted = getColRestricted(col, this._secret);
  //       squareRestricted = getSquareRestricted(row, col, this._secret);
  //       const restrictedNums: number[] = [
  //         ...rowRestircted,
  //         ...colRestircted,
  //         ...squareRestricted,
  //       ].reduce(
  //         (acc: number[], num: number) =>
  //           acc.includes(num) ? acc : [...acc, num],
  //         []
  //       );
  //       availableRowNums = removeFromArray(availableRowNums, restrictedNums);
  //       const tempNum = getRandomElem(availableRowNums);
  //       if (!tempNum?.toString) {
  //         debugger;
  //       }
  //       this._secret = `${this._secret.slice(
  //         0,
  //         9 * row + col
  //       )}${tempNum.toString()}${this._secret.slice(9 * row + col + 1)}`;
  //       console.log(this._secret, this._secret.length);
  //       // availableRowNums = availableRowNums.filter(
  //       //   (n: number) => n !== tempNum
  //       // );
  //       console.log(`col ${col} row ${row}`);
  //     }
  //     rowRestircted = [];
  //     colRestircted = [];
  //     squareRestricted = [];
  //     // availableRowNums = this.numbers.slice();
  //     console.log(`row ${row}`);
  //   }
  //   for (let i = 0; i < 9; i++) {
  //     const a: string[] = this._secret.slice(i * 9, i * 9 + 9).split("");
  //     this.board.push(a);
  //   }
  //   console.log(this.board);
  // }

  checkBoard() {
    console.log("checkBoard");
    return null;
  }
}
