## initializationAxios

> the basic configuration of axios, decorated on class [Also applies when writing plugins](/docs/learnPlugin.md)

```ts
@initializationAxios({ baseURL: '' })
class BaseAxios {}
```

## customConfiguration

> extend the basic configuration items of axiox, useful when using custom plugins

[See test file for details](/test/retryAfterTimeout.spec.ts)

## interceptorsResponseSuccess

> Response success interceptor [Also applies when writing plugins](/docs/learnPlugin.md)

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsResponseSuccess()
  static res(response: AxiosResponse) {
    return Promise.resolve(response)
  }
}
```

## interceptorsResponseFail

> Response failure interceptor [Also applies when writing plugins](/docs/learnPlugin.md)

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsResponseFail()
  static resErr(err: unknown) {}
}
```

## interceptorsRequestSuccess

> request success interceptor [Also applies when writing plugins](/docs/learnPlugin.md)

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsRequestSuccess()
  static req(conf: AxiosRequestConfig) {
    return conf
  }
}
```

## interceptorsRequestFail

> request fail interceptor [Also applies when writing plugins](/docs/learnPlugin.md)

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsRequestFail()
  static reqFail(err: unknown) {}
}
```

## InitializeContainer

> A container that initializes the axios instance

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsRequestFail()
  static reqFail(err: unknown) {}
}
new InitializeContainer().collect([BaseAxios, BaseAxios])
```

## instanceAlias

> instance alias

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsRequestFail()
  static reqFail(err: unknown) {}
}
const g = new InitializeContainer().collect([BaseAxios])
g.get(instanceAlias.firstInstance) // or  g.get(instanceAlias.firstInstance)
```
