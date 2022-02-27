import { customConfiguration } from '../instance';
import { instanceConfig } from '../types';
/**
 * @description 获取实例配置
 * @param target
 * @returns
 */
export declare function getLocalInstance(target: Object): instanceConfig<object>;
/**
 * @description 设置实例配置中的config字段
 * @param target
 * @param conf
 * @returns
 */
export declare function setLocalInstanceConfig(target: Object, conf?: customConfiguration<object>): void;
/**
 * @description 将拦截器注入到实例配置中
 * @param target
 * @param conf
 * @returns
 */
export declare function setInterceptor(target: Object, conf: instanceConfig<object>['interceptor']): instanceConfig<object>['interceptor'];
/**
 * @description 收集拦截器
 * @param target
 */
export declare function collectionInterceptor(target: Object): instanceConfig<object>['interceptor'];
