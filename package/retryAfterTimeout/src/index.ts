import {
    decisionInstaller, dynamicModule,
    dynamicModuleErrorInstall, interceptorsResponseFail, priority
} from '../../proveAxios/index'
import { RetryCore } from './core'
import { retryAfterTimeoutOps } from './type'

@dynamicModule({ priority: priority.TOP, displayName: 'retryAfterTimeout' })
export class RetryAfterTimeout {

    @interceptorsResponseFail()
    static async resErr(err: unknown,) {
        const retryBeforeCb = await new RetryCore(err).retryBeforeCbCb()
        const retrying = await retryBeforeCb.retrying()
        await retryBeforeCb.runCallBack('retryAfterCb', retrying)
        if (!retrying) return null
        return retrying
    }

    @dynamicModuleErrorInstall(decisionInstaller.installResFail)
    static resErrInstall(err: any) {
        return err?.code === "ECONNABORTED"
    }
}

export type {
    retryAfterTimeoutOps
}
