import {
    customConfiguration,
    Module,
    InitializeContainer,
    initializationAxios,
    interceptorsRequestSuccess,
    instanceAlias,
    dynamicModule,
    priority
    , decisionInstaller,
    dynamicModuleSuccessInstall,
} from '@zealforchange/proveaxios'
import { Cancel, HEADER_KEY } from '@zealforchange/proveaxios/cancel'
import { RetryAfterTimeout, retryAfterTimeoutOps } from '@zealforchange/proveaxios/retryAfterTimeout'

@dynamicModule({ priority: priority.TOP })
class Test {
    @interceptorsRequestSuccess<object>()
    static req(conf: customConfiguration<object>) {
        console.log('test')
        return conf
    }

    @dynamicModuleSuccessInstall(decisionInstaller.installReqSuc)
    static reqInstall(conf: customConfiguration<object>) {
        return true
    }
}
@dynamicModule({ priority: priority.TOP, displayName: "Test1" })
class Test1 {
    @interceptorsRequestSuccess<object>()
    static req(conf: customConfiguration<object>) {
        return conf
    }

    @dynamicModuleSuccessInstall(decisionInstaller.installReqSuc)
    static reqInstall(conf: customConfiguration<object>) {
        return true
    }
}
@Module([Cancel, RetryAfterTimeout, Test, Test1])
@initializationAxios({
    headers: {
        [HEADER_KEY]: HEADER_KEY
    }
})
class CollectionSpec {
    @interceptorsRequestSuccess<object>()
    static req(conf: customConfiguration<object>) {
        return conf
    }
}
const instanceList = new InitializeContainer({ debugPlugInNameOnly: 'Test1', debugger: true, monitorAStage: 'checkTheInstallerStage' }).collect([CollectionSpec])

export function httpHelper(conf: customConfiguration<retryAfterTimeoutOps<object>>) {
    return instanceList.get(instanceAlias.firstInstance)(conf)
}

it('test', () => {
    httpHelper({
        url: ""
    })
})