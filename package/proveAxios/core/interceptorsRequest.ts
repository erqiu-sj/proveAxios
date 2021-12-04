import 'reflect-metadata'
import { interceptorsKey } from '../types'
import { AxiosRequestConfig } from 'axios'
import { createInterceptorsKey } from '../utils'

export type interceptorsRequestSuccessTypes = (conf: AxiosRequestConfig) => AxiosRequestConfig

export function interceptorsRequestSuccess<D>() {
  return (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsRequestSuccessTypes>) => {
    createInterceptorsKey(target, desc.value as Function, interceptorsKey.interceptorsRequestSuccess)
    return desc
  }
}

export type interceptorsRequestFailTypes = (error: any) => any
export function interceptorsRequestFail() {
  return (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsRequestFailTypes>) => {
    createInterceptorsKey(target, desc.value as Function, interceptorsKey.interceptorsRequestFail)
    return desc
  }
}
