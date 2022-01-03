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
import { setDynamicPlugin, collectionInterceptor, bindingErrorInstaller, bindingSuccessInstaller, getTargetInstaller } from '../utils';
/**
 * @description 注册插件
 * @param conf
 * @returns
 */
export function dynamicModule(conf) {
    return function (target) {
        setDynamicPlugin(target, __assign(__assign({}, conf), { interceptor: collectionInterceptor(target), installer: getTargetInstaller(target) }));
    };
}
/**
 * @description 处理(响应|请求)错误安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export function dynamicModuleErrorInstall(type) {
    return function (target, key, desc) {
        bindingErrorInstaller(target, type, desc.value);
        return desc;
    };
}
/**
 * @description 处理(响应｜请求)成功安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export function dynamicModuleSuccessInstall(type) {
    return function (target, key, desc) {
        bindingSuccessInstaller(target, type, desc.value);
        return desc;
    };
}
//# sourceMappingURL=dynamic.js.map