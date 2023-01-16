import { makeAutoObservable } from "mobx";
import { GameState } from "../types/types";
import { RootStore } from "./RootStore";

export class GeneralStore {
  root: RootStore;
  gameState: GameState;

  constructor(root: RootStore) {
    this.root = root;
    this.gameState = GameState.initial;
    makeAutoObservable(this);
  }

  setGameState(state: GameState): void {
    this.gameState = state;
  }
}
