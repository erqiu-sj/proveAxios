import { interceptorsKey } from '../types'

export function getInterceptorsKey<T extends Function>(target: Object, type: keyof typeof interceptorsKey): T {
  return Reflect.getMetadata(type, target)
}
export function createInterceptorsKey(target: Object, func: Function, type: keyof typeof interceptorsKey): void {
  Reflect.defineMetadata(type, func, target)
}
