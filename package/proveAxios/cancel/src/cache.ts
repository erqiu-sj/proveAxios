/*
 * @Author: 邱狮杰
 * @Date: 2022-03-09 21:02:39
 * @LastEditTime: 2022-03-21 17:55:55
 * @Description: 
 * @FilePath: /proveAxios/package/proveAxios/cancel/src/cache.ts
 */


export interface CacheConfig {
    expiration?: number // 过期时间
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
