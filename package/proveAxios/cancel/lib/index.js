var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { decisionInstaller, dynamicModule, dynamicModuleErrorInstall, dynamicModuleSuccessInstall, interceptorsRequestSuccess, interceptorsResponseFail, interceptorsResponseSuccess, priority } from '@zealforchange/proveaxios';
import { Cache, cacheConfigEnableCacheKey, cacheConfigExpirationKey, cancelHandler, generateExpirationTime } from './cache';
import { AxiosCanceler, cutter, expirationNull, HEADER_KEY, notExpiredCode } from './core';
export const getPendingUrl = (config) => { var _a; return [config.method, config.url, JSON.stringify(config.data), JSON.stringify(config.params), (_a = config.expiration) !== null && _a !== void 0 ? _a : expirationNull]; };
let userCancelRequestRule = null;
const ownAxiosCanceler = new AxiosCanceler(userCancelRequestRule || getPendingUrl);
const cancelDisplayName = 'cancel';
const cacheer = new Cache();
export function updateCancelConfig(conf) {
    userCancelRequestRule = conf.cancelRequestRule || null;
}
function findHeader(conf) {
    const headers = Reflect.get(conf.headers, HEADER_KEY);
    if (headers === HEADER_KEY)
        return true;
    return false;
}
function findCacheParameter(conf) {
    return Reflect.has(conf, cacheConfigEnableCacheKey) || Reflect.has(conf, cacheConfigExpirationKey);
}
let Cancel = class Cancel {
    static resFail(err) {
        if (err instanceof Object && err && Reflect.has(err, 'message')) {
            const errMessage = err.message;
            if (/notExpiredCode/g.test(errMessage)) {
                const rule = errMessage.replace(/notExpiredCode/g, '');
                const curCache = cacheer.getCache(rule);
                return curCache === null || curCache === void 0 ? void 0 : curCache.cacheDate;
            }
            return err;
        }
        return err;
    }
    static req(conf) {
        const handler = conf.cancelRequestRule || userCancelRequestRule || getPendingUrl;
        if (findCacheParameter(conf)) {
            const rule = handler(conf).join(cutter);
            if ((conf.enableCache || !cacheer.hasCache(rule)) && conf.expiration) {
                cacheer.preAddACache(rule, { expiration: conf.expiration });
            }
            if (conf.enableCache && cacheer.cachedAndAvailable(rule)) {
                cancelHandler(conf, `${notExpiredCode}${rule}`);
            }
        }
        if (findHeader(conf)) {
            ownAxiosCanceler.setCancelRequestRule(handler);
            ownAxiosCanceler.addPending(conf);
        }
        return conf;
    }
    static res(response) {
        const reqConfig = response.config;
        if (findCacheParameter(reqConfig)) {
            const handler = reqConfig.cancelRequestRule || userCancelRequestRule || getPendingUrl;
            cacheer.fillTheCache(handler(reqConfig).join(cutter), response.data);
        }
        if (findHeader(reqConfig)) {
            response.config && ownAxiosCanceler.removePending(response.config);
        }
        return Promise.resolve(response);
    }
    static resInstall(conf) {
        return true;
    }
    static resSuc(conf) {
        return true;
    }
    static reqInstaller(conf) {
        return findHeader(conf) || findCacheParameter(conf);
    }
};
__decorate([
    interceptorsResponseFail(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Cancel, "resFail", null);
__decorate([
    interceptorsRequestSuccess(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Cancel, "req", null);
__decorate([
    interceptorsResponseSuccess(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Cancel, "res", null);
__decorate([
    dynamicModuleErrorInstall(decisionInstaller.installResFail),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Cancel, "resInstall", null);
__decorate([
    dynamicModuleSuccessInstall(decisionInstaller.installResSuc),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Cancel, "resSuc", null);
__decorate([
    dynamicModuleSuccessInstall(decisionInstaller.installReqSuc),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], Cancel, "reqInstaller", null);
Cancel = __decorate([
    dynamicModule({ priority: priority.TOP, displayName: cancelDisplayName })
], Cancel);
export { Cancel };
export { HEADER_KEY, ownAxiosCanceler, cancelDisplayName, generateExpirationTime, notExpiredCode };
