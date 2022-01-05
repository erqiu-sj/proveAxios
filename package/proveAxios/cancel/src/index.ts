import { dynamicModule, priority, interceptorsRequestSuccess, dynamicModuleSuccessInstall, decisionInstaller, interceptorsResponseSuccess } from '@zealforchange/proveaxios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosCanceler, HEADER_KEY } from './core'

const ownAxiosCanceler = new AxiosCanceler()

@dynamicModule({ priority: priority.TOP })
export class Cancel {
  @interceptorsRequestSuccess()
  static req(conf: AxiosRequestConfig) {
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

export { HEADER_KEY, ownAxiosCanceler }
