import { AxiosResponse } from 'axios';
import { interceptorsResponseFailTypes, interceptorsResponseSuccessTypes, interceptorsRequestFailTypes, interceptorsRequestSuccessTypes } from '../core';
import { priority } from '../constants';
import { customConfiguration } from '../instance';
export declare enum interceptorsKey {
    interceptorsRequestSuccess = "interceptorsRequestSuccess",
    interceptorsRequestFail = "interceptorsRequestFail",
    responseSuccess = "responseSuccess",
    responseFail = "responseFail"
}
export declare enum decisionInstaller {
    installReqSuc = "installReqSuc",
    installReqFail = "installReqFail",
    installResSuc = "installResSuc",
    installResFail = "installResFail"
}
export declare enum executionPhase {
    checkTheInstallerStage = "checkTheInstallerStage",
    executeTheInstallerPhase = "executeTheInstallerPhase",
    checkTheInterceptorPhase = "checkTheInterceptorPhase",
    executeTheTnterceptorPhase = "executeTheTnterceptorPhase"
}
export declare type instanceConfig<C extends object> = Partial<{
    config?: customConfiguration<C>;
    interceptor: {
        request: {
            successCb?: interceptorsRequestSuccessTypes<object>;
            failCb?: interceptorsRequestFailTypes;
        };
        response: {
            successCb?: interceptorsResponseSuccessTypes;
            failCb?: interceptorsResponseFailTypes;
        };
    };
}>;
export declare type interceptorCollectionTypes = interceptorsResponseFailTypes | interceptorsResponseSuccessTypes | interceptorsRequestFailTypes | interceptorsRequestSuccessTypes<object>;
export declare type installerCollectionTypes<C extends object> = mergeErrorInstaller | mergeSuccessfulInstaller<customConfiguration<C>> | mergeSuccessfulInstaller<AxiosResponse>;
export declare type mergeErrorInstaller = (err: any) => boolean;
export declare type mergeSuccessfulInstaller<T> = (conf: T) => boolean;
export declare type checkDynamicModuleSuccessInstallType<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object> = T extends decisionInstaller.installReqSuc ? mergeSuccessfulInstaller<customConfiguration<C>> : mergeSuccessfulInstaller<AxiosResponse>;
export declare type dynamicPluginConfig<C extends object> = Partial<{
    priority: number | keyof typeof priority;
    displayName?: string;
    interceptor: instanceConfig<C>['interceptor'];
    installer: {
        [decisionInstaller.installReqSuc]?: mergeSuccessfulInstaller<customConfiguration<C>>;
        [decisionInstaller.installReqFail]?: mergeErrorInstaller;
        [decisionInstaller.installResSuc]?: mergeSuccessfulInstaller<AxiosResponse>;
        [decisionInstaller.installResFail]?: mergeErrorInstaller;
    };
}>;
export declare type moduleConfiguration = {
    priorityList: object[];
};
