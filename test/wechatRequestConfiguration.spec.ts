import { AxiosResponse } from 'axios'
import { Module, initializationAxios, InitializeContainer, interceptorsResponseSuccess, customConfiguration, instanceAlias } from '@zealforchange/proveaxios'
import { wechatRequestConfiguration, wechatRequestConfigurationConfig } from '../package/proveAxios/wechatRequestConfiguration'

jest.setTimeout(10000)
@Module([wechatRequestConfiguration])
@initializationAxios({
  baseURL: 'http://localhost:3000/wechat',
})
class WechatConfig {
  @interceptorsResponseSuccess()
  static response(res: AxiosResponse) {
    return Promise.resolve(res.data)
  }
}

const g = new InitializeContainer().collect([WechatConfig])

function httpHelper(conf: customConfiguration<Partial<wechatRequestConfigurationConfig>>) {
  return g.get(instanceAlias.firstInstance)(conf)
}

it('getInstance', down => {
  httpHelper({
    url: '/postAll',
    data: { one: 1 },
    isFormDate: true,
    legalMayToWorkWithFormdate: ['post'],
    method: 'post',
  })
  down()
})
