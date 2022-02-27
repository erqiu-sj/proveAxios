import { interceptorsKey } from '../types';
export declare function getInterceptorsKey<T extends Function>(target: Object, type: keyof typeof interceptorsKey): T;
export declare function createInterceptorsKey(target: Object, func: Function, type: keyof typeof interceptorsKey): void;
