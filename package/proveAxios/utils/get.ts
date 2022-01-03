import { getInterceptorsKey } from '.'
import { PARTIAL_INSTANCE } from '../constants'
import { interceptorsRequestFailTypes, interceptorsRequestSuccessTypes, interceptorsResponseFailTypes, interceptorsResponseSuccessTypes } from '../core'
import { customConfiguration } from '../instance'
import { instanceConfig, interceptorsKey } from '../types'
/**
 * @description 获取实例配置
 * @param target
 * @returns
 */
export function getLocalInstance(target: Object): instanceConfig<object> {
  return Reflect.getMetadata(PARTIAL_INSTANCE, target)
}
/**
 * @description 设置实例配置中的config字段
 * @param target
 * @param conf
 * @returns
 */
export function setLocalInstanceConfig(target: Object, conf?: customConfiguration<object>) {
  const getInstance = getLocalInstance(target)
  Reflect.defineMetadata(
    PARTIAL_INSTANCE,
    {
      ...getInstance,
      config: conf,
    } as instanceConfig<object>,
    target
  )
}

/**
 * @description 将拦截器注入到实例配置中
 * @param target
 * @param conf
 * @returns
 */
export function setInterceptor(target: Object, conf: instanceConfig<object>['interceptor']): instanceConfig<object>['interceptor'] {
  const getInstance = getLocalInstance(target)
  Reflect.defineMetadata(
    PARTIAL_INSTANCE,
    {
      ...getInstance,
      interceptor: { ...conf },
    } as instanceConfig<object>,
    target
  )
  return conf
}

/**
 * @description 收集拦截器
 * @param target
 */
export function collectionInterceptor(target: Object): instanceConfig<object>['interceptor'] {
  return setInterceptor(target, {
    request: {
      successCb: getInterceptorsKey<interceptorsRequestSuccessTypes<object>>(target, interceptorsKey.interceptorsRequestSuccess),
      failCb: getInterceptorsKey<interceptorsRequestFailTypes>(target, interceptorsKey.interceptorsRequestFail),
    },
    response: {
      successCb: getInterceptorsKey<interceptorsResponseSuccessTypes>(target, interceptorsKey.responseSuccess),
      failCb: getInterceptorsKey<interceptorsResponseFailTypes>(target, interceptorsKey.responseFail),
    },
  })
}
