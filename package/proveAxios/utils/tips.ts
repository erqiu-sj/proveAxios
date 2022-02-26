import { debuggerTips } from './index'
import { DebuggerProps } from '../index'
import { decisionInstaller, interceptorsKey } from '../types'

// 调试某一个插件配置配置
export interface debugPlugInConfiguration {
    debugPlugInNameOnly: DebuggerProps['debugPlugInNameOnly'] // 插件名
    isDebugPlugInNameOnly: boolean // 是否开启debugger模式
}

export interface debuggerOpsWithCheckInstallerConfiguration extends debugPlugInConfiguration {

}

export interface onlyListenForAPluginCallConfiguration extends debugPlugInConfiguration {
    tips: string
}
// 只监听某项插件调用
export function onlyListenForAPluginCall(ops?: Partial<onlyListenForAPluginCallConfiguration>) {
    if (ops?.debugPlugInNameOnly && ops?.isDebugPlugInNameOnly) {
        console.log(ops.tips)
        return true
    }
    return false
}

// 检查安装器
export function checkInstaller(dispayName?: string, ops?: debuggerOpsWithCheckInstallerConfiguration) {

    if (onlyListenForAPluginCall({
        ...ops, tips: `checking the installer for the ${ops?.debugPlugInNameOnly}`,
    })) {
        return
    }
    if (!dispayName) {
        console.log(debuggerTips.checkTheInstaller)
        return
    }
    console.log(`checking the installer for the ${dispayName}`)
    return
}

interface checkInterceptorConfiguration extends debugPlugInConfiguration {
    interceptorType: interceptorsKey    // 拦截器类型
}
// 检查拦截器 
export function checkInterceptor(dispayName?: string, ops?: checkInterceptorConfiguration) {
    if (onlyListenForAPluginCall({
        tips: `checking the interceptor(${ops?.interceptorType}) for the ${ops?.debugPlugInNameOnly}`,
        ...ops
    })) {
        return
    }
    if (!dispayName) {
        console.log(`checking the interceptor(${ops?.interceptorType})`)
        return
    }
    console.log(`checking the interceptor(${ops?.interceptorType}) for the ${dispayName}`)
    return
}

interface monitorInstallerExecutionConfiguration extends debugPlugInConfiguration {
    installerType: decisionInstaller
}

// 监听安装器执行
export function monitorInstallerExecution(displayName?: string, ops?: monitorInstallerExecutionConfiguration) {
    if (onlyListenForAPluginCall({
        ...ops,
        tips: `(${ops?.debugPlugInNameOnly})installer is executing`
    })) {
        return
    }
    if (!displayName) {
        console.log(`runing the interceptor(${ops?.installerType})`)
        return
    }
    console.log(`runing the interceptor(${ops?.installerType}) for the ${displayName}`)
    return
}
interface monitorPluginInterceptorExecutionConfiguration extends debugPlugInConfiguration {
    interceptorType: interceptorsKey
}
// 监听插件拦截器执行
export function monitorPluginInterceptorExecution(displayName?: string, ops?: monitorPluginInterceptorExecutionConfiguration) {
    if (onlyListenForAPluginCall({
        ...ops,
        tips: `(${ops?.debugPlugInNameOnly})Interceptor is executing`
    })) {
        return
    }
    if (!displayName) {
        console.log(`runing the interceptor(${ops?.interceptorType})`)
        return
    }
    console.log(`runing the interceptor(${ops?.interceptorType}) for the ${displayName}`)
    return
}