import { ILocalStore } from "@utils/useLocalStote";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_query";

export interface IQueryStore {
  setQuery(value: string): void;
  query: string;
}

export default class QueryStore implements IQueryStore, ILocalStore {
  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _query: observable,
      query: computed,
      setQuery: action,
    });
  }
  _query: string = "";

  setQuery(value: string): void {
    this._query = value;
  }

  get query(): string {
    return this._query;
  }

  destroy(): void {
    //
  }
}
