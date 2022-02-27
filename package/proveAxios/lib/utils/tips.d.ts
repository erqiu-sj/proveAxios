import { DebuggerProps } from '../index';
import { decisionInstaller, interceptorsKey } from '../types';
export interface debugPlugInConfiguration {
    debugPlugInNameOnly: DebuggerProps['debugPlugInNameOnly'];
    isDebugPlugInNameOnly: boolean;
}
export interface debuggerOpsWithCheckInstallerConfiguration extends debugPlugInConfiguration {
    installType: decisionInstaller;
}
export interface onlyListenForAPluginCallConfiguration extends debugPlugInConfiguration {
    tips: string;
    displayName?: string;
}
export declare function onlyListenForAPluginCall(ops?: Partial<onlyListenForAPluginCallConfiguration>): boolean;
export declare function checkInstaller(dispayName?: string, ops?: debuggerOpsWithCheckInstallerConfiguration): void;
interface checkInterceptorConfiguration extends debugPlugInConfiguration {
    interceptorType: interceptorsKey;
}
export declare function checkInterceptor(dispayName?: string, ops?: checkInterceptorConfiguration): void;
interface monitorInstallerExecutionConfiguration extends debugPlugInConfiguration {
    installerType: decisionInstaller;
}
export declare function monitorInstallerExecution(displayName?: string, ops?: monitorInstallerExecutionConfiguration): void;
interface monitorPluginInterceptorExecutionConfiguration extends debugPlugInConfiguration {
    interceptorType: interceptorsKey;
}
export declare function monitorPluginInterceptorExecution(displayName?: string, ops?: monitorPluginInterceptorExecutionConfiguration): void;
export {};
