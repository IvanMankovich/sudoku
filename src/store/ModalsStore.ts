import { makeAutoObservable } from "mobx";
import { ReactNode } from "react";
import { RootStore } from "./RootStore";

export class ModalsStore {
  root: RootStore;
  modal: ReactNode | null;

  constructor(root: RootStore) {
    this.root = root;
    this.modal = null;
    makeAutoObservable(this);
  }

  setModal(modal: ReactNode | null): void {
    this.modal = modal;
  }
}
