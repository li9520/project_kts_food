import { RecipeItemModel } from "@store/models/Food";

export interface IFoodStore {
  getOrganizationRecipeList(search: string, type: string): Promise<void>;
  list: RecipeItemModel[];
  meta: Meta;
}

export enum Meta {
  initial = "initial", // Процесс не начат
  loading = "loading", // В процессе загрузки
  error = "error", // Завершилось с ошибкой
  success = "success", // Завершилось успешно
}
