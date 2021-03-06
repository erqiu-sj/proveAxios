import { DYNAMIC_PLUGIN, MODULE_CONFIGURATION, INTERCEPTOR } from '../constants'
import { dynamicPluginConfig, moduleConfiguration, decisionInstaller, mergeErrorInstaller, checkDynamicModuleSuccessInstallType, interceptorCollectionTypes, installerCollectionTypes } from '../types'
import { priority } from '../constants'
import { middle } from '../utils'
/**
 * @description 设置插件配置
 * @param target
 * @param conf
 */
export function setDynamicPlugin(target: Object, conf: dynamicPluginConfig<object>) {
  Reflect.defineMetadata(DYNAMIC_PLUGIN, conf, target)
}
/**
 * @description 获取插件配置
 * @param target
 * @returns
 */
export function getDynamicPluginConfig(target: Object): dynamicPluginConfig<object> {
  return Reflect.getMetadata(DYNAMIC_PLUGIN, target)
}
/**
 * @description 验证是否为插件
 * @param target
 */
export function verifyDynamicPlugin(target: Object, index: number) {
  const check = getDynamicPluginConfig(target)
  if (!check) {
    throw new Error(`Mismatch in the ${index}th plugin type`)
  }
}
/**
 * @description 是否是自定义优先级插件
 * @param target
 * @returns
 */
export function isCustomPriorityPlugin(target: Object): boolean {
  const conf = getDynamicPluginConfig(target)
  return typeof conf.priority === 'number'
}
/**
 * @description 自定义优先级排序
 */
export function customPrioritySorting(tagetList: object[]) {
  tagetList.sort((a, b) => {
    return (getDynamicPluginConfig(b).priority as number) - (getDynamicPluginConfig(a).priority as number)
  })
}
/**
 * @description 自带优先级排序
 */
export function builtinPrioritySorting(tagetList: object[]) {
  const priorityList = [priority.LOWEST, priority.INTERMEDIATE, priority.TOP]
  tagetList.sort((a, b) => {
    const prev = getDynamicPluginConfig(a)
    const next = getDynamicPluginConfig(b)
    const prevIndex = priorityList.findIndex(key => key === (prev.priority as string))
    const nextIndex = priorityList.findIndex(key => key === (next.priority as string))
    return nextIndex - prevIndex
  })
}
/**
 * @description 是否是对应的自带优先级插件
 * @param target
 */
function isPriority(target: object | undefined, type: keyof typeof priority): boolean {
  if (!target) return false
  const priorityPluginConf = getDynamicPluginConfig(target).priority
  if (typeof priorityPluginConf === 'number') return false
  if (priorityPluginConf === type) return true
  return false
}

/**
 * @description 判断插件优先级 插件优先级 === 自定义优先级
 * @param customPriorityTarget
 * @param priority
 * @returns
 */
function isPriorityJudgment(customPriorityTarget: object, priority: number): boolean {
  if (!customPriorityTarget) return false
  const customPriority = getDynamicPluginConfig(customPriorityTarget).priority
  if (!customPriority) return false
  if (typeof customPriority === 'string') return false
  return customPriority >= priority
}

function toMergetList(list: object[], target: object[]) {
  const checkList = list.shift()
  checkList && target.push(checkList)
}

/**
 * @description 检查在推入自定义插件时下一个插件时，上一个自带优先级插件是否push完毕
 * @param list
 * @param type
 * @param target
 */
export function checkPrevisPriorityList(list: object[], type: keyof typeof priority, target: object[]) {
  for (let i = 0; i < list.length; i++) {
    if (!(getDynamicPluginConfig(list[i]).priority === type)) {
      break
    }
    target.push(list[i])
  }
}

/**
 * @description 合并优先级列表
 * @param target
 */
export function mergePriorityList(customPriority: object[], selfPriority: object[]): object[] {
  if (!selfPriority) return customPriority
  if (!customPriority.length) return selfPriority
  const mergeList: object[] = []
  const customPriorityList = customPriority.map(customPriorityItem => {
    return getDynamicPluginConfig(customPriorityItem).priority as number
  })
  // 优先级大小
  const customSortSize = {
    // 高优先级
    highPriority: customPriorityList[0],
    // 中优先级
    mediumPriority: middle(customPriorityList),
    // 低优先级
    lowPriority: customPriorityList[customPriorityList.length - 1],
  }
  const length = customPriority.length
  // 循环自定义优先级列表
  for (let i = 0; i <= length; i++) {
    if (isPriority(selfPriority[i], priority.TOP)) {
      // 是否是优先级===Top插件
      toMergetList(selfPriority, mergeList)
      i--
      continue
    }
    if (isPriorityJudgment(customPriority[i], customSortSize.mediumPriority)) {
      checkPrevisPriorityList(selfPriority, priority.TOP, mergeList)
      toMergetList(customPriority, mergeList)
      continue
    }
    if (isPriority(selfPriority[i], priority.INTERMEDIATE)) {
      // 是否是优先级===INTERMEDIATE插件
      toMergetList(selfPriority, mergeList)
      i--
      continue
    }
    if (isPriorityJudgment(customPriority[i], customSortSize.lowPriority)) {
      checkPrevisPriorityList(selfPriority, priority.INTERMEDIATE, mergeList)
      toMergetList(customPriority, mergeList)
      continue
    }
    if (isPriority(selfPriority[i], priority.LOWEST)) {
      // 是否是优先级===LOWEST
      toMergetList(selfPriority, mergeList)
      i--
      continue
    }
  }
  customPriority.forEach(customPriorityItem => {
    mergeList.push(customPriorityItem)
  })

  return mergeList
}

/**
 * @description 设置模块配置
 * @param target
 * @param config
 */
export function setModuleConfig(target: Object, config: moduleConfiguration) {
  Reflect.defineMetadata(MODULE_CONFIGURATION, config, target)
}

/**
 * @description 获取模块配置
 */
export function getModuleConfig(target: Object): moduleConfiguration {
  return Reflect.getMetadata(MODULE_CONFIGURATION, target)
}

export function getTargetInstaller(target: Object): dynamicPluginConfig<object>['installer'] {
  return Reflect.getMetadata(INTERCEPTOR, target)
}
/**
 * @description 绑定成功安装器
 */
export function bindingSuccessInstaller<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object>(target: Object, type: T, fn: checkDynamicModuleSuccessInstallType<T, C>) {
  Reflect.defineMetadata(
    INTERCEPTOR,
    {
      ...getTargetInstaller(target),
      [type]: fn,
    },
    target
  )
}
/**
 * @description 绑定错误安装器
 */
export function bindingErrorInstaller(target: Object, type: decisionInstaller.installReqFail | decisionInstaller.installResFail, fn: mergeErrorInstaller) {
  Reflect.defineMetadata(
    INTERCEPTOR,
    {
      ...getTargetInstaller(target),
      [type]: fn,
    },
    target
  )
}

/**
 * @description 拦截器是否存在对应的安装器
 */
export function checkInterceptorCorrespondingInstaller(interceptor: interceptorCollectionTypes | undefined, installer: installerCollectionTypes<object> | undefined): boolean {
  // 拦截器存在 安装器不存在
  if (interceptor && !installer) return false
  return true
}
