import 'reflect-metadata'
import { interceptorsKey } from '../types'
import { AxiosResponse } from 'axios'
import { createInterceptorsKey } from '../utils'

export type interceptorsResponseSuccessTypes = (conf: AxiosResponse) => Promise<AxiosResponse>

export function interceptorsResponseSuccess<D>() {
  return (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseSuccessTypes>) => {
    createInterceptorsKey(target, desc.value as Function, interceptorsKey.responseSuccess)
    return desc
  }
}

export type interceptorsResponseFailTypes = (error: any) => any

export function interceptorsResponseFail() {
  return (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseFailTypes>) => {
    createInterceptorsKey(target, desc.value as Function, interceptorsKey.responseFail)
    return desc
  }
}
