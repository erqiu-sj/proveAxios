import { AxiosRequestConfig } from 'axios'
import { setLocalInstanceConfig, collectionInterceptor } from './utils/get'
import 'reflect-metadata'

type configurationConstraints<T> = T extends object ? T : never
export type customConfiguration<T extends object> = AxiosRequestConfig & T
/**
 * @description 初始化实例配置，并且获取所有装饰器
 */
export function initializationAxios<T extends object>(conf?: customConfiguration<T>) {
  return (target: Function) => {
    // 设置实例配置
    setLocalInstanceConfig(target, conf)
    // 获取所有拦截器
    collectionInterceptor(target)
  }
}
