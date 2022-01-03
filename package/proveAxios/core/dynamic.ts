import {
    setDynamicPlugin,
    collectionInterceptor,
    bindingErrorInstaller,
    bindingSuccessInstaller,
    getTargetInstaller
} from '../utils'
import {
    dynamicPluginConfig,
    decisionInstaller,
    mergeErrorInstaller,
    checkDynamicModuleSuccessInstallType
} from '../types'

/**
 * @description 注册插件
 * @param conf
 * @returns
 */
export function dynamicModule(conf: Omit<dynamicPluginConfig<object>, 'interceptor' | 'installer'>) {
    return (target: Object) => {
        setDynamicPlugin(target, {
            ...conf,
            interceptor: collectionInterceptor(target),
            installer: getTargetInstaller(target),
        })
    }
}

/**
 * @description 处理(响应|请求)错误安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export function dynamicModuleErrorInstall(type: decisionInstaller.installReqFail | decisionInstaller.installResFail) {
    return (target: Object, key: string, desc: TypedPropertyDescriptor<mergeErrorInstaller>) => {
        bindingErrorInstaller(target, type, desc.value as mergeErrorInstaller)
        return desc
    }
}

/**
 * @description 处理(响应｜请求)成功安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export function dynamicModuleSuccessInstall<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object>(type: T) {
    return (target: Object, key: string, desc: TypedPropertyDescriptor<checkDynamicModuleSuccessInstallType<T, C>>) => {
        bindingSuccessInstaller(target, type, desc.value as checkDynamicModuleSuccessInstallType<T, C>)
        return desc
    }
}
