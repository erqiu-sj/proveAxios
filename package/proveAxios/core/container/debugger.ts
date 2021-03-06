import { interceptorsKey } from "../../types"
import { decisionInstaller, executionPhase } from '../../types'
import { debugPlugInConfiguration, checkInstaller, checkInterceptor, monitorInstallerExecution, monitorPluginInterceptorExecution } from "../../utils"

export interface DebuggerProps {
    debugger?: boolean // 是否开启debugger, 他会告诉你所有插件的执行过程和参数  priority 1
    debugPlugInNameOnly?: string // 只看某个插件的执行过程,此处接受一个插件名 priority 3
    monitorAStage?: keyof typeof executionPhase // 监听某一个阶段 priority  2
}
export class Debugger {
    protected debugger: boolean = false
    protected debugPlugInNameOnly: string = ''
    protected monitorAStage: undefined | keyof typeof executionPhase = undefined
    constructor(ops?: DebuggerProps) {
        this.debugger = ops?.debugger || false
        this.debugPlugInNameOnly = ops?.debugPlugInNameOnly || ''
        this.monitorAStage = ops?.monitorAStage
    }

    // 是否执行 debugger callback
    protected withDebuggerCall(callback?: () => void): void {
        this.debugger && callback?.()
    }
    // 根据 监听根据指定插件名 判断是否执行回调
    protected withDebugPlugInNameOnlyCall(callback: () => void, displayName?: string) {
        this.withDebuggerCall(() => {
            if (displayName === this.debugPlugInNameOnly) {
                callback()
            }
        })

    }
    /**
       * @description 包装 debugger 所需参数
       */
    protected parametersRequiredToWrapTheDebugger(): debugPlugInConfiguration {
        return {
            debugPlugInNameOnly: this.debugPlugInNameOnly,
            isDebugPlugInNameOnly: this.debugger
        }
    }

    // 检查安装器
    protected checkInstallerHandler(installType: decisionInstaller, displayName?: string,) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.checkTheInstallerStage &&
                checkInstaller(displayName, {
                    ...this.parametersRequiredToWrapTheDebugger(),
                    installType
                })
        }, displayName)
    }
    // 安装拦截器中
    protected checkInterceptorHandler(type: interceptorsKey, displayName?: string) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.checkTheInterceptorPhase && checkInterceptor(displayName, {
                ...this.parametersRequiredToWrapTheDebugger(),
                interceptorType: type
            })
        }, displayName)
    }
    // 执行安装器中
    protected runInstallerHandler(decisionInstaller: decisionInstaller, displayName?: string) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.executeTheInstallerPhase && monitorInstallerExecution(displayName, {
                installerType: decisionInstaller,
                ...this.parametersRequiredToWrapTheDebugger()
            })
        }, displayName)
    }

    protected runInterceptorHandler(
        interceptorType: interceptorsKey, displayName?: string
    ) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.executeTheTnterceptorPhase && monitorPluginInterceptorExecution(displayName, {
                interceptorType,
                ...this.parametersRequiredToWrapTheDebugger(),
            })
        }, displayName)
    }
}