import { Difficulity, DifficulityLevel } from "../types/types";

export const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const gridIndexes: number[] = [0, 1, 2];
export const difficulity: Difficulity = {
  [DifficulityLevel.veryEasy]: [50, 55],
  [DifficulityLevel.easy]: [44, 49],
  [DifficulityLevel.medium]: [38, 43],
  [DifficulityLevel.hard]: [32, 37],
  [DifficulityLevel.extraHard]: [26, 31],
  [DifficulityLevel.insane]: [20, 25],
};
