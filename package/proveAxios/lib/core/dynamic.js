import { setDynamicPlugin, collectionInterceptor, bindingErrorInstaller, bindingSuccessInstaller, getTargetInstaller } from '../utils';
export function dynamicModule(conf) {
    return (target) => {
        setDynamicPlugin(target, Object.assign(Object.assign({}, conf), { interceptor: collectionInterceptor(target), installer: getTargetInstaller(target) }));
    };
}
export function dynamicModuleErrorInstall(type) {
    return (target, key, desc) => {
        bindingErrorInstaller(target, type, desc.value);
        return desc;
    };
}
export function dynamicModuleSuccessInstall(type) {
    return (target, key, desc) => {
        bindingSuccessInstaller(target, type, desc.value);
        return desc;
    };
}
