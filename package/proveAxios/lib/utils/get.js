import { getInterceptorsKey } from '.';
import { PARTIAL_INSTANCE } from '../constants';
import { interceptorsKey } from '../types';
/**
 * @description 获取实例配置
 * @param target
 * @returns
 */
export function getLocalInstance(target) {
    return Reflect.getMetadata(PARTIAL_INSTANCE, target);
}
/**
 * @description 设置实例配置中的config字段
 * @param target
 * @param conf
 * @returns
 */
export function setLocalInstanceConfig(target, conf) {
    const getInstance = getLocalInstance(target);
    Reflect.defineMetadata(PARTIAL_INSTANCE, Object.assign(Object.assign({}, getInstance), { config: conf }), target);
}
/**
 * @description 将拦截器注入到实例配置中
 * @param target
 * @param conf
 * @returns
 */
export function setInterceptor(target, conf) {
    const getInstance = getLocalInstance(target);
    Reflect.defineMetadata(PARTIAL_INSTANCE, Object.assign(Object.assign({}, getInstance), { interceptor: Object.assign({}, conf) }), target);
    return conf;
}
/**
 * @description 收集拦截器
 * @param target
 */
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
