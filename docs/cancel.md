<!--
 * @Author: 邱狮杰
 * @Date: 2022-01-18 23:03:36
 * @LastEditTime: 2022-03-24 22:28:34
 * @Description:
 * @FilePath: /proveAxios/docs/cancel.md
-->

```ts
import {
  initializationAxios, // Initialize the axios configuration
  InitializeContainer, // Initialize the container of axios
  interceptorsResponseSuccess, // axios response success interceptor
  Module, // axios plugin configuration
} from '@zealforchange/proveaxios'

import { Cancel, HEADER_KEY } from '@zealforchange/proveaxios/cancel'

// The plugin will determine that when the request header with HEADER_KEY and there are multiple identical request headers, it will cancel all previous requests and only make the last request valid

// This is closely related to the writing method. When using async await, the plugin will be invalid, because each request will wait for the response of the previous request before sending the request, which does not satisfy the condition that multiple identical requests are issued at the same time.

@Module([Cancel]) // install cancel
@initializationAxios({
  baseURL: 'http://localhost:3000',
  headers: {
    [HEADER_KEY]: HEADER_KEY,
  },
})
class CancelAxios {
  @interceptorsResponseSuccess() // Request response success interceptor
  static response(res: AxiosResponse) {
    return Promise.resolve(res.data)
  }
}

const g = new InitializeContainer().collect([CancelAxios])

g.get(0).get('/weaknet/delay', { data: { mark: 'start' } })
g.get(0).get('/weaknet/delay', { data: { mark: 'end' } }) // This request will cancel the request with mark === ‘start’
```

```ts
import { customConfiguration, instanceAlias } from '@zealforchange/proveaxios'
import { CancelConfig, generateExpirationTime } from '@zealforchange/proveaxios/cancel'

updateCancelConf({
  // Configure caching rules
  // This function will be called on every request, and the returned string array will be joined to form a string, which is used as the cache key
  // request config
  cancelRequestRule(config: customConfiguration<CancelConfig>) {
    return [config.method, config.url]
  },
})
@Module([Cancel]) // install cancel
@initializationAxios({
  baseURL: 'http://localhost:3000',
})
class CancelAxios {}

const g = new InitializeContainer().collect([CancelAxios])
function httpHelper(conf: customConfiguration) {
  return g.get(instanceAlias.firstInstance)(conf)
}
// the request result will be cached for one minute
await httpHepler({ url: '/get', expiration: generateExpirationTime('min', 1) })
// when enableCache is true, it will go to the cache to get the value and cancel the request
await httpHepler({ url: '/get', enableCache: true })
```

[Test case](/test/cannel.spec.ts)
