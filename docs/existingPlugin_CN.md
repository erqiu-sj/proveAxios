# userAuthorization

## use

```ts
import { AxiosResponse } from 'axios'
import { Module, initializationAxios, InitializeContainer, interceptorsResponseSuccess, instanceAlias } from '@zealforchange/proveaxios'
import { UserAuthorization, useUserAuthorizationHelper } from '../package/userAuthorization/index'

useUserAuthorizationHelper({
  authorizationRequired: false,
  statusExpirationCode: 301,
  refreshToken: async () => {
    const result = await helper({ url: '/refreshToken', params: { next: true } })
  },
})

@Module([UserAuthorization])
@initializationAxios({
  baseURL: 'http://localhost:3000/user',
})
class UserAuth {
  @interceptorsResponseSuccess()
  static response(res: AxiosResponse) {
    return Promise.resolve(res.data)
  }
}

const g = new InitializeContainer().collect([UserAuth])
const helper = g.get(instanceAlias.firstInstance)
```

## detail

该插件使用 `useUserAuthorizationHelper`函数来配置`UserAuthorization` 插件

当 `response.data.code === statusExpirationCode` 时会立即触发 `refreshToken` 回调，并且重试当前请求，前提是 `authorizationRequired` 为 `true` 才会开启此验证

[test case](/test/userAuth.spec.ts)

# cancel

[最佳实践 1 - 如何优雅的配置取消重复请求?](/docs/cancel.md)

# retry

[最佳实践 2 - 如何优雅的配置重试请求?](/docs/retry.md)
