import { setLocalInstanceConfig, collectionInterceptor } from './utils/get';
import 'reflect-metadata';
export function initializationAxios(conf) {
    return (target) => {
        setLocalInstanceConfig(target, conf);
        collectionInterceptor(target);
    };
}
