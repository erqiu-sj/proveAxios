import { setDynamicPlugin, collectionInterceptor } from '../utils'
import { dynamicPluginConfig } from '../types'
export function dynamicModule(conf: dynamicPluginConfig) {
  return (target: Object) => {
    setDynamicPlugin(target, {
      ...conf,
      interceptor: collectionInterceptor(target),
    })
  }
}
