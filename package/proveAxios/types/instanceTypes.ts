import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { interceptorsResponseFailTypes, interceptorsResponseSuccessTypes, interceptorsRequestFailTypes, interceptorsRequestSuccessTypes } from '../core'
import { priority } from '../constants'

export enum interceptorsKey {
  interceptorsRequestSuccess = 'interceptorsRequestSuccess',
  interceptorsRequestFail = 'interceptorsRequestFail',
  responseSuccess = 'responseSuccess',
  responseFail = 'responseFail',
}

export enum decisionInstaller {
  installReqSuc = 'installReqSuc', // 安装请求成功拦截器
  installReqFail = 'installReqFail', // 安装请求失败拦截器
  installResSuc = 'installResSuc', // 安装响应成功拦截器
  installResFail = 'installResFail', // 安装响应失败拦截器
}

export type instanceConfig = Partial<{
  config?: AxiosRequestConfig
  interceptor: {
    request: {
      successCb?: interceptorsRequestSuccessTypes
      failCb?: interceptorsRequestFailTypes
    }
    response: {
      successCb?: interceptorsResponseSuccessTypes
      failCb?: interceptorsResponseFailTypes
    }
  }
}>
/**
 * @description 拦截器联合类型
 */
export type interceptorCollectionTypes = interceptorsResponseFailTypes | interceptorsResponseSuccessTypes | interceptorsRequestFailTypes | interceptorsRequestSuccessTypes
/**
 * @description 安装器联合类型
 */
export type installerCollectionTypes = mergeErrorInstaller | mergeSuccessfulInstaller<AxiosRequestConfig> | mergeSuccessfulInstaller<AxiosResponse>

export type mergeErrorInstaller = (err: any) => boolean

export type mergeSuccessfulInstaller<T> = (conf: T) => boolean

export type checkDynamicModuleSuccessInstallType<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc> = T extends decisionInstaller.installReqSuc
  ? mergeSuccessfulInstaller<AxiosRequestConfig>
  : mergeSuccessfulInstaller<AxiosResponse>

export type dynamicPluginConfig = Partial<{
  priority: number | keyof typeof priority
  interceptor: instanceConfig['interceptor']
  installer: {
    [decisionInstaller.installReqSuc]?: mergeSuccessfulInstaller<AxiosRequestConfig>
    [decisionInstaller.installReqFail]?: mergeErrorInstaller
    [decisionInstaller.installResSuc]?: mergeSuccessfulInstaller<AxiosResponse>
    [decisionInstaller.installResFail]?: mergeErrorInstaller
  }
}>

export type moduleConfiguration = {
  priorityList: object[]
}
