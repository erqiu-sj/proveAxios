import { AxiosRequestConfig } from 'axios';
import 'reflect-metadata';
export declare type customConfiguration<T extends object> = AxiosRequestConfig & T;
/**
 * @description 初始化实例配置，并且获取所有装饰器
 */
export declare function initializationAxios<T extends object>(conf?: customConfiguration<T>): (target: Function) => void;
