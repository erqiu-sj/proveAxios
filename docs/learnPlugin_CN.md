# 如何编写一个插件？

## 我想应该先从一个实例的初始化讲起

### 当 `axios` 被注册 即 `axios.create()` , 此时就会往当前注册实例的拦截器上添加插件, 添加的插件根据优先级排序,再次之前你必须实现每个插件对应的插件安装器( `decisionInstaller(请求或响应成功安装器)` | `dynamicModuleErrorInstall(请求或响应错误安装器)` )根据安装器的返回值判断是否应该将此插件执行,后由插件的返回值决定 `axios` 响应或请求的返回值

```txt

Axios.interceptors -> plugin installer -> high priority plugin ->  Axios.interceptors result

```

## interceptorsResponseSuccess

> 响应成功装饰器

## interceptorsResponseFail

> 响应失败装饰器

## dynamicModule

> 定义插件装饰器

## interceptorsRequestFail

> 请求失败拦截器

## interceptorsRequestSuccess

> 请求成功拦截器

## decisionInstaller

> 请求或响应成功安装器

## dynamicModuleErrorInstall

> 请求或响应失败安装器
