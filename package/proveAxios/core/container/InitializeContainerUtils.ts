import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { initializeContainerProps } from '..'
import { instanceConfig, dynamicPluginConfig } from '../../types'
import { getLocalInstance, getModuleConfig, getDynamicPluginConfig, checkInterceptorCorrespondingInstaller } from '../../utils'
import { interceptorsRequestSuccessTypes, interceptorsResponseSuccessTypes, interceptorsRequestFailTypes, interceptorsResponseFailTypes } from '../index'
export type instanceConfigReturns = { instance: AxiosInstance; conf: instanceConfig; pluginList: dynamicPluginConfig[] }
export type filterEmptyInterceptorReturns = {
  requestSuccessCbList: interceptorsRequestSuccessTypes[]
  requestFailCbList: interceptorsRequestFailTypes[]
  responseSuccessCbList: interceptorsResponseSuccessTypes[]
  responseFailCbList: interceptorsResponseFailTypes[]
} & instanceConfigReturns

export class InitializeContainerUtils {
  /**
   * @description 实例化
   * @param List
   * @returns
   */
  protected initializationList(List: initializeContainerProps['containerList']): instanceConfigReturns[] {
    return List.map(item => {
      const instanceConfig = getLocalInstance(item)
      const disassembleThePlugin: dynamicPluginConfig[] =
        getModuleConfig(item)?.priorityList.map(pluginItem => {
          return getDynamicPluginConfig(pluginItem)
        }) || []
      return {
        instance: axios.create(instanceConfig.config),
        conf: instanceConfig,
        pluginList: disassembleThePlugin,
      }
    })
  }
  /**
   * @description 检查安装器
   * 1. 插件有拦截器 主体没有拦截器 即插件拦截器生效
   *
   */
  protected checkTheInstaller(List: instanceConfigReturns[]): instanceConfigReturns[] {
    return List.map(item => {
      item.pluginList.map(pluginItem => {
        const checkInterceptorDecorator = {
          requestFailCb: pluginItem.interceptor?.request.failCb,
          requestSuccessCb: pluginItem.interceptor?.request.successCb,
          responseSuccessCb: pluginItem.interceptor?.response.successCb,
          responseFailCb: pluginItem.interceptor?.response.failCb,
        }
        const checkList = [
          checkInterceptorDecorator.requestFailCb === undefined,
          checkInterceptorDecorator.requestSuccessCb === undefined,
          checkInterceptorDecorator.responseFailCb === undefined,
          checkInterceptorDecorator.responseSuccessCb === undefined,
        ]
        const emptyInterceptor = checkList.every(checkItem => checkItem)
        // 空拦截器器 不验证拦截安装器
        if (emptyInterceptor) return
        // 存在拦截器 验证安装器
        // 空直接报错
        if (!pluginItem.installer) throw new Error('please check if the interception installer is bound')
        // 判断对应的拦截器是否有对应的安装器
        if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.requestSuccessCb, pluginItem.installer.installReqSuc)) throw new Error('missing the corresponding request successful installer')
        if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.requestFailCb, pluginItem.installer.installReqFail)) throw new Error('the corresponding request failed installer is missing')
        if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.responseSuccessCb, pluginItem.installer.installResSuc)) throw new Error('the corresponding response is missing successfully installer')
        if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.responseFailCb, pluginItem.installer.installResFail)) throw new Error('missing the corresponding response failed installer')
        return { ...pluginItem }
      })
      return { ...item }
    })
  }
  /**
   * @description 解析拦截器
   * @param List
   * @returns
   */
  protected filterEmptyInterceptor(List: instanceConfigReturns[]): filterEmptyInterceptorReturns[] {
    return List.map((item): filterEmptyInterceptorReturns => {
      const requestSuccessCbList = item.pluginList
        .filter(pluginItem => {
          return pluginItem.interceptor?.request.successCb
        })
        .map(nextPlugin => {
          return nextPlugin.interceptor?.request.successCb
        })
      const requestFailCbList = item.pluginList
        .filter(pluginItem => {
          return pluginItem.interceptor?.request.failCb
        })
        .map(nextPlugin => {
          return nextPlugin.interceptor?.request.failCb
        })
      const responseSuccessCbList = item.pluginList
        .filter(pluginItem => {
          return pluginItem.interceptor?.response.successCb
        })
        .map(nextPlugin => {
          return nextPlugin.interceptor?.response.successCb
        })
      const responseFailCbList = item.pluginList
        .filter(pluginItem => {
          return pluginItem.interceptor?.response.failCb
        })
        .map(nextPlugin => {
          return nextPlugin.interceptor?.response.failCb
        })
      return {
        // @ts-ignore
        requestSuccessCbList,
        // @ts-ignore
        requestFailCbList,
        // @ts-ignore
        responseSuccessCbList,
        // @ts-ignore
        responseFailCbList,
        ...item,
      }
    })
  }

  /**
   * @description 绑定拦截器
   * @param List
   */
  protected bindingInterceptor(List: filterEmptyInterceptorReturns[]): filterEmptyInterceptorReturns[] {
    return List.map((item: filterEmptyInterceptorReturns) => {
      item.instance.interceptors.response.use(
        async response => {
          let backupRes: null | AxiosResponse = null
          for (let i = 0; i < item.responseSuccessCbList.length; i++) {
            if (await item.pluginList[i].installer?.installResSuc?.(backupRes || response)) backupRes = await item.responseSuccessCbList[i].call(this, backupRes || response)
          }
          return (await item.conf.interceptor?.response?.successCb?.(backupRes || response)) || backupRes || response
        },
        async err => {
          let backupErr: any = null
          for (let i = 0; i < item.responseFailCbList.length; i++) {
            if (await item.pluginList[i].installer?.installResFail?.(backupErr || err)) backupErr = await item.responseFailCbList[i].call(this, backupErr || err)
          }
          return (await item.conf.interceptor?.response.failCb?.(backupErr || err)) || backupErr || err
        }
      )
      item.instance.interceptors.request.use(
        async config => {
          let backupCconfig: AxiosRequestConfig | null = null
          for (let i = 0; i < item.requestSuccessCbList.length; i++) {
            if (await item.pluginList[i].installer?.installReqSuc?.(backupCconfig || config)) backupCconfig = await item.requestSuccessCbList[i].call(this, backupCconfig || config)
          }
          return (await item.conf.interceptor?.request.successCb?.(backupCconfig || config)) || backupCconfig || config
        },
        async err => {
          let backupError: any = null
          for (let i = 0; i < item.requestFailCbList.length; i++) {
            if (await item.pluginList[i].installer?.installReqFail?.(backupError || err)) backupError = await item.requestFailCbList[i].call(this, backupError || err)
          }
          return (await item.conf.interceptor?.request.failCb?.(backupError || err)) || backupError || err
        }
      )
      return { ...item }
    })
  }
}
