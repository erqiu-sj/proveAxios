import { AxiosRequestConfig } from 'axios'
import { setLocalInstanceConfig, collectionInterceptor } from './utils/get'
import 'reflect-metadata'
export function initializationAxios(conf?: AxiosRequestConfig) {
  return (target: Function) => {
    // 设置实例配置
    setLocalInstanceConfig(target, conf)
    // 获取所有拦截器
    collectionInterceptor(target)
  }
}
