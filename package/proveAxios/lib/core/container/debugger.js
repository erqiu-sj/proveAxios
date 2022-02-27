import { executionPhase } from '../../types';
import { checkInstaller, checkInterceptor, monitorInstallerExecution, monitorPluginInterceptorExecution } from "../../utils";
export class Debugger {
    constructor(ops) {
        this.debugger = false;
        this.debugPlugInNameOnly = '';
        this.monitorAStage = undefined;
        this.debugger = (ops === null || ops === void 0 ? void 0 : ops.debugger) || false;
        this.debugPlugInNameOnly = (ops === null || ops === void 0 ? void 0 : ops.debugPlugInNameOnly) || '';
        this.monitorAStage = ops === null || ops === void 0 ? void 0 : ops.monitorAStage;
    }
    // 是否执行 debugger callback
    withDebuggerCall(callback) {
        this.debugger && (callback === null || callback === void 0 ? void 0 : callback());
    }
    // 根据 监听根据指定插件名 判断是否执行回调
    withDebugPlugInNameOnlyCall(callback, displayName) {
        this.withDebuggerCall(() => {
            if (displayName === this.debugPlugInNameOnly) {
                callback();
            }
        });
    }
    /**
       * @description 包装 debugger 所需参数
       */
    parametersRequiredToWrapTheDebugger() {
        return {
            debugPlugInNameOnly: this.debugPlugInNameOnly,
            isDebugPlugInNameOnly: this.debugger
        };
    }
    // 检查安装器
    checkInstallerHandler(installType, displayName) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.checkTheInstallerStage &&
                checkInstaller(displayName, Object.assign(Object.assign({}, this.parametersRequiredToWrapTheDebugger()), { installType }));
        }, displayName);
    }
    // 安装拦截器中
    checkInterceptorHandler(type, displayName) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.checkTheInterceptorPhase && checkInterceptor(displayName, Object.assign(Object.assign({}, this.parametersRequiredToWrapTheDebugger()), { interceptorType: type }));
        }, displayName);
    }
    // 执行安装器中
    runInstallerHandler(decisionInstaller, displayName) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.executeTheInstallerPhase && monitorInstallerExecution(displayName, Object.assign({ installerType: decisionInstaller }, this.parametersRequiredToWrapTheDebugger()));
        }, displayName);
    }
    runInterceptorHandler(interceptorType, displayName) {
        this.withDebugPlugInNameOnlyCall(() => {
            this.monitorAStage === executionPhase.executeTheTnterceptorPhase && monitorPluginInterceptorExecution(displayName, Object.assign({ interceptorType }, this.parametersRequiredToWrapTheDebugger()));
        }, displayName);
    }
}
