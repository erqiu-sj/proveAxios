import 'reflect-metadata';
import { interceptorsKey } from '../types';
import { createInterceptorsKey } from '../utils';
export function interceptorsRequestSuccess() {
    return (target, key, desc) => {
        createInterceptorsKey(target, desc.value, interceptorsKey.interceptorsRequestSuccess);
        return desc;
    };
}
export function interceptorsRequestFail() {
    return (target, key, desc) => {
        createInterceptorsKey(target, desc.value, interceptorsKey.interceptorsRequestFail);
        return desc;
    };
}
