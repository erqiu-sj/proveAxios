import { customConfiguration } from '@zealforchange/proveaxios';
import { AxiosInstance } from 'axios';
import { retryAfterTimeoutOps } from './type';
declare type config = {
    config: customConfiguration<retryAfterTimeoutOps<object>>;
};
export declare class RetryCore {
    private conf;
    constructor(conf: config | unknown, instance?: AxiosInstance);
    private checkField;
    runCallBack(cbKey: keyof Omit<retryAfterTimeoutOps<object>, 'numberOfRetries'>, payload?: any): Promise<this>;
    retryBeforeCbCb(): Promise<this>;
    private setConf;
    retrying(): Promise<unknown>;
    private checkNumberOfRetries;
}
export {};
