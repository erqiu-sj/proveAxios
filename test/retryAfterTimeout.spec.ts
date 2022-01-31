import { AxiosResponse } from 'axios'
import { SynchronizationAwaitError } from 'synchronizationawaiterror'
import { customConfiguration, initializationAxios, InitializeContainer, instanceAlias, interceptorsRequestSuccess, interceptorsResponseFail, interceptorsResponseSuccess, Module } from '@zealforchange/proveaxios'
import { RetryAfterTimeout, retryAfterTimeoutOps } from '@zealforchange/proveaxios/retryAfterTimeout'
jest.setTimeout(150000)
@Module([RetryAfterTimeout])
@initializationAxios({
  baseURL: 'http://localhost:3000',
  timeout: 1,
})
class CheckAxios {
  @interceptorsRequestSuccess()
  static req(conf: customConfiguration<object>) {
    return conf
  }

  @interceptorsResponseSuccess()
  static response(res: AxiosResponse) {
    return Promise.resolve(res)
  }
  @interceptorsResponseFail()
  static async responseFail(err: any) {
    return err
  }
}

const g = new InitializeContainer().collect([CheckAxios])

async function http(conf: customConfiguration<retryAfterTimeoutOps<object>>) {
  return g.get(instanceAlias.firstInstance)(conf)
}

it('time out once', async () => {
  const [, res] = await SynchronizationAwaitError<AxiosResponse, AxiosResponse, unknown>(
    http({
      url: '/weaknet/hello',
      retryBeforeCb(conf) {
        conf.timeout = undefined
        return conf
      },
      retryAfterCb(res) {},
      numberOfRetries: 2,
    })
  )
  expect(res?.data).toStrictEqual('Hello World! proveAxios')
})

it('time out five', async () => {
  const [, res] = await SynchronizationAwaitError<AxiosResponse, AxiosResponse, unknown>(
    http({
      url: '/weaknet/helloTimeout',
      retryBeforeCb(conf) {
        conf.timeout = 0.001
        return conf
      },
      retryAfterCb(res) {},
      numberOfRetries: 5,
    })
  )
  expect(res?.data).toBeUndefined()
})
