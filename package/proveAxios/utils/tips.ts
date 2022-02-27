import { debuggerTips } from './index'
import { DebuggerProps } from '../index'
import { decisionInstaller, interceptorsKey } from '../types'

// 调试某一个插件配置配置
export interface debugPlugInConfiguration {
    debugPlugInNameOnly: DebuggerProps['debugPlugInNameOnly'] // 插件名
    isDebugPlugInNameOnly: boolean // 是否开启debugger模式
}

export interface debuggerOpsWithCheckInstallerConfiguration extends debugPlugInConfiguration {
    installType: decisionInstaller
}

export interface onlyListenForAPluginCallConfiguration extends debugPlugInConfiguration {
    tips: string
    displayName?: string
}
// 只监听某项插件调用
export function onlyListenForAPluginCall(ops?: Partial<onlyListenForAPluginCallConfiguration>) {
    if (ops?.debugPlugInNameOnly && ops?.isDebugPlugInNameOnly && (ops?.debugPlugInNameOnly === ops.displayName)) {
        console.log(ops.tips)
        return true
    }
    return false
}

// 检查安装器
export function checkInstaller(dispayName?: string, ops?: debuggerOpsWithCheckInstallerConfiguration) {
    if (onlyListenForAPluginCall({
        displayName: dispayName,
        ...ops, tips: `checking the installer(${ops?.installType}) for the ${ops?.debugPlugInNameOnly}  (${getTime()})`,
    })) {
        return
    }
    if (!dispayName) {
        console.log(`checking the installer(${ops?.installType}) (${getTime()})`)
        return
    }
    console.log(`checking the installer(${ops?.installType}) for the ${dispayName} (${getTime()})`)
    return
}

interface checkInterceptorConfiguration extends debugPlugInConfiguration {
    interceptorType: interceptorsKey    // 拦截器类型
}
// 检查拦截器 
export function checkInterceptor(dispayName?: string, ops?: checkInterceptorConfiguration) {
    if (onlyListenForAPluginCall({
        tips: `checking the interceptor(${ops?.interceptorType}) for the ${ops?.debugPlugInNameOnly} (${getTime()})`,
        ...ops,
        displayName: dispayName
    })) {
        return
    }
    if (!dispayName) {
        console.log(`checking the interceptor(${ops?.interceptorType}) (${getTime()})`)
        return
    }
    console.log(`checking the interceptor(${ops?.interceptorType}) for the ${dispayName}  (${getTime()})`)
    return
}

interface monitorInstallerExecutionConfiguration extends debugPlugInConfiguration {
    installerType: decisionInstaller
}

// 监听安装器执行
export function monitorInstallerExecution(displayName?: string, ops?: monitorInstallerExecutionConfiguration) {
    if (onlyListenForAPluginCall({
        ...ops,
        tips: `(${ops?.debugPlugInNameOnly})installer is executing (${getTime()})`,
        displayName: displayName
    })) {
        return
    }
    if (!displayName) {
        console.log(`runing the installer(${ops?.installerType}) (${getTime()})`)
        return
    }
    console.log(`runing the installer(${ops?.installerType}) for the ${displayName} (${getTime()})`)
    return
}
interface monitorPluginInterceptorExecutionConfiguration extends debugPlugInConfiguration {
    interceptorType: interceptorsKey
}
// 监听插件拦截器执行
export function monitorPluginInterceptorExecution(displayName?: string, ops?: monitorPluginInterceptorExecutionConfiguration) {
    if (onlyListenForAPluginCall({
        ...ops,
        tips: `(${ops?.debugPlugInNameOnly})Interceptor is executing (${getTime()})`,
        displayName: displayName
    })) {
        return
    }
    if (!displayName) {
        console.log(`runing the interceptor(${ops?.interceptorType}) (${getTime()})`)
        return
    }
    console.log(`runing the interceptor(${ops?.interceptorType}) for the ${displayName} (${getTime()})`)
    return
}

function getTime() {
    const time = new Date()
    return `\n ${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}  ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}