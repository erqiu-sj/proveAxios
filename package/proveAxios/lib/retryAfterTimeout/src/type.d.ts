import { customConfiguration } from '@zealforchange/proveaxios';
import { AxiosResponse } from 'axios';
export interface retryAfterTimeoutOps<T extends object> {
    numberOfRetries?: number;
    retryBeforeCb?: (params: customConfiguration<T>) => customConfiguration<T>;
    retryAfterCb?: (params: AxiosResponse | undefined) => void;
}
