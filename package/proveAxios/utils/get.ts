import { AxiosRequestConfig } from 'axios'
import { instanceConfig, interceptorsKey, dynamicPluginConfig } from '../types'
import { interceptorsRequestFailTypes, interceptorsResponseFailTypes, interceptorsRequestSuccessTypes, interceptorsResponseSuccessTypes } from '../core'
import { PARTIAL_INSTANCE, DYNAMIC_PLUGIN } from '../constants'
import { getInterceptorsKey } from '.'
/**
 * @description 获取实例配置
 * @param target
 * @returns
 */
export function getLocalInstance(target: Object): instanceConfig {
  return Reflect.getMetadata(PARTIAL_INSTANCE, target)
}
/**
 * @description 设置实例配置中的config字段
 * @param target
 * @param conf
 * @returns
 */
export function setLocalInstanceConfig(target: Object, conf?: AxiosRequestConfig) {
  const getInstance = getLocalInstance(target)
  Reflect.defineMetadata(
    PARTIAL_INSTANCE,
    {
      ...getInstance,
      config: conf,
    } as instanceConfig,
    target
  )
}

/**
 * @description 将拦截器注入到实例配置中
 * @param target
 * @param conf
 * @returns
 */
export function setInterceptor(target: Object, conf: instanceConfig['interceptor']): instanceConfig['interceptor'] {
  const getInstance = getLocalInstance(target)
  Reflect.defineMetadata(
    PARTIAL_INSTANCE,
    {
      ...getInstance,
      interceptor: { ...conf },
    } as instanceConfig,
    target
  )
  return conf
}

/**
 * @description 收集拦截器
 * @param target
 */
export function collectionInterceptor(target: Object): instanceConfig['interceptor'] {
  return setInterceptor(target, {
    request: {
      successCb: getInterceptorsKey<interceptorsRequestSuccessTypes>(target, interceptorsKey.interceptorsRequestSuccess),
      failCb: getInterceptorsKey<interceptorsRequestFailTypes>(target, interceptorsKey.interceptorsRequestFail),
    },
    response: {
      successCb: getInterceptorsKey<interceptorsResponseSuccessTypes>(target, interceptorsKey.responseSuccess),
      failCb: getInterceptorsKey<interceptorsResponseFailTypes>(target, interceptorsKey.responseFail),
    },
  })
}
