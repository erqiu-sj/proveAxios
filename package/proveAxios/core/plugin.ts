import { builtinPrioritySorting, customPrioritySorting, verifyDynamicPlugin, isCustomPriorityPlugin, setModuleConfig, mergePriorityList } from '../utils'

type moduleTypes = Object[]
export function Module(modules: moduleTypes) {
  // 自定义优先级
  const customPriority: object[] = []
  // 自带优先级
  const selfPriority: object[] = []
  return (target: Object) => {
    modules.forEach((moduleItems, moduleIndex) => {
      verifyDynamicPlugin(moduleItems, moduleIndex + 1)
      if (isCustomPriorityPlugin(moduleItems)) customPriority.push(moduleItems)
      else selfPriority.push(moduleItems)
    })
    // 自定义优先级排序  100 > 1...
    customPrioritySorting(customPriority)
    // 自带优先级排序 TOP > INTERMEDIATE ...
    builtinPrioritySorting(selfPriority)
    setModuleConfig(target, {
      priorityList: mergePriorityList(customPriority, selfPriority),
    })
  }
}
