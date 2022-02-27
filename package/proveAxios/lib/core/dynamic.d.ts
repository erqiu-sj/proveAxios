import { dynamicPluginConfig, decisionInstaller, mergeErrorInstaller, checkDynamicModuleSuccessInstallType } from '../types';
/**
 * @description 注册插件
 * @param conf
 * @returns
 */
export declare function dynamicModule(conf: Omit<dynamicPluginConfig<object>, 'interceptor' | 'installer'>): (target: Object) => void;
/**
 * @description 处理(响应|请求)错误安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export declare function dynamicModuleErrorInstall(type: decisionInstaller.installReqFail | decisionInstaller.installResFail): (target: Object, key: string, desc: TypedPropertyDescriptor<mergeErrorInstaller>) => TypedPropertyDescriptor<mergeErrorInstaller>;
/**
 * @description 处理(响应｜请求)成功安装器函数 安装器函数的返回值决定是否执行错误拦截器
 * @returns
 */
export declare function dynamicModuleSuccessInstall<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object>(type: T): (target: Object, key: string, desc: TypedPropertyDescriptor<checkDynamicModuleSuccessInstallType<T, C>>) => TypedPropertyDescriptor<checkDynamicModuleSuccessInstallType<T, C>>;
