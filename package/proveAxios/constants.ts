// 局部实例
export const PARTIAL_INSTANCE = Symbol('partialInstance')

// 动态插件
export const DYNAMIC_PLUGIN = Symbol('dynamicPlugin')

// 拦截器
export const INTERCEPTOR = Symbol('interceptor')

// 模块配置
export const MODULE_CONFIGURATION = Symbol('moduleConfiguration')

export const iNSTALLER = Symbol('Installer')

// 优先级
export enum priority {
  LOWEST = 'LOWEST',
  INTERMEDIATE = 'INTERMEDIATE',
  TOP = 'TOP',
}

export enum instanceAlias {
  firstInstance,
  secondInstance,
  thirdInstance,
  fourthInstance,
  fifthInstance,
  sixthInstance,
}
