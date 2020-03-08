import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import rateLimit from "axios-rate-limit";
import {  RedisStore, setup } from "axios-cache-adapter";
const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379"
});
const store = new RedisStore(client);
const api = setup({
    // `axios-cache-adapter` options
    cache: {
      maxAge: 24 * 60 * 60 * 1000,
      store 
    }
  })

api.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    console.log(error);
    return Promise.reject(error);
  }
);

export class Api {
  private api: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    this.api = rateLimit(api, {
      maxRequests: 100,
      perMilliseconds: 1000
    });
    // this.api = axios.create(config);
    this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param
    }));
  }

  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.api.request(config);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  public head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.head(url, config);
  }

  public post<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  public put<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  public patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }
}
