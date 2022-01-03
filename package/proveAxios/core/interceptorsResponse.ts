import 'reflect-metadata'
import { interceptorsKey } from '../types'
import { AxiosResponse, AxiosInstance } from 'axios'
import { createInterceptorsKey } from '../utils'
import { customConfiguration } from '../instance'

export type interceptorsResponseSuccessTypes = (conf: AxiosResponse) => Promise<AxiosResponse>

export function interceptorsResponseSuccess() {
  return (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseSuccessTypes>) => {
    createInterceptorsKey(target, desc.value as Function, interceptorsKey.responseSuccess)
    return desc
  }
}

export type interceptorsResponseFailTypes = (error: any, instance?: AxiosInstance) => any

export function interceptorsResponseFail() {
  return (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseFailTypes>) => {
    createInterceptorsKey(target, desc.value as Function, interceptorsKey.responseFail)
    return desc
  }
}
