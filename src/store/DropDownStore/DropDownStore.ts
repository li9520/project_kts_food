import { ILocalStore } from "@utils/useLocalStote";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_isOpen";

export interface IDropDownStore {
  toggleIsOpen(): void;
  isOpen: boolean;
}

export default class DropDownStore implements IDropDownStore, ILocalStore {
  constructor() {
    makeObservable<DropDownStore, PrivateFields>(this, {
      _isOpen: observable,
      isOpen: computed,
      toggleIsOpen: action.bound,
    });
  }
  private _isOpen: boolean = false;

  toggleIsOpen(): void {
    this._isOpen = !this._isOpen;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  destroy(): void {
    this._isOpen = false;
  }
}
