import { AxiosResponse } from "axios"

export declare const HEADER_KEY = 'extraCancellation'

export declare class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig): void

  /**
   * @description: Clear all pending
   */
  removeAllPending(): void
  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig): void
  /**
   * @description: reset
   */
  reset(): void
}

export declare class Cancel {
  static req(conf: AxiosRequestConfig): AxiosRequestConfig
  static res(response: AxiosResponse): Promise<AxiosResponse>
  static resInstall(res: AxiosResponse): boolean
  static reqInstaller(conf: AxiosRequestConfig): boolean
}