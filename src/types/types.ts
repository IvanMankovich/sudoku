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

export interface Difficulity {
  [DifficulityLevel.veryEasy]: [number, number];
  [DifficulityLevel.easy]: [number, number];
  [DifficulityLevel.medium]: [number, number];
  [DifficulityLevel.hard]: [number, number];
  [DifficulityLevel.extraHard]: [number, number];
  [DifficulityLevel.insane]: [number, number];
}
