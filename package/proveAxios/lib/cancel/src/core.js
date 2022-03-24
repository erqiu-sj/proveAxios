import axios from 'axios';
import { isItExpired } from './cache';
function isFunction(val) {
    return typeof val === 'function';
}
let pendingMap = new Map();
export const cutter = "$";
export const expirationNull = 'expirationNull';
export const notExpiredCode = 'notExpiredCode';
export const expirationCode = 'expirationCode';
export const HEADER_KEY = 'extraCancellation';
export class AxiosCanceler {
    constructor(rule) {
        this.cancelRequestRule = () => [];
        this.cancelRequestRule = rule;
    }
    setCancelRequestRule(handler) {
        this.cancelRequestRule = handler;
    }
    addPending(config) {
        this.removePending(config);
        let url = this.cancelRequestRule(config).join(cutter);
        config.cancelToken =
            config.cancelToken ||
                new axios.CancelToken(cancel => {
                    if (!pendingMap.has(url)) {
                        pendingMap.set(url, cancel);
                    }
                });
    }
    removeAllPending() {
        pendingMap.forEach(cancel => {
            cancel && isFunction(cancel) && cancel();
        });
        pendingMap.clear();
    }
    removePending(config) {
        let url = this.cancelRequestRule(config).join(cutter);
        if (pendingMap.has(url)) {
            const cancel = pendingMap.get(url);
            console.log('what end');
            cancel && cancel(url);
            pendingMap.delete(url);
        }
    }
    getExpiration(url) {
        const expiration = url.split(cutter).at(-1);
        if (!expiration)
            return null;
        if (expiration === expirationNull)
            return true;
        return isItExpired(parseInt(expiration));
    }
    reset() {
        pendingMap = new Map();
    }
}
