/*
 * @Author: 邱狮杰
 * @Date: 2022-02-27 13:28:16
 * @LastEditTime: 2022-03-21 17:58:53
 * @Description: 
 * @FilePath: /proveAxios/package/proveAxios/cancel/src/index.ts
 */
import { customConfiguration, decisionInstaller, dynamicModule, dynamicModuleSuccessInstall, interceptorsRequestSuccess, interceptorsResponseSuccess, priority } from '@zealforchange/proveaxios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CacheConfig, generateExpirationTime, } from './cache'
import { AxiosCanceler, HEADER_KEY, notExpiredCode } from './core'

const ownAxiosCanceler = new AxiosCanceler()

const cancelDisplayName = 'cancel'

export type CancelConfig = customConfiguration<CacheConfig>

@dynamicModule({ priority: priority.TOP, displayName: cancelDisplayName })
export class Cancel {

  @interceptorsRequestSuccess<CancelConfig>()
  static req(conf: CancelConfig) {
    ownAxiosCanceler.addPending(conf)
    return conf
  }

  @interceptorsResponseSuccess()
  static res(response: AxiosResponse) {
    response.config && ownAxiosCanceler.removePending(response.config)
    return Promise.resolve(response)
  }

  @dynamicModuleSuccessInstall(decisionInstaller.installResSuc)
  static resInstall(res: AxiosResponse) {
    return true
  }

  @dynamicModuleSuccessInstall(decisionInstaller.installReqSuc)
  static reqInstaller(conf: AxiosRequestConfig) {
    const checkHasHeader = Reflect.has(conf.headers as {}, HEADER_KEY)
    return checkHasHeader
  }
}

export { HEADER_KEY, ownAxiosCanceler, cancelDisplayName, generateExpirationTime, notExpiredCode }
