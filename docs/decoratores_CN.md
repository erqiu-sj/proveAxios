## initializationAxios

> `axios` 的基本配置，装饰在 `class` 上 [编写插件也适用](/docs/learnPlugin.md)

```ts
@initializationAxios({ baseURL: '' })
class BaseAxios {}
```

## customConfiguration

> 扩展 `axiox` 的基本配置项，在使用自定义插件时很有用

[详情见测试文件](/test/retryAfterTimeout.spec.ts)

## interceptorsResponseSuccess

> 响应成功拦截器 [编写插件也适用](/docs/learnPlugin.md)

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

> 响应失败拦截器 [编写插件也适用](/docs/learnPlugin.md)

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsResponseFail()
  static resErr(err: unknown) {}
}
```

## interceptorsRequestSuccess

> 请求成功拦截器 [编写插件也适用](/docs/learnPlugin.md)

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

> 请求失败拦截器 [编写插件也适用](/docs/learnPlugin.md)

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsRequestFail()
  static reqFail(err: unknown) {}
}
```

## InitializeContainer

> 初始化 `Axios` 实例的容器

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsRequestFail()
  static reqFail(err: unknown) {}
}
new InitializeContainer().collect([BaseAxios])
```

## instanceAlias

> 实例别名

```ts
@initializationAxios({})
class BaseAxios {
  @interceptorsRequestFail()
  static reqFail(err: unknown) {}
}
const g = new InitializeContainer().collect([BaseAxios])
g.get(instanceAlias.firstInstance) // or  g.get(instanceAlias.firstInstance)
```
