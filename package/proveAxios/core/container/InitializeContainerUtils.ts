import axios, { AxiosInstance } from 'axios'
import { initializeContainerProps } from '..'
import { instanceConfig, dynamicPluginConfig } from '../../types'
import { getLocalInstance, getModuleConfig, getDynamicPluginConfig } from '../../utils'
type instanceConfigReturns = { instance: AxiosInstance; conf: instanceConfig; pluginList: dynamicPluginConfig[] }[]

export class InitializeContainerUtils {
  /**
   * @description 实例化
   * @param List
   * @returns
   */
  protected initializationList(List: initializeContainerProps['containerList']): instanceConfigReturns {
    return List.map(item => {
      const instanceConfig = getLocalInstance(item)
      const disassembleThePlugin: dynamicPluginConfig[] = getModuleConfig(item).priorityList.map(pluginItem => {
        console.log(getDynamicPluginConfig(pluginItem))
        return getDynamicPluginConfig(pluginItem)
      })
      return {
        instance: axios.create(instanceConfig.config),
        conf: instanceConfig,
        pluginList: disassembleThePlugin,
      }
    })
  }

  /**
   * @description 绑定拦截器
   * @param List
   * @returns
   */
  protected bindingInterceptor(List: instanceConfigReturns): instanceConfigReturns {
    return List.map(item => {
      item.instance.interceptors.request.use(item.conf.interceptor?.request.successCb, item.conf.interceptor?.request.failCb)
      item.instance.interceptors.response.use(item.conf.interceptor?.response.successCb, item.conf.interceptor?.response.failCb)
      return {
        ...item,
      }
    })
  }
}
