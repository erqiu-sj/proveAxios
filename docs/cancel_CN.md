<!--
 * @Author: 邱狮杰
 * @Date: 2022-01-18 23:03:36
 * @LastEditTime: 2022-03-24 22:30:26
 * @Description:

 * @FilePath: /proveAxios/docs/cancel_CN.md
-->

```ts
import {
  initializationAxios, // 初始化axios配置
  InitializeContainer, // 初始化axios的容器
  interceptorsResponseSuccess, // axios响应成功拦截器
  Module, // axios插件配置
} from '@zealforchange/proveaxios'

import { Cancel, HEADER_KEY } from '@zealforchange/proveaxios/cancel'

// Cancel 插件会判断当请求的请求头带有 HEADER_KEY 时，并且存在多个相同的请求头时，会取消之前所有的请求，只使最后一次请求有效

// 这和写法有紧密的联系,当使用async await时该插件将会无效，因为每一次请求都会等待上一次的请求响应回来时再发送请求，就不满足多个相同请求同时发出的条件
@Module([Cancel]) // 将Cancel插件安装
@initializationAxios({
  baseURL: 'http://localhost:3000',
  headers: {
    [HEADER_KEY]: HEADER_KEY,
  },
})
class CancelAxios {
  @interceptorsResponseSuccess() // 请求响应成功拦截器
  static response(res: AxiosResponse) {
    return Promise.resolve(res.data)
  }
}

const g = new InitializeContainer().collect([CancelAxios])

g.get(0).get('/weaknet/delay', { data: { mark: 'start' } })
g.get(0).get('/weaknet/delay', { data: { mark: 'end' } }) // 该请求会取消mark === ‘start’的那一次请求
```

```ts
import { customConfiguration, instanceAlias } from '@zealforchange/proveaxios'
import { CancelConfig, generateExpirationTime } from '@zealforchange/proveaxios/cancel'

updateCancelConf({
  // 配置缓存规则
  // 每次请求都会调用这个函数，将返回的字符串数组拼接成一个字符串，作为缓存key

  // 请求配置
  cancelRequestRule(config: customConfiguration<CancelConfig>) {
    return [config.method, config.url]
  },
})
@Module([Cancel])
@initializationAxios({
  baseURL: 'http://localhost:3000',
})
class CancelAxios {}

const g = new InitializeContainer().collect([CancelAxios])
function httpHelper(conf: customConfiguration) {
  return g.get(instanceAlias.firstInstance)(conf)
}
// 请求结果将被缓存一分钟
await httpHepler({ url: '/get', expiration: generateExpirationTime('min', 1) })
// enableCache 为 true 时就会去缓存中取值,并取消该请求
await httpHepler({ url: '/get', enableCache: true })
```

[测试用例](/test/cannel.spec.ts)
