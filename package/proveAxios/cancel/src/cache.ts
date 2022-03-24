/*
 * @Author: 邱狮杰
 * @Date: 2022-03-09 21:02:39
 * @LastEditTime: 2022-03-22 14:15:27
 * @Description: 
 * @FilePath: /proveAxios/package/proveAxios/cancel/src/cache.ts
 */

import axios from "axios"
import { CancelConfig } from ".."


export const cacheConfigEnableCacheKey = 'enableCache'
export const cacheConfigExpirationKey = 'expiration'

export interface CacheConfig {
    [cacheConfigExpirationKey]?: number // 过期时间
    [cacheConfigEnableCacheKey]?: boolean
}

type generateExpirationTimeType = 'min' | 'hour' | 'second'
/**
     * 
     * @param type 
     * @param time 
     * @returns  { number }
     */
export function generateExpirationTime(type: generateExpirationTimeType, time: number): number {
    const timer = new Date()
    if (type === 'hour') return timer.setHours(timer.getHours() + time)
    if (type === 'min') return timer.setMinutes(timer.getMinutes() + time)
    if (type === 'second') return timer.setSeconds(timer.getSeconds() + time)
    return 0
}
/**
     * @description 是否过期
     * @param compareTime  对比时间
     * @param curTime  当前时间
     * @returns  { boolean }
     */
export function isItExpired(compareTime: number, curTime?: number): boolean {
    const cur = curTime ?? new Date().getTime()
    if (compareTime >= cur) return false
    return true
}
interface expirationMapType extends CacheConfig {

    cacheDate?: unknown // 缓存数据
    // 预新增完毕?
    // 新增时为false
    // 但请求回来时该字段将一直为true
    preAdded?: boolean
}

export function cancelHandler(conf: CancelConfig, msg: string) {
    const token = axios.CancelToken
    const source = token.source()
    conf.cancelToken = source.token
    source.cancel(msg)
}
const expirationMap = new Map<string, expirationMapType>()

interface preAddACacheData extends CacheConfig {
}
export class Cache {
    // 预新增缓存
    preAddACache(rule: string, payload: preAddACacheData) {
        if (expirationMap.has(rule)) return
        expirationMap.set(rule, { preAdded: false, expiration: payload.expiration })
    }

    // 填充缓存
    fillTheCache(rule: string, data: unknown) {
        if (!expirationMap.has(rule)) return
        const cur = expirationMap.get(rule)
        if (!cur) return
        expirationMap.set(rule, { cacheDate: data, ...cur, preAdded: true })
    }

    // 删除缓存
    removeCache(rule: string) {
        if (!expirationMap.has(rule)) return
        expirationMap.delete(rule)
    }

    // 是否缓存
    hasCache(rule: string): boolean {
        return expirationMap.has(rule)
    }

    // 有缓存并且可用
    cachedAndAvailable(rule: string): boolean {
        const cur = expirationMap.get(rule)
        if (this.hasCache(rule) && cur && cur.preAdded && cur.expiration && !isItExpired(cur.expiration)) return true
        if (this.hasCache(rule) && cur && cur.preAdded && cur.expiration && isItExpired(cur.expiration)) expirationMap.delete(rule)
        return false
    }

    getCache(rule: string): expirationMapType | undefined {
        return expirationMap.get(rule)
    }
}