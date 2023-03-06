import axios from "axios";

export enum HTTPMethod {
  GET = "get",
}

export type ApiResponse<T> = {
  data: T | any;
  success: boolean;
};

export default class ApiStore {
  private _baseUrl: string;
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _createUrl(endpoint: string) {
    return `${this._baseUrl}${endpoint}`;
  }

  async request<T>({
    method,
    endpoint,
  }: {
    method: HTTPMethod;
    endpoint: string;
  }): Promise<ApiResponse<T>> {
    const result: ApiResponse<T> = {
      data: null,
      success: false,
    };
    try {
      const { data } = await axios({
        method: method,
        url: this._createUrl(endpoint),
      });

      result.data = data;
      result.success = true;
      return result;
    } catch (err) {
      return result;
    }
  }
}
