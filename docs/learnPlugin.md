# How to write a plugin?

## I think we should start with the initialization of an instance

### When `axios` is registered, i.e. `axios.create()`, plugins will be added to the interceptor of the currently registered instance. The added plugins are sorted by priority. The plugin installer ( `decisionInstaller(request or response success installer)` | `dynamicModuleErrorInstall(request or response error installer)`) judges whether this plugin should be executed according to the return value of the installer, and then decides by the return value of the plugin `axios` response or request return value

```txt

Axios.interceptors -> plugin installer -> high priority plugin -> Axios.interceptors result

```

## interceptorsResponseSuccess

> response success decorator

## interceptorsResponseFail

> response failure decorator

## dynamicModule

> define plugin decorator

## interceptorsRequestFail

> request failure interceptor

## interceptorsRequestSuccess

> Request success interceptor

## decisionInstaller

> request or response to a successful installer

## dynamicModuleErrorInstall

> request or response failed installer

[Plugin Best Practices - Cancel](../package/proveAxios/cancel/src/index.ts)
