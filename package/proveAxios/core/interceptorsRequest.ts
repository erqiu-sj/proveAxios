import 'reflect-metadata'
import { interceptorsKey } from '../types'
import { createInterceptorsKey } from '../utils'
import { customConfiguration } from '../instance'

export type interceptorsRequestSuccessTypes<C extends object> = (conf: customConfiguration<C>) => customConfiguration<C>

export function interceptorsRequestSuccess<C extends object>() {
  return (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsRequestSuccessTypes<C>>) => {
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
