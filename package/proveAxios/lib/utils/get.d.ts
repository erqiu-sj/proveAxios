import { customConfiguration } from '../instance';
import { instanceConfig } from '../types';
export declare function getLocalInstance(target: Object): instanceConfig<object>;
export declare function setLocalInstanceConfig(target: Object, conf?: customConfiguration<object>): void;
export declare function setInterceptor(target: Object, conf: instanceConfig<object>['interceptor']): instanceConfig<object>['interceptor'];
export declare function collectionInterceptor(target: Object): instanceConfig<object>['interceptor'];
