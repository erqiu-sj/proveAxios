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
    protected initializationList(List: initializeContainerProps['containerList']): instanceConfigReturns[];
    protected checkTheInstaller(List: instanceConfigReturns[]): instanceConfigReturns[];
    protected filterEmptyInterceptor(List: instanceConfigReturns[]): filterEmptyInterceptorReturns[];
    private configBindExtraFields;
    protected bindingInterceptor(List: filterEmptyInterceptorReturns[]): filterEmptyInterceptorReturns[];
}
