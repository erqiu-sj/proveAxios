# debugger your plugin

## How to enable `debugger` mode

```typescript
import { InitializeContainer, executionPhase } from '@zealforchange/proveaxios'

export declare enum executionPhase {
  checkTheInstallerStage = 'checkTheInstallerStage', // check the installer stage
  executeTheInstallerPhase = 'executeTheInstallerPhase', // execute the installer phase
  checkTheInterceptorPhase = 'checkTheInterceptorPhase', // check the interceptor phase
  executeTheTnterceptorPhase = 'executeTheTnterceptorPhase', // Check the interceptor phase
}

new InitializeContainer({
  debugger: true, // Whether to enable debugger mode (optional)
  debugPlugInNameOnly: 'Test1', // Only debug a plugin (optional), this parameter is determined according to the configuration of the plugin (displayName)
  monitorAStage: executionPhase.executeTheTnterceptorPhase, // only debug interceptor execution phase (optional),
})
```

When the `monitorAStage` and `debugPlugInNameOnly` options are default, all plugins will execute the callback log at a certain time, which will make your console very confusing

So I strongly advise you not to ignore `monitorAStage` and `debugPlugInNameOnly` options
