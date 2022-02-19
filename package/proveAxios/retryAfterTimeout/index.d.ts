import { customConfiguration } from '@zealforchange/proveaxios'
import { AxiosResponse } from 'axios'

export declare interface retryAfterTimeoutOps<T extends object> {
  numberOfRetries?: number // 如要重试此为必填项
  retryBeforeCb?: (params: customConfiguration<T>) => customConfiguration<T> // 重试前
  retryAfterCb?: (params: AxiosResponse | undefined) => void // 重试后
}

export declare class RetryAfterTimeout {
  static resErr(err: unknown): Promise<unknown>
  static resErrInstall(err: any): boolean
}
