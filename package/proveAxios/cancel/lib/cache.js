import axios from "axios";
export const cacheConfigEnableCacheKey = 'enableCache';
export const cacheConfigExpirationKey = 'expiration';
export function generateExpirationTime(type, time) {
    const timer = new Date();
    if (type === 'hour')
        return timer.setHours(timer.getHours() + time);
    if (type === 'min')
        return timer.setMinutes(timer.getMinutes() + time);
    if (type === 'second')
        return timer.setSeconds(timer.getSeconds() + time);
    return 0;
}
export function isItExpired(compareTime, curTime) {
    const cur = curTime !== null && curTime !== void 0 ? curTime : new Date().getTime();
    if (compareTime >= cur)
        return false;
    return true;
}
export function cancelHandler(conf, msg) {
    const token = axios.CancelToken;
    const source = token.source();
    conf.cancelToken = source.token;
    source.cancel(msg);
}
const expirationMap = new Map();
export class Cache {
    preAddACache(rule, payload) {
        if (expirationMap.has(rule))
            return;
        expirationMap.set(rule, { preAdded: false, expiration: payload.expiration });
    }
    fillTheCache(rule, data) {
        if (!expirationMap.has(rule))
            return;
        const cur = expirationMap.get(rule);
        if (!cur)
            return;
        expirationMap.set(rule, Object.assign(Object.assign({ cacheDate: data }, cur), { preAdded: true }));
    }
    removeCache(rule) {
        if (!expirationMap.has(rule))
            return;
        expirationMap.delete(rule);
    }
    hasCache(rule) {
        return expirationMap.has(rule);
    }
    cachedAndAvailable(rule) {
        const cur = expirationMap.get(rule);
        if (this.hasCache(rule) && cur && cur.preAdded && cur.expiration && !isItExpired(cur.expiration))
            return true;
        if (this.hasCache(rule) && cur && cur.preAdded && cur.expiration && isItExpired(cur.expiration))
            expirationMap.delete(rule);
        return false;
    }
    getCache(rule) {
        return expirationMap.get(rule);
    }
}
