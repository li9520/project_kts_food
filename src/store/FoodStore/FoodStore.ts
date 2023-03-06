import { API_KEY, domen, URLmap } from "@config/api";
import ApiStore, { HTTPMethod } from "@store/ApiStore";
import {
  normalizeRecipeItemModel,
  RecipeItemApi,
  RecipeItemModel,
} from "@store/models/Food";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import { ILocalStore } from "@utils/useLocalStote";
import {
  reaction,
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { IFoodStore, Meta } from "./types";

type PrivateFields = "_list" | "_meta";
const numberRecipes = 100;

export default class FoodStore implements IFoodStore, ILocalStore {
  constructor() {
    makeObservable<FoodStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationRecipeList: action,
    });
  }

  private _list: CollectionModel<number, RecipeItemModel> =
    getInitialCollectionModel();

  private _meta: Meta = Meta.initial;

  private readonly _apiStore = new ApiStore(domen);

  get list(): RecipeItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationRecipeList(
    search: string = "",
    type: string = ""
  ): Promise<void> {
    const getUrl = URLmap.list;
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this._apiStore.request<{ results: RecipeItemApi[] }>(
      {
        method: HTTPMethod.GET,
        endpoint: getUrl({
          query: search,
          type: type,
          apiKey: API_KEY,
          number: numberRecipes,
          addRecipeNutrition: true,
        }),
      }
    );
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const list: RecipeItemModel[] = [];
        for (const item of response.data.results) {
          list.push(normalizeRecipeItemModel(item));
        }
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    this._qpReaction();
    this._typeReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    async (search) => {
      const type = rootStore.query.getParam("type");
      await this.getOrganizationRecipeList(search as string, type as string);
    }
  );

  private readonly _typeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("type"),
    async (type) => {
      const search = rootStore.query.getParam("search");
      await this.getOrganizationRecipeList(search as string, type as string);
    }
  );
}
