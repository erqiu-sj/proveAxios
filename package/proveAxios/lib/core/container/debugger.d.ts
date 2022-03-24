import { interceptorsKey } from "../../types";
import { decisionInstaller, executionPhase } from '../../types';
import { debugPlugInConfiguration } from "../../utils";
export interface DebuggerProps {
    debugger?: boolean;
    debugPlugInNameOnly?: string;
    monitorAStage?: keyof typeof executionPhase;
}
export declare class Debugger {
    protected debugger: boolean;
    protected debugPlugInNameOnly: string;
    protected monitorAStage: undefined | keyof typeof executionPhase;
    constructor(ops?: DebuggerProps);
    protected withDebuggerCall(callback?: () => void): void;
    protected withDebugPlugInNameOnlyCall(callback: () => void, displayName?: string): void;
    protected parametersRequiredToWrapTheDebugger(): debugPlugInConfiguration;
    protected checkInstallerHandler(installType: decisionInstaller, displayName?: string): void;
    protected checkInterceptorHandler(type: interceptorsKey, displayName?: string): void;
    protected runInstallerHandler(decisionInstaller: decisionInstaller, displayName?: string): void;
    protected runInterceptorHandler(interceptorType: interceptorsKey, displayName?: string): void;
}
