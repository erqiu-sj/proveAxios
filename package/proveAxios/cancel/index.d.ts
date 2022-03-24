import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { customConfiguration } from '@zealforchange/proveaxios';
export interface CacheConfig {
  expiration?: number;
}
declare type generateExpirationTimeType = 'min' | 'hour' | 'second';
/**
   *
   * @param type
   * @param time
   * @returns  { number }
   */
export declare function generateExpirationTime(type: generateExpirationTimeType, time: number): number;
/**
   * @description 是否过期
   * @param compareTime  对比时间
   * @param curTime  当前时间
   * @returns  { boolean }
   */
export declare function isItExpired(compareTime: number, curTime?: number): boolean;
export declare const notExpiredCode = "notExpiredCode";
export declare const expirationCode = "expirationCode";
export declare const HEADER_KEY = "extraCancellation";
export declare class AxiosCanceler extends Cache {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: CancelConfig): void;
  /**
   * @description: Clear all pending
   */
  removeAllPending(): void;
  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config: CancelConfig): void;
  getExpiration(url: string): boolean | null;
  /**
   * @description: reset
   */
  reset(): void;
}
declare const ownAxiosCanceler: AxiosCanceler;
declare const cancelDisplayName = "cancel";
export declare type CancelConfig = customConfiguration<CacheConfig>;
export declare class Cancel {
  static req(conf: CancelConfig): CancelConfig;
  static res(response: AxiosResponse): Promise<AxiosResponse<any, any>>;
  static resInstall(res: AxiosResponse): boolean;
  static reqInstaller(conf: AxiosRequestConfig): boolean;
}
export { HEADER_KEY, ownAxiosCanceler, cancelDisplayName, generateExpirationTime, notExpiredCode };
