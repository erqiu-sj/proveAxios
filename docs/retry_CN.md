```ts
import { AxiosResponse } from 'axios'
import { SynchronizationAwaitError } from 'synchronizationawaiterror'
import { customConfiguration, initializationAxios, InitializeContainer, instanceAlias, Module } from '@zealforchange/proveaxios'
import { RetryAfterTimeout, retryAfterTimeoutOps } from '@zealforchange/proveaxios/retryAfterTimeout'

@Module([RetryAfterTimeout]) // 安装 RetryAfterTimeout 插件
@initializationAxios({
  baseURL: 'http://localhost:3000',
  timeout: 1, // 设置超时时间
})
class CheckAxios {}

const g = new InitializeContainer().collect([CheckAxios])

// 如果想在发送请求时 有 RetryAfterTimeout 配置的类型提示，我建议将请求封装起来
async function http(conf: customConfiguration<retryAfterTimeoutOps<object>>) {
  return g.get(instanceAlias.firstInstance)(conf)
}
// 由于超时时间设置为了 1 所以在发送请求后会马上超时
const [, res] = await SynchronizationAwaitError<AxiosResponse, AxiosResponse, unknown>(
  http({
    url: '/weaknet/hello',
    // 会有语法提示
    // 重试前触法，会根据返回值 设置重试请求的配置
    retryBeforeCb(conf) {
      // 开始重试时 讲setTimeout 设为undefined ，那么在第一次重试时就会成功，从未放弃后续的重试操作
      conf.timeout = undefined
      return conf
    },
    // 会有语法提示
    // 重试后回调
    retryAfterCb(res) {},
    numberOfRetries: 2, // 超时重试次数
  })
)
console.log(res.data) // 重试结果
```
