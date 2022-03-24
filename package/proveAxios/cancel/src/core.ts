/*
 * @Author: 邱狮杰
 * @Date: 2021-12-22 22:29:41
 * @LastEditTime: 2022-03-22 12:03:18
 * @Description: 
 * @FilePath: /proveAxios/package/proveAxios/cancel/src/core.ts
 */
import type { Canceler } from 'axios'
import axios from 'axios'
import { Cache, isItExpired } from './cache'
import { CancelConfig, getPendingUrl, updateCancelConf } from './index'


function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

let pendingMap = new Map<string, Canceler>()

export const cutter = "$"

export const expirationNull = 'expirationNull'
export const notExpiredCode = 'notExpiredCode' // 没过期code
export const expirationCode = 'expirationCode' // 过期code

// 多次请求则取消上一次请求头
export const HEADER_KEY = 'extraCancellation'

export class AxiosCanceler {
  protected cancelRequestRule: updateCancelConf['cancelRequestRule'] = () => []

  constructor(rule: updateCancelConf['cancelRequestRule']) {
    this.cancelRequestRule = rule
  }

  setCancelRequestRule(handler: updateCancelConf['cancelRequestRule']) {
    this.cancelRequestRule = handler
  }

  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: CancelConfig) {
    this.removePending(config)
    let url = this.cancelRequestRule(config).join(cutter)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingMap.has(url as string)) {
          // If there is no current request in pending, add it
          pendingMap.set(url as string, cancel)
        }
      })
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config: CancelConfig) {
    let url = this.cancelRequestRule(config).join(cutter)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      console.log('what end')
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  getExpiration(url: string): boolean | null {
    const expiration = url.split(cutter).at(-1)
    if (!expiration) return null
    if (expiration === expirationNull) return true
    return isItExpired(parseInt(expiration))
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
