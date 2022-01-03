import { setLocalInstanceConfig, collectionInterceptor } from './utils/get';
import 'reflect-metadata';
/**
 * @description 初始化实例配置，并且获取所有装饰器
 */
export function initializationAxios(conf) {
    return function (target) {
        // 设置实例配置
        setLocalInstanceConfig(target, conf);
        // 获取所有拦截器
        collectionInterceptor(target);
    };
}
//# sourceMappingURL=instance.js.map