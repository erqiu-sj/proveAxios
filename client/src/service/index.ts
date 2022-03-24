/*
 * @Author: 邱狮杰
 * @Date: 2022-03-22 10:11:27
 * @LastEditTime: 2022-03-22 14:16:41
 * @Description: 
 * @FilePath: /proveAxios/client/src/service/index.ts
 */
import { customConfiguration, initializationAxios, InitializeContainer, instanceAlias, interceptorsResponseFail, interceptorsResponseSuccess, Module } from '@zealforchange/proveaxios'
// import { HEADER_KEY } from '@zealforchange/proveaxios/cancel'
import { Cancel, CancelConfig, HEADER_KEY, updateCancelConfig } from '../../../package/proveAxios/cancel/src/index'

type requestConfig = customConfiguration<CancelConfig>


updateCancelConfig({
    cancelRequestRule(config) {
        return [config.method || '', config.url || '']
    }
})

@Module([Cancel])
@initializationAxios({
    baseURL: 'http://localhost:3002',
})
class CheckAxios {

    @interceptorsResponseSuccess()
    static response(res: requestConfig) {
        return Promise.resolve(res.data)
    }

    @interceptorsResponseFail()
    static resFail(err: unknown) {
        return err
    }
}

const g = new InitializeContainer().collect([CheckAxios])

export function httpHepler(config: requestConfig) {
    return g.get(instanceAlias.firstInstance)(config)
}
