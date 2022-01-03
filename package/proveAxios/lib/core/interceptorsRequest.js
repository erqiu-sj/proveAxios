import 'reflect-metadata';
import { interceptorsKey } from '../types';
import { createInterceptorsKey } from '../utils';
export function interceptorsRequestSuccess() {
    return function (target, key, desc) {
        createInterceptorsKey(target, desc.value, interceptorsKey.interceptorsRequestSuccess);
        return desc;
    };
}
export function interceptorsRequestFail() {
    return function (target, key, desc) {
        createInterceptorsKey(target, desc.value, interceptorsKey.interceptorsRequestFail);
        return desc;
    };
}
//# sourceMappingURL=interceptorsRequest.js.map