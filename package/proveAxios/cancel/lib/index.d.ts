import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosCanceler, HEADER_KEY } from './core';
declare const ownAxiosCanceler: AxiosCanceler;
declare const cancelDisplayName = "cancel";
export declare class Cancel {
    static req(conf: AxiosRequestConfig): AxiosRequestConfig<any>;
    static res(response: AxiosResponse): Promise<AxiosResponse<any, any>>;
    static resInstall(res: AxiosResponse): boolean;
    static reqInstaller(conf: AxiosRequestConfig): boolean;
}
export { HEADER_KEY, ownAxiosCanceler, cancelDisplayName };
