import rootStore from "@store/RootStore";
import { ILocalStore } from "@utils/useLocalStote";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_currentPage";

export interface IPaginateStore {
  currentPage: number;
  next(): void;
  prev(): void;
}

export default class PaginateStore implements IPaginateStore, ILocalStore {
  constructor() {
    makeObservable<PaginateStore, PrivateFields>(this, {
      _currentPage: observable,
      currentPage: computed,
      next: action.bound,
      prev: action.bound,
    });
  }
  _currentPage: number = 1;

  next(): void {
    this._currentPage = this._currentPage + 1;
    rootStore.query.changeParams("page", String(this._currentPage));
  }

  prev(): void {
    this._currentPage = this._currentPage - 1;
    rootStore.query.changeParams("page", String(this._currentPage));
  }

  get currentPage(): number {
    return this._currentPage;
  }

  destroy(): void {
    this._currentPage = 1;
  }
}
