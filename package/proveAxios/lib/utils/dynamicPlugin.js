import { DYNAMIC_PLUGIN, MODULE_CONFIGURATION, INTERCEPTOR } from '../constants';
import { priority } from '../constants';
import { middle } from '../utils';
export function setDynamicPlugin(target, conf) {
    Reflect.defineMetadata(DYNAMIC_PLUGIN, conf, target);
}
export function getDynamicPluginConfig(target) {
    return Reflect.getMetadata(DYNAMIC_PLUGIN, target);
}
export function verifyDynamicPlugin(target, index) {
    const check = getDynamicPluginConfig(target);
    if (!check) {
        throw new Error(`Mismatch in the ${index}th plugin type`);
    }
}
export function isCustomPriorityPlugin(target) {
    const conf = getDynamicPluginConfig(target);
    return typeof conf.priority === 'number';
}
export function customPrioritySorting(tagetList) {
    tagetList.sort((a, b) => {
        return getDynamicPluginConfig(b).priority - getDynamicPluginConfig(a).priority;
    });
}
export function builtinPrioritySorting(tagetList) {
    const priorityList = [priority.LOWEST, priority.INTERMEDIATE, priority.TOP];
    tagetList.sort((a, b) => {
        const prev = getDynamicPluginConfig(a);
        const next = getDynamicPluginConfig(b);
        const prevIndex = priorityList.findIndex(key => key === prev.priority);
        const nextIndex = priorityList.findIndex(key => key === next.priority);
        return nextIndex - prevIndex;
    });
}
function isPriority(target, type) {
    if (!target)
        return false;
    const priorityPluginConf = getDynamicPluginConfig(target).priority;
    if (typeof priorityPluginConf === 'number')
        return false;
    if (priorityPluginConf === type)
        return true;
    return false;
}
function isPriorityJudgment(customPriorityTarget, priority) {
    if (!customPriorityTarget)
        return false;
    const customPriority = getDynamicPluginConfig(customPriorityTarget).priority;
    if (!customPriority)
        return false;
    if (typeof customPriority === 'string')
        return false;
    return customPriority >= priority;
}
function toMergetList(list, target) {
    const checkList = list.shift();
    checkList && target.push(checkList);
}
export function checkPrevisPriorityList(list, type, target) {
    for (let i = 0; i < list.length; i++) {
        if (!(getDynamicPluginConfig(list[i]).priority === type)) {
            break;
        }
        target.push(list[i]);
    }
}
export function mergePriorityList(customPriority, selfPriority) {
    if (!selfPriority)
        return customPriority;
    if (!customPriority.length)
        return selfPriority;
    const mergeList = [];
    const customPriorityList = customPriority.map(customPriorityItem => {
        return getDynamicPluginConfig(customPriorityItem).priority;
    });
    const customSortSize = {
        highPriority: customPriorityList[0],
        mediumPriority: middle(customPriorityList),
        lowPriority: customPriorityList[customPriorityList.length - 1],
    };
    const length = customPriority.length;
    for (let i = 0; i <= length; i++) {
        if (isPriority(selfPriority[i], priority.TOP)) {
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
            toMergetList(selfPriority, mergeList);
            i--;
            continue;
        }
    }
    customPriority.forEach(customPriorityItem => {
        mergeList.push(customPriorityItem);
    });
    return mergeList;
}
export function setModuleConfig(target, config) {
    Reflect.defineMetadata(MODULE_CONFIGURATION, config, target);
}
export function getModuleConfig(target) {
    return Reflect.getMetadata(MODULE_CONFIGURATION, target);
}
export function getTargetInstaller(target) {
    return Reflect.getMetadata(INTERCEPTOR, target);
}
export function bindingSuccessInstaller(target, type, fn) {
    Reflect.defineMetadata(INTERCEPTOR, Object.assign(Object.assign({}, getTargetInstaller(target)), { [type]: fn }), target);
}
export function bindingErrorInstaller(target, type, fn) {
    Reflect.defineMetadata(INTERCEPTOR, Object.assign(Object.assign({}, getTargetInstaller(target)), { [type]: fn }), target);
}
export function checkInterceptorCorrespondingInstaller(interceptor, installer) {
    if (interceptor && !installer)
        return false;
    return true;
}
