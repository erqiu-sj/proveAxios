import type { Canceler, AxiosRequestConfig } from 'axios'
import axios from 'axios'

function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

let pendingMap = new Map<string, Canceler>()

const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

// 多次请求则取消上一次请求头
export const HEADER_KEY = 'extraCancellation'

export class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
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
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
