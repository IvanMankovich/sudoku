import { makeAutoObservable } from "mobx";
import { GameState, Theme } from "../types/types";
import { RootStore } from "./RootStore";

export class GeneralStore {
  root: RootStore;
  gameState: GameState;
  theme: Theme;

  constructor(root: RootStore) {
    this.root = root;
    this.gameState = GameState.initial;
    this.theme = Theme.bright;
    makeAutoObservable(this);
  }

  private setGameState(state: GameState): void {
    this.gameState = state;
  }

  setInitialState(): void {
    this.setGameState(GameState.initial);
  }

  setInProgressState(): void {
    this.setGameState(GameState.inProgress);
  }

  setPausedState(): void {
    this.setGameState(GameState.paused);
  }

  setEndedState(): void {
    this.setGameState(GameState.ended);
  }
}
