import queryString from "query-string";

//export const API_KEY = "4ea0ec47d5fb42fea8b7520ea4838d26";
export const API_KEY = "2593c1f9f006463c98678507137c57e2";

export const domen = "https://api.spoonacular.com";

export const URLmap = {
  list: (params: {
    apiKey: string;
    number: number;
    query?: string;
    addRecipeNutrition: boolean;
  }) => `/recipes/complexSearch?${queryString.stringify(params)}`,

  recipe: (
    id: string,
    params: {
      apiKey: string;
      includeNutrition: boolean;
    }
  ) => `/recipes/${id}/information?${queryString.stringify(params)}`,

  ingredientImg: (image: string) =>
    `https://spoonacular.com/cdn/ingredients_100x100/${image}`,
};
