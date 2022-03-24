import { builtinPrioritySorting, customPrioritySorting, verifyDynamicPlugin, isCustomPriorityPlugin, setModuleConfig, mergePriorityList } from '../utils';
export function Module(modules) {
    const customPriority = [];
    const selfPriority = [];
    return (target) => {
        modules.forEach((moduleItems, moduleIndex) => {
            verifyDynamicPlugin(moduleItems, moduleIndex + 1);
            if (isCustomPriorityPlugin(moduleItems))
                customPriority.push(moduleItems);
            else
                selfPriority.push(moduleItems);
        });
        customPrioritySorting(customPriority);
        builtinPrioritySorting(selfPriority);
        setModuleConfig(target, {
            priorityList: mergePriorityList(customPriority, selfPriority),
        });
    };
}
