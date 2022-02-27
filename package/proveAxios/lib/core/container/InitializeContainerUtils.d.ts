import { AxiosInstance } from 'axios';
import { initializeContainerProps } from '..';
import { dynamicPluginConfig, instanceConfig } from '../../types';
import { interceptorsRequestFailTypes, interceptorsRequestSuccessTypes, interceptorsResponseFailTypes, interceptorsResponseSuccessTypes } from '../index';
import { Debugger } from './debugger';
export declare type instanceConfigReturns = {
    instance: AxiosInstance;
    conf: instanceConfig<object>;
    pluginList: dynamicPluginConfig<object>[];
};
export declare type filterEmptyInterceptorReturns = {
    requestSuccessCbList: interceptorsRequestSuccessTypes<object>[];
    requestFailCbList: interceptorsRequestFailTypes[];
    responseSuccessCbList: interceptorsResponseSuccessTypes[];
    responseFailCbList: interceptorsResponseFailTypes[];
} & instanceConfigReturns;
export interface InitializeContainerUtilsProps extends Debugger {
}
export declare class InitializeContainerUtils extends Debugger {
    constructor(res?: InitializeContainerUtilsProps);
    /**
     * @description 实例化
     * @param List
     * @returns
     */
    protected initializationList(List: initializeContainerProps['containerList']): instanceConfigReturns[];
    /**
     * @description 检查安装器
     * 1. 插件有拦截器 主体没有拦截器 即插件拦截器生效
     *
     */
    protected checkTheInstaller(List: instanceConfigReturns[]): instanceConfigReturns[];
    /**
     * @description 解析拦截器
     * @param List
     * @returns
     */
    protected filterEmptyInterceptor(List: instanceConfigReturns[]): filterEmptyInterceptorReturns[];
    private configBindExtraFields;
    /**
     * @description 绑定拦截器
     * @param List
     */
    protected bindingInterceptor(List: filterEmptyInterceptorReturns[]): filterEmptyInterceptorReturns[];
}
