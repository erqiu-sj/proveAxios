import { AxiosRequestConfig } from 'axios';
import 'reflect-metadata';
export declare type customConfiguration<T extends object> = AxiosRequestConfig & T;
export declare function initializationAxios<T extends object>(conf?: customConfiguration<T>): (target: Function) => void;
