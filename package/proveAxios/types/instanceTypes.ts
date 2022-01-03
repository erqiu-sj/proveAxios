import { AxiosResponse } from 'axios'
import {
    interceptorsResponseFailTypes,
    interceptorsResponseSuccessTypes,
    interceptorsRequestFailTypes,
    interceptorsRequestSuccessTypes
} from '../core'
import { priority } from '../constants'
import { customConfiguration } from '../instance'

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

export type instanceConfig<C extends object> = Partial<{
    config?: customConfiguration<C>
    interceptor: {
        request: {
            successCb?: interceptorsRequestSuccessTypes<object>
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
export type interceptorCollectionTypes =
    interceptorsResponseFailTypes
    | interceptorsResponseSuccessTypes
    | interceptorsRequestFailTypes
    | interceptorsRequestSuccessTypes<object>
/**
 * @description 安装器联合类型
 */
export type installerCollectionTypes<C extends object> =
    mergeErrorInstaller
    | mergeSuccessfulInstaller<customConfiguration<C>>
    | mergeSuccessfulInstaller<AxiosResponse>

export type mergeErrorInstaller = (err: any) => boolean

export type mergeSuccessfulInstaller<T> = (conf: T) => boolean

export type checkDynamicModuleSuccessInstallType<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object> = T extends decisionInstaller.installReqSuc
    ? mergeSuccessfulInstaller<customConfiguration<C>>
    : mergeSuccessfulInstaller<AxiosResponse>

export type dynamicPluginConfig<C extends object> = Partial<{
    priority: number | keyof typeof priority
    displayName?: string
    interceptor: instanceConfig<C>['interceptor']
    installer: {
        [decisionInstaller.installReqSuc]?: mergeSuccessfulInstaller<customConfiguration<C>>
        [decisionInstaller.installReqFail]?: mergeErrorInstaller
        [decisionInstaller.installResSuc]?: mergeSuccessfulInstaller<AxiosResponse>
        [decisionInstaller.installResFail]?: mergeErrorInstaller
    }
}>

export type moduleConfiguration = {
    priorityList: object[]
}
