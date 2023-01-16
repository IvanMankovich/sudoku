import { createContext } from "react";
import { BoardStore } from "./BoardStore";
import { GeneralStore } from "./GeneralStore";
import { ModalsStore } from "./ModalsStore";

export class RootStore {
  boardStore: BoardStore;
  generalStore: GeneralStore;
  modalsStore: ModalsStore;

  constructor() {
    this.boardStore = new BoardStore(this);
    this.generalStore = new GeneralStore(this);
    this.modalsStore = new ModalsStore(this);
  }
}

export const rootStore = new RootStore();
export const RootContext = createContext(rootStore);
