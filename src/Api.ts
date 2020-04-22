import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import rateLimit from "axios-rate-limit";
import { RedisStore, setup } from "axios-cache-adapter";
const redis = require("redis");

export interface ApiOptions {
  withCache?: boolean;
  limit?: {
    maxRequests: number;
    perMilliseconds: number;
  };
}

export class Api {
  private api: AxiosInstance;

  public constructor(options: ApiOptions, config?: AxiosRequestConfig) {
    let api: AxiosInstance;
    if (options?.withCache) {
      api = this.getInstanceWithCache();
    } else {
      api = axios.create();
    }
    if (options?.limit) {
      api = rateLimit(api, options.limit);
    }
    this.api = api;
    // this.api = axios.create(config);
    this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param,
    }));
  }

  private getInstanceWithCache = () => {
    const client = redis.createClient({
      url: "redis://localhost:6379",
    });
    const store = new RedisStore(client);
    return setup({
      cache: {
        maxAge: 24 * 60 * 60 * 1000,
        store,
      },
    });
  };

  protected getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  protected request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.api.request(config);
  }

  protected get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  protected delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  protected head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.head(url, config);
  }

  protected post<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  protected put<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  protected patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }
}
