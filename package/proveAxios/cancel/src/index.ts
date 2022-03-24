/*
 * @Author: 邱狮杰
 * @Date: 2022-02-27 13:28:16
 * @LastEditTime: 2022-03-22 14:11:14
 * @Description: 
 * @FilePath: /proveAxios/package/proveAxios/cancel/src/index.ts
 */
import { customConfiguration, decisionInstaller, dynamicModule, dynamicModuleErrorInstall, dynamicModuleSuccessInstall, interceptorsRequestFail, interceptorsRequestSuccess, interceptorsResponseFail, interceptorsResponseSuccess, priority } from '@zealforchange/proveaxios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Cache, CacheConfig, cacheConfigEnableCacheKey, cacheConfigExpirationKey, cancelHandler, generateExpirationTime } from './cache'
import { AxiosCanceler, cutter, expirationCode, expirationNull, HEADER_KEY, notExpiredCode } from './core'

export const getPendingUrl: updateCancelConf['cancelRequestRule'] = (config: CancelConfig) => [config.method, config.url, JSON.stringify(config.data), JSON.stringify(config.params), config.expiration ?? expirationNull] as string[]

let userCancelRequestRule: updateCancelConf['cancelRequestRule'] | null = null

const ownAxiosCanceler = new AxiosCanceler(userCancelRequestRule || getPendingUrl)

const cancelDisplayName = 'cancel'
const cacheer = new Cache()
export type CancelConfig = customConfiguration<CacheConfig & Partial<updateCancelConf>>


export interface updateCancelConf {
  cancelRequestRule: (conf: CancelConfig) => string[]
}

export function updateCancelConfig(conf: Partial<updateCancelConf>) {
  userCancelRequestRule = conf.cancelRequestRule || null
}

function findHeader(conf: CancelConfig): boolean {
  const headers = Reflect.get(conf.headers as object, HEADER_KEY)
  if (headers === HEADER_KEY) return true
  return false
}

function findCacheParameter(conf: CancelConfig): boolean {
  return Reflect.has(conf, cacheConfigEnableCacheKey) || Reflect.has(conf as object, cacheConfigExpirationKey)
}


@dynamicModule({ priority: priority.TOP, displayName: cancelDisplayName })
export class Cancel {
  @interceptorsResponseFail()
  static resFail(err: unknown) {

    if (err instanceof Object && err && Reflect.has(err, 'message')) {
      const errMessage = (err as { message: string }).message
      if (/notExpiredCode/g.test(errMessage)) {
        const rule = errMessage.replace(/notExpiredCode/g, '')
        const curCache = cacheer.getCache(rule)
        return curCache?.cacheDate
      }
      return err
    }
    return err

  }
  @interceptorsRequestSuccess()
  static req(conf: CancelConfig) {
    const handler = conf.cancelRequestRule || userCancelRequestRule || getPendingUrl
    if (findCacheParameter(conf)) {
      const rule = handler(conf).join(cutter)
      // 有过期时间 缓存容器内是否有对应缓存
      if ((conf.enableCache || !cacheer.hasCache(rule)) && conf.expiration) {
        // 启用缓存 || 没缓存 && 存在过期时间
        // 新增缓存
        // 不取消当前请求
        cacheer.preAddACache(rule, { expiration: conf.expiration })
      }
      if (conf.enableCache && cacheer.cachedAndAvailable(rule)) {
        // 启用缓存 &&  存在缓存且没过期且缓存有内容
        // 取消当前请求
        cancelHandler(conf, `${notExpiredCode}${rule}`)
      }
    }

    if (findHeader(conf)) {
      ownAxiosCanceler.setCancelRequestRule(handler)
      ownAxiosCanceler.addPending(conf)
    }

    return conf
  }

  @interceptorsResponseSuccess()
  static res(response: AxiosResponse) {
    const reqConfig: CancelConfig = response.config
    if (findCacheParameter(reqConfig)) {
      const handler = reqConfig.cancelRequestRule || userCancelRequestRule || getPendingUrl
      cacheer.fillTheCache(handler(reqConfig).join(cutter), response.data)
    }

    if (findHeader(reqConfig)) {
      response.config && ownAxiosCanceler.removePending(response.config)
    }

    return Promise.resolve(response)
  }

  @dynamicModuleErrorInstall(decisionInstaller.installResFail)
  static resInstall(conf: unknown) {
    return true
  }

  @dynamicModuleSuccessInstall(decisionInstaller.installResSuc)
  static resSuc(conf: AxiosRequestConfig) {
    return true
  }

  @dynamicModuleSuccessInstall(decisionInstaller.installReqSuc)
  static reqInstaller(conf: CancelConfig): boolean {
    return findHeader(conf) || findCacheParameter(conf)
  }
}

export { HEADER_KEY, ownAxiosCanceler, cancelDisplayName, generateExpirationTime, notExpiredCode }
