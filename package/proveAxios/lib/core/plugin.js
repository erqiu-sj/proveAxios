import { builtinPrioritySorting, customPrioritySorting, verifyDynamicPlugin, isCustomPriorityPlugin, setModuleConfig, mergePriorityList } from '../utils';
export function Module(modules) {
    // 自定义优先级
    const customPriority = [];
    // 自带优先级
    const selfPriority = [];
    return (target) => {
        modules.forEach((moduleItems, moduleIndex) => {
            verifyDynamicPlugin(moduleItems, moduleIndex + 1);
            if (isCustomPriorityPlugin(moduleItems))
                customPriority.push(moduleItems);
            else
                selfPriority.push(moduleItems);
        });
        // 自定义优先级排序  100 > 1...
        customPrioritySorting(customPriority);
        // 自带优先级排序 TOP > INTERMEDIATE ...
        builtinPrioritySorting(selfPriority);
        setModuleConfig(target, {
            priorityList: mergePriorityList(customPriority, selfPriority),
        });
    };
}
