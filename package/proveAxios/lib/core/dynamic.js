import { setDynamicPlugin, collectionInterceptor, bindingErrorInstaller, bindingSuccessInstaller, getTargetInstaller } from '../utils';
/**
 * @description 注册插件
 * @param conf
 * @returns
 */
export function dynamicModule(conf) {
    return (target) => {
        setDynamicPlugin(target, Object.assign(Object.assign({}, conf), { interceptor: collectionInterceptor(target), installer: getTargetInstaller(target) }));
    };
}
/**
 * @description 处理(响应|请求)错误安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export function dynamicModuleErrorInstall(type) {
    return (target, key, desc) => {
        bindingErrorInstaller(target, type, desc.value);
        return desc;
    };
}
/**
 * @description 处理(响应｜请求)成功安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export function dynamicModuleSuccessInstall(type) {
    return (target, key, desc) => {
        bindingSuccessInstaller(target, type, desc.value);
        return desc;
    };
}
