import { getInterceptorsKey } from '.';
import { PARTIAL_INSTANCE } from '../constants';
import { interceptorsKey } from '../types';
export function getLocalInstance(target) {
    return Reflect.getMetadata(PARTIAL_INSTANCE, target);
}
export function setLocalInstanceConfig(target, conf) {
    const getInstance = getLocalInstance(target);
    Reflect.defineMetadata(PARTIAL_INSTANCE, Object.assign(Object.assign({}, getInstance), { config: conf }), target);
}
export function setInterceptor(target, conf) {
    const getInstance = getLocalInstance(target);
    Reflect.defineMetadata(PARTIAL_INSTANCE, Object.assign(Object.assign({}, getInstance), { interceptor: Object.assign({}, conf) }), target);
    return conf;
}
export function collectionInterceptor(target) {
    return setInterceptor(target, {
        request: {
            successCb: getInterceptorsKey(target, interceptorsKey.interceptorsRequestSuccess),
            failCb: getInterceptorsKey(target, interceptorsKey.interceptorsRequestFail),
        },
        response: {
            successCb: getInterceptorsKey(target, interceptorsKey.responseSuccess),
            failCb: getInterceptorsKey(target, interceptorsKey.responseFail),
        },
    });
}
