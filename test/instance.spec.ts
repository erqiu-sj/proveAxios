import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { initializationAxios, InitializeContainer, interceptorsRequestFail, interceptorsRequestSuccess, interceptorsResponseFail, interceptorsResponseSuccess, Module } from '@zealforchange/proveaxios'
import { Cancel } from '../package/cancel/index'

@Module([Cancel])
@initializationAxios({
  // timeout: 1000,
  baseURL: 'http://localhost:3000',
})
class CheckAxios {
  @interceptorsRequestFail()
  static reqFail(err: any) {
    console.log(err)
  }

  @interceptorsRequestSuccess()
  static reqSuc(req: AxiosRequestConfig) {
    return req
  }

  @interceptorsResponseSuccess()
  static response(res: AxiosResponse) {
    return Promise.resolve(res.data)
  }

  @interceptorsResponseFail()
  static responseFail(err: any) {
    console.log(err.code === 'ECONNABORTED', 'aslkdfjkalsdgasdjfbalsdgjasdfkblasdjgbflkasjdfkkbals')
  }
}

const g = new InitializeContainer().collect([CheckAxios])

it('getInstance', down => {
  expect(g.get(1)).toBeUndefined()
  expect(g.get(0)).not.toBeNull()
  down()
})

it('Hello World! proveAxios', async () => {
  const result = await g.get(0).get('/weaknet/hello')
  await g.get(0).get('/weaknet/hello')
  expect(result).toBe('Hello World! proveAxios')
})

// it('cannel', async () => {
//   const result = await g.get(0).get('/weaknet/hello')
//   expect(result).toBe('Hello World! proveAxios')
// })
