import {
    decisionInstaller, dynamicModule,
    dynamicModuleErrorInstall, interceptorsResponseFail, priority
} from '@zealforchange/proveaxios'
import { RetryCore } from './core'
import { retryAfterTimeoutOps } from './type'

const retryAfterTimeoutDisplayName = 'retryAfterTimeout'
@dynamicModule({ priority: priority.TOP, displayName: retryAfterTimeoutDisplayName })
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
export {
    retryAfterTimeoutDisplayName
}
export type {
    retryAfterTimeoutOps
}
