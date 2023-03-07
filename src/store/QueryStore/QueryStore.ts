import { Option } from "@components/MultiDropdown";
import rootStore from "@store/RootStore";
import { ILocalStore } from "@utils/useLocalStote";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_search" | "_type";

export interface IQueryStore {
  setSearch(search: string): void;
  setType(type: Option[]): void;
  search: string;
  type: Option[];
}

export default class QueryStore implements IQueryStore, ILocalStore {
  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _search: observable,
      _type: observable.ref,
      search: computed,
      type: computed,
      setSearch: action.bound,
      setType: action.bound,
    });
  }
  private _search: string = "";
  private _type: Option[] = [];

  setSearch(search: string): void {
    this._search = search;
    rootStore.query.changeParams("query", this._search);
  }

  setType(type: Option[]): void {
    this._type = type;
    const typeSrt = this._type.map((item) => item.key).join(" ");
    rootStore.query.changeParams("type", typeSrt);
  }

  get search(): string {
    return this._search;
  }

  get type(): Option[] {
    return this._type;
  }

  destroy(): void {
    this._search = "";
    this._type = [];
  }
}
