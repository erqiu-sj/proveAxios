/*
 * @Author: 邱狮杰
 * @Date: 2021-12-22 22:29:41
 * @LastEditTime: 2022-03-21 17:59:38
 * @Description: 
 * @FilePath: /proveAxios/package/proveAxios/cancel/src/core.ts
 */
import type { Canceler } from 'axios'
import axios from 'axios'
import { CacheConfig, isItExpired } from './cache'
import { CancelConfig } from './index'

function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

let pendingMap = new Map<string, Canceler>()
const expirationNull = 'expirationNull'
export const notExpiredCode = 'notExpiredCode' // 没过期code
export const expirationCode = 'expirationCode' // 过期code

const getPendingUrl = (config: CancelConfig) => [config.method, config.url, config.data, config.params, config.expiration ?? expirationNull].join('$')

// 多次请求则取消上一次请求头
export const HEADER_KEY = 'extraCancellation'

export class AxiosCanceler extends Cache {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: CancelConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it
          pendingMap.set(url, cancel)
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
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const exp = this.getExpiration(url)
      // 是否存在过期字段
      if (exp === null || exp) {
        // 不存在或者已过期
        // 多次的统一请求被取消
        // 从map中删除
        const cancel = pendingMap.get(url)
        cancel && cancel(url)
        pendingMap.delete(url)
        return
      }
      // 没过期
      // 不从map中删除
      const cancel = pendingMap.get(url)
      cancel && cancel(notExpiredCode)
    }
  }

  getExpiration(url: string): boolean | null {
    const expiration = url.split('$').at(-1)
    if (!expiration) return null
    return isItExpired(parseInt(expiration))
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
