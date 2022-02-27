# debugger your plugin

## 如何开启 `debugger` 模式

```typescript
import { InitializeContainer, executionPhase } from '@zealforchange/proveaxios'

export declare enum executionPhase {
  checkTheInstallerStage = 'checkTheInstallerStage', // 检查安装器阶段
  executeTheInstallerPhase = 'executeTheInstallerPhase', // 执行安装器阶段
  checkTheInterceptorPhase = 'checkTheInterceptorPhase', // 检查拦截器阶段
  executeTheTnterceptorPhase = 'executeTheTnterceptorPhase', // 检查拦截器阶段
}

new InitializeContainer({
  debugger: true, // 是否开启debugger模式(可选)
  debugPlugInNameOnly: 'Test1', // 只调试某个插件(可选) , 此参数根据插件的配置(displayName)来决定
  monitorAStage: executionPhase.executeTheTnterceptorPhase, // 只调试拦截器执行阶段(可选)，
})
```

当 `monitorAStage` 和 `debugPlugInNameOnly` 选项缺省时，会执行所有插件 在某一时刻的回调 log，则会让你的控制台显得非常的混乱

所以我非常的建议你不要忽略 `monitorAStage` 和 `debugPlugInNameOnly` 选项
