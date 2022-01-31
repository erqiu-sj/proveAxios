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

The plugin uses the `useUserAuthorizationHelper` function to configure the `UserAuthorization` plugin

When `response.data.code === statusExpirationCode`, the `refreshToken` callback will be triggered immediately, and the current request will be retried, provided that `authorizationRequired` is true to enable this verification

[test case](/test/userAuth.spec.ts)

# cancel

[Best Practice 1 - How to elegantly configure to cancel repeated requests?](/docs/cancel.md)

# retry

[Best Practice 2 - How to configure retry requests gracefully](/docs/retry.md)
