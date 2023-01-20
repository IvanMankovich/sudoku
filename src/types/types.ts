export enum DifficulityLevel {
  veryEasy = "veryEasy",
  easy = "easy",
  medium = "medium",
  hard = "hard",
  extraHard = "extraHard",
  insane = "insane",
}

export enum RotationLevel {
  zero = 0,
  quarter = 90,
  half = 180,
  halfAndQuarter = 270,
}

export interface DifficultyParameters {
  [DifficulityLevel.veryEasy]: [number, number];
  [DifficulityLevel.easy]: [number, number];
  [DifficulityLevel.medium]: [number, number];
  [DifficulityLevel.hard]: [number, number];
  [DifficulityLevel.extraHard]: [number, number];
  [DifficulityLevel.insane]: [number, number];
}

export enum GameState {
  initial = "initial",
  inProgress = "inProgress",
  paused = "paused",
  ended = "ended",
}

export interface NumbersDictionary {
  [x: string]: number;
}

export enum Theme {
  light = "light",
  dark = "dark",
}
