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
@Module([Cancel]) // 将Cancel插件安装
@initializationAxios({
  baseURL: 'http://localhost:3000',
  headers: {
    HEADER_KEY,
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

[Test case](/test/cannel.spec.ts)
