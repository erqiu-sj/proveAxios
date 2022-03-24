import { customConfiguration } from '@zealforchange/proveaxios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CacheConfig, generateExpirationTime } from './cache';
import { AxiosCanceler, HEADER_KEY, notExpiredCode } from './core';
export declare const getPendingUrl: updateCancelConf['cancelRequestRule'];
declare const ownAxiosCanceler: AxiosCanceler;
declare const cancelDisplayName = "cancel";
export declare type CancelConfig = customConfiguration<CacheConfig & Partial<updateCancelConf>>;
export interface updateCancelConf {
    cancelRequestRule: (conf: CancelConfig) => string[];
}
export declare function updateCancelConfig(conf: Partial<updateCancelConf>): void;
export declare class Cancel {
    static resFail(err: unknown): unknown;
    static req(conf: CancelConfig): CancelConfig;
    static res(response: AxiosResponse): Promise<AxiosResponse<any, any>>;
    static resInstall(conf: unknown): boolean;
    static resSuc(conf: AxiosRequestConfig): boolean;
    static reqInstaller(conf: CancelConfig): boolean;
}
export { HEADER_KEY, ownAxiosCanceler, cancelDisplayName, generateExpirationTime, notExpiredCode };
