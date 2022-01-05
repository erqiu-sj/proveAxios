```ts
import { AxiosResponse } from 'axios'
import { SynchronizationAwaitError } from 'synchronizationawaiterror'
import { customConfiguration, initializationAxios, InitializeContainer, instanceAlias, Module } from '@zealforchange/proveaxios'
import { RetryAfterTimeout, retryAfterTimeoutOps } from '@zealforchange/proveaxios/retryAfterTimeout'

@Module([RetryAfterTimeout]) // install RetryAfterTimeout plugin
@initializationAxios({
  baseURL: 'http://localhost:3000',
  timeout: 1, // set time out time
})
class CheckAxios {}

const g = new InitializeContainer().collect([CheckAxios])

// if you want to have the type prompt of the RetryAfterTimeout configuration when sending the request, I suggest encapsulating the request
async function http(conf: customConfiguration<retryAfterTimeoutOps<object>>) {
  return g.get(instanceAlias.firstInstance)(conf)
}

// since the timeout period is set to 1, it will time out immediately after sending the request
const [, res] = await SynchronizationAwaitError<AxiosResponse, AxiosResponse, unknown>(
  http({
    url: '/weaknet/hello',
    // there will be grammar hints
    // before retrying, the configuration of the retry request will be set according to the return value
    retryBeforeCb(conf) {
      // when starting to retry, say setTimeout is set to undefined, then it will succeed in the first retry, and never give up subsequent retry operations
      conf.timeout = undefined
      return conf
    },
    // there will be grammar hints
    // callback after retry
    retryAfterCb(res) {},
    numberOfRetries: 2, // 超时重试次数
  })
)
console.log(res.data) // 重试结果
```
