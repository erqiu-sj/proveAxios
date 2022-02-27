import 'reflect-metadata';
import { interceptorsKey } from '../types';
import { createInterceptorsKey } from '../utils';
export function interceptorsResponseSuccess() {
    return (target, key, desc) => {
        createInterceptorsKey(target, desc.value, interceptorsKey.responseSuccess);
        return desc;
    };
}
export function interceptorsResponseFail() {
    return (target, key, desc) => {
        createInterceptorsKey(target, desc.value, interceptorsKey.responseFail);
        return desc;
    };
}
