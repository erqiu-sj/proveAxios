var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { DYNAMIC_PLUGIN, MODULE_CONFIGURATION, INTERCEPTOR } from '../constants';
import { priority } from '../constants';
import { middle } from '../utils';
/**
 * @description 设置插件配置
 * @param target
 * @param conf
 */
export function setDynamicPlugin(target, conf) {
    Reflect.defineMetadata(DYNAMIC_PLUGIN, conf, target);
}
/**
 * @description 获取插件配置
 * @param target
 * @returns
 */
export function getDynamicPluginConfig(target) {
    return Reflect.getMetadata(DYNAMIC_PLUGIN, target);
}
/**
 * @description 验证是否为插件
 * @param target
 */
export function verifyDynamicPlugin(target, index) {
    var check = getDynamicPluginConfig(target);
    if (!check) {
        throw new Error("Mismatch in the ".concat(index, "th plugin type"));
    }
}
/**
 * @description 是否是自定义优先级插件
 * @param target
 * @returns
 */
export function isCustomPriorityPlugin(target) {
    var conf = getDynamicPluginConfig(target);
    return typeof conf.priority === 'number';
}
/**
 * @description 自定义优先级排序
 */
export function customPrioritySorting(tagetList) {
    tagetList.sort(function (a, b) {
        return getDynamicPluginConfig(b).priority - getDynamicPluginConfig(a).priority;
    });
}
/**
 * @description 自带优先级排序
 */
export function builtinPrioritySorting(tagetList) {
    var priorityList = [priority.LOWEST, priority.INTERMEDIATE, priority.TOP];
    tagetList.sort(function (a, b) {
        var prev = getDynamicPluginConfig(a);
        var next = getDynamicPluginConfig(b);
        var prevIndex = priorityList.findIndex(function (key) { return key === prev.priority; });
        var nextIndex = priorityList.findIndex(function (key) { return key === next.priority; });
        return nextIndex - prevIndex;
    });
}
/**
 * @description 是否是对应的自带优先级插件
 * @param target
 */
function isPriority(target, type) {
    if (!target)
        return false;
    var priorityPluginConf = getDynamicPluginConfig(target).priority;
    if (typeof priorityPluginConf === 'number')
        return false;
    if (priorityPluginConf === type)
        return true;
    return false;
}
/**
 * @description 判断插件优先级 插件优先级 === 自定义优先级
 * @param customPriorityTarget
 * @param priority
 * @returns
 */
function isPriorityJudgment(customPriorityTarget, priority) {
    if (!customPriorityTarget)
        return false;
    var customPriority = getDynamicPluginConfig(customPriorityTarget).priority;
    if (!customPriority)
        return false;
    if (typeof customPriority === 'string')
        return false;
    return customPriority >= priority;
}
function toMergetList(list, target) {
    var checkList = list.shift();
    checkList && target.push(checkList);
}
/**
 * @description 检查在推入自定义插件时下一个插件时，上一个自带优先级插件是否push完毕
 * @param list
 * @param type
 * @param target
 */
export function checkPrevisPriorityList(list, type, target) {
    for (var i = 0; i < list.length; i++) {
        if (!(getDynamicPluginConfig(list[i]).priority === type)) {
            break;
        }
        target.push(list[i]);
    }
}
/**
 * @description 合并优先级列表
 * @param target
 */
export function mergePriorityList(customPriority, selfPriority) {
    if (!selfPriority)
        return customPriority;
    if (!customPriority.length)
        return selfPriority;
    var mergeList = [];
    var customPriorityList = customPriority.map(function (customPriorityItem) {
        return getDynamicPluginConfig(customPriorityItem).priority;
    });
    // 优先级大小
    var customSortSize = {
        // 高优先级
        highPriority: customPriorityList[0],
        // 中优先级
        mediumPriority: middle(customPriorityList),
        // 低优先级
        lowPriority: customPriorityList[customPriorityList.length - 1],
    };
    var length = customPriority.length;
    // 循环自定义优先级列表
    for (var i = 0; i <= length; i++) {
        if (isPriority(selfPriority[i], priority.TOP)) {
            // 是否是优先级===Top插件
            toMergetList(selfPriority, mergeList);
            i--;
            continue;
        }
        if (isPriorityJudgment(customPriority[i], customSortSize.mediumPriority)) {
            checkPrevisPriorityList(selfPriority, priority.TOP, mergeList);
            toMergetList(customPriority, mergeList);
            continue;
        }
        if (isPriority(selfPriority[i], priority.INTERMEDIATE)) {
            // 是否是优先级===INTERMEDIATE插件
            toMergetList(selfPriority, mergeList);
            i--;
            continue;
        }
        if (isPriorityJudgment(customPriority[i], customSortSize.lowPriority)) {
            checkPrevisPriorityList(selfPriority, priority.INTERMEDIATE, mergeList);
            toMergetList(customPriority, mergeList);
            continue;
        }
        if (isPriority(selfPriority[i], priority.LOWEST)) {
            // 是否是优先级===LOWEST
            toMergetList(selfPriority, mergeList);
            i--;
            continue;
        }
    }
    customPriority.forEach(function (customPriorityItem) {
        mergeList.push(customPriorityItem);
    });
    return mergeList;
}
/**
 * @description 设置模块配置
 * @param target
 * @param config
 */
export function setModuleConfig(target, config) {
    Reflect.defineMetadata(MODULE_CONFIGURATION, config, target);
}
/**
 * @description 获取模块配置
 */
export function getModuleConfig(target) {
    return Reflect.getMetadata(MODULE_CONFIGURATION, target);
}
export function getTargetInstaller(target) {
    return Reflect.getMetadata(INTERCEPTOR, target);
}
/**
 * @description 绑定成功安装器
 */
export function bindingSuccessInstaller(target, type, fn) {
    var _a;
    Reflect.defineMetadata(INTERCEPTOR, __assign(__assign({}, getTargetInstaller(target)), (_a = {}, _a[type] = fn, _a)), target);
}
/**
 * @description 绑定错误安装器
 */
export function bindingErrorInstaller(target, type, fn) {
    var _a;
    Reflect.defineMetadata(INTERCEPTOR, __assign(__assign({}, getTargetInstaller(target)), (_a = {}, _a[type] = fn, _a)), target);
}
/**
 * @description 拦截器是否存在对应的安装器
 */
export function checkInterceptorCorrespondingInstaller(interceptor, installer) {
    // 拦截器存在 安装器不存在
    if (interceptor && !installer)
        return false;
    return true;
}
//# sourceMappingURL=dynamicPlugin.js.map