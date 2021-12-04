import { AxiosRequestConfig } from 'axios'
import { interceptorsResponseFailTypes, interceptorsResponseSuccessTypes, interceptorsRequestFailTypes, interceptorsRequestSuccessTypes } from '../core'
import { priority } from '../constants'

export enum interceptorsKey {
  interceptorsRequestSuccess = 'interceptorsRequestSuccess',
  interceptorsRequestFail = 'interceptorsRequestFail',
  responseSuccess = 'responseSuccess',
  responseFail = 'responseFail',
}

export type instanceConfig = Partial<{
  config?: AxiosRequestConfig
  interceptor: {
    request: {
      successCb: interceptorsRequestSuccessTypes
      failCb: interceptorsRequestFailTypes
    }
    response: {
      successCb: interceptorsResponseSuccessTypes
      failCb: interceptorsResponseFailTypes
    }
  }
}>

export type dynamicPluginConfig = Partial<{
  priority: number | keyof typeof priority
  interceptor: instanceConfig['interceptor']
}>

export type moduleConfiguration = {
  priorityList: object[]
}
