import { dynamicPluginConfig, moduleConfiguration, decisionInstaller, mergeErrorInstaller, checkDynamicModuleSuccessInstallType, interceptorCollectionTypes, installerCollectionTypes } from '../types';
import { priority } from '../constants';
/**
 * @description 设置插件配置
 * @param target
 * @param conf
 */
export declare function setDynamicPlugin(target: Object, conf: dynamicPluginConfig<object>): void;
/**
 * @description 获取插件配置
 * @param target
 * @returns
 */
export declare function getDynamicPluginConfig(target: Object): dynamicPluginConfig<object>;
/**
 * @description 验证是否为插件
 * @param target
 */
export declare function verifyDynamicPlugin(target: Object, index: number): void;
/**
 * @description 是否是自定义优先级插件
 * @param target
 * @returns
 */
export declare function isCustomPriorityPlugin(target: Object): boolean;
/**
 * @description 自定义优先级排序
 */
export declare function customPrioritySorting(tagetList: object[]): void;
/**
 * @description 自带优先级排序
 */
export declare function builtinPrioritySorting(tagetList: object[]): void;
/**
 * @description 检查在推入自定义插件时下一个插件时，上一个自带优先级插件是否push完毕
 * @param list
 * @param type
 * @param target
 */
export declare function checkPrevisPriorityList(list: object[], type: keyof typeof priority, target: object[]): void;
/**
 * @description 合并优先级列表
 * @param target
 */
export declare function mergePriorityList(customPriority: object[], selfPriority: object[]): object[];
/**
 * @description 设置模块配置
 * @param target
 * @param config
 */
export declare function setModuleConfig(target: Object, config: moduleConfiguration): void;
/**
 * @description 获取模块配置
 */
export declare function getModuleConfig(target: Object): moduleConfiguration;
export declare function getTargetInstaller(target: Object): dynamicPluginConfig<object>['installer'];
/**
 * @description 绑定成功安装器
 */
export declare function bindingSuccessInstaller<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object>(target: Object, type: T, fn: checkDynamicModuleSuccessInstallType<T, C>): void;
/**
 * @description 绑定错误安装器
 */
export declare function bindingErrorInstaller(target: Object, type: decisionInstaller.installReqFail | decisionInstaller.installResFail, fn: mergeErrorInstaller): void;
/**
 * @description 拦截器是否存在对应的安装器
 */
export declare function checkInterceptorCorrespondingInstaller(interceptor: interceptorCollectionTypes | undefined, installer: installerCollectionTypes<object> | undefined): boolean;
