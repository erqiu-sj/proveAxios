import { initializationAxios, InitializeContainer, interceptorsResponseSuccess, Module } from '@zealforchange/proveaxios'
import { Cancel, HEADER_KEY } from '@zealforchange/proveaxios/cancel'

import { AxiosResponse } from 'axios'

jest.setTimeout(100000)

@Module([Cancel])
@initializationAxios({
  baseURL: 'http://localhost:3000',
  headers: {
    [HEADER_KEY]: HEADER_KEY,
  },
})
class CheckAxios {
  @interceptorsResponseSuccess()
  static response(res: AxiosResponse) {
    return Promise.resolve(res.data)
  }
}

const g = new InitializeContainer().collect([CheckAxios])

beforeAll(async () => {
  const result = await g.get(0).put('/weaknet/setDelay', { start: 10 })
  expect(result).toStrictEqual('set10')
})

it('cannel', done => {
  /**
   * @description 测试取消
   * 因为Mark === start 第一发出请求 后 Mark === end 再次发出 并没有堵塞执行(await) 所以在Mark === end 时 取消了 Mark === Start的请求
   * 此处服务器做了延迟返回的处理
   * 第一次请求会延迟十秒
   * 第二次请求会延迟七秒 以此类推
   * 所以后一个请求返回时在等待队列里发现了前一个请求则将其取消掉
   *
   */
  g.get(0)
    .get('/weaknet/delay', { data: { mark: 'start' } })
    .then(res => {
      // 当请求被取消时会返回一个 {message:string}  object
      // @ts-ignore
      expect(res.message).toStrictEqual('get&/weaknet/delay')
    })
  g.get(0)
    .get('/weaknet/delay', { data: { mark: 'end' } })
    .then(res => {
      expect(res).toStrictEqual('delay7-end')
    })
  done()
})
