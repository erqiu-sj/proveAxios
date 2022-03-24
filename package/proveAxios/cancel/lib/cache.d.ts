import { CancelConfig } from "..";
export declare const cacheConfigEnableCacheKey = "enableCache";
export declare const cacheConfigExpirationKey = "expiration";
export interface CacheConfig {
    [cacheConfigExpirationKey]?: number;
    [cacheConfigEnableCacheKey]?: boolean;
}
declare type generateExpirationTimeType = 'min' | 'hour' | 'second';
export declare function generateExpirationTime(type: generateExpirationTimeType, time: number): number;
export declare function isItExpired(compareTime: number, curTime?: number): boolean;
interface expirationMapType extends CacheConfig {
    cacheDate?: unknown;
    preAdded?: boolean;
}
export declare function cancelHandler(conf: CancelConfig, msg: string): void;
interface preAddACacheData extends CacheConfig {
}
export declare class Cache {
    preAddACache(rule: string, payload: preAddACacheData): void;
    fillTheCache(rule: string, data: unknown): void;
    removeCache(rule: string): void;
    hasCache(rule: string): boolean;
    cachedAndAvailable(rule: string): boolean;
    getCache(rule: string): expirationMapType | undefined;
}
export {};
